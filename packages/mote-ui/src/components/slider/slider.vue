<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref } from 'vue'
import { formItemKey } from '../form/types'
import type { MtSliderProps } from './types'

defineOptions({
  name: 'MtSlider',
})

const props = withDefaults(defineProps<MtSliderProps>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  showTooltip: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
}>()

const formItem = inject(formItemKey, null)

const trackRef = ref<HTMLElement>()
const dragging = ref(false)

// Decimal places implied by the step, so 0.1 + 0.2 style drift is avoided.
const stepDecimals = computed(() => {
  const [, fraction] = String(props.step).split('.')
  return fraction ? fraction.length : 0
})

function format(value: number) {
  return Number(value.toFixed(stepDecimals.value))
}

function clamp(value: number) {
  return Math.min(Math.max(value, props.min), props.max)
}

const percent = computed(() => {
  const range = props.max - props.min
  if (range <= 0) return 0
  return ((clamp(props.modelValue) - props.min) / range) * 100
})

const classes = computed(() => ['mt-slider', { 'is-disabled': props.disabled }])

function setValue(next: number) {
  if (next === props.modelValue) return
  emit('update:modelValue', next)
  formItem?.onFieldChange()
}

function valueFromClientX(clientX: number) {
  const track = trackRef.value
  if (!track) return null
  const rect = track.getBoundingClientRect()
  if (rect.width <= 0) return null
  const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1)
  const raw = props.min + ratio * (props.max - props.min)
  return format(clamp(Math.round(raw / props.step) * props.step))
}

let startValue = 0

function handlePointerDown(event: PointerEvent) {
  if (props.disabled) return
  event.preventDefault()
  dragging.value = true
  startValue = props.modelValue
  const next = valueFromClientX(event.clientX)
  if (next !== null) setValue(next)
  window.addEventListener('pointermove', handlePointerMove)
  window.addEventListener('pointerup', handlePointerUp)
}

function handlePointerMove(event: PointerEvent) {
  const next = valueFromClientX(event.clientX)
  if (next !== null) setValue(next)
}

function handlePointerUp() {
  dragging.value = false
  window.removeEventListener('pointermove', handlePointerMove)
  window.removeEventListener('pointerup', handlePointerUp)
  if (props.modelValue !== startValue) emit('change', props.modelValue)
  formItem?.onFieldBlur()
}

function handleKeydown(event: KeyboardEvent) {
  if (props.disabled) return
  let direction = 0
  if (event.key === 'ArrowRight' || event.key === 'ArrowUp') direction = 1
  else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') direction = -1
  else return
  event.preventDefault()
  const next = format(clamp(props.modelValue + direction * props.step))
  setValue(next)
  if (next !== props.modelValue) emit('change', next)
}

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', handlePointerMove)
  window.removeEventListener('pointerup', handlePointerUp)
})
</script>

<template>
  <div
    ref="trackRef"
    role="slider"
    :class="classes"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-valuenow="modelValue"
    :aria-disabled="disabled"
    tabindex="0"
    @pointerdown="handlePointerDown"
    @keydown="handleKeydown"
  >
    <div class="mt-slider__bar" :style="{ width: `${percent}%` }" />
    <div class="mt-slider__button" :style="{ left: `${percent}%` }">
      <div v-if="showTooltip && dragging" class="mt-slider__tooltip">{{ modelValue }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.mt-slider {
  position: relative;
  height: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
  outline: none;
  touch-action: none;

  &::before {
    content: '';
    width: 100%;
    height: 4px;
    border-radius: var(--mt-radius-pill);
    background-color: var(--mt-fill-color-light);
  }

  &__bar {
    position: absolute;
    left: 0;
    height: 4px;
    border-radius: var(--mt-radius-pill);
    background-color: var(--mt-color-primary);
  }

  &__button {
    position: absolute;
    top: 50%;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: var(--mt-bg-color);
    box-shadow: var(--mt-shadow-sm);
    border: 1px solid var(--mt-border-color-light);
    transform: translate(-50%, -50%);
    cursor: grab;
  }

  &__tooltip {
    position: absolute;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%);
    padding: 4px 8px;
    border-radius: var(--mt-radius-base);
    background-color: var(--mt-text-color-primary);
    color: var(--mt-bg-color);
    font-size: var(--mt-font-size-sm);
    white-space: nowrap;
  }

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;

    .mt-slider__button {
      cursor: not-allowed;
    }
  }
}
</style>
