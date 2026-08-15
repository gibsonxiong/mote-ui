<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import type { MtPickerOption } from './types'

defineOptions({
  name: 'MtPickerColumn',
})

const props = withDefaults(
  defineProps<{
    options: MtPickerOption[]
    index: number
    optionHeight: number
    visibleOptionNum: number
  }>(),
  {
    optionHeight: 44,
    visibleOptionNum: 6,
  },
)

const emit = defineEmits<{
  'update:index': [index: number]
  change: [index: number]
}>()

const wrapperRef = ref<HTMLElement | null>(null)
const dragOffset = ref(0)
const dragging = ref(false)
const animated = ref(true)

let startY = 0
let startOffset = 0
let lastY = 0
let lastTime = 0
let velocity = 0
let moved = false
let lastEvent: TouchEvent | MouseEvent | null = null

const MOMENTUM_DURATION = 1000
const MOMENTUM_LIMIT = 15

const translateY = computed(() => {
  const extra = dragging.value ? dragOffset.value : 0
  return (props.visibleOptionNum - 1) / 2 - props.index + extra / props.optionHeight
})

const wrapperStyle = computed(() => ({
  height: `${props.optionHeight * props.visibleOptionNum}px`,
}))

const wheelStyle = computed(() => ({
  transform: `translate3d(0, ${translateY.value * props.optionHeight}px, 0)`,
  transitionDuration: animated.value && !dragging.value ? '300ms' : '0ms',
}))

function clampIndex(index: number) {
  return Math.max(0, Math.min(props.options.length - 1, index))
}

function commitIndex(next: number) {
  const clamped = clampIndex(next)
  if (clamped !== props.index) {
    emit('update:index', clamped)
    emit('change', clamped)
  }
}

function getIndexFromEvent(event: TouchEvent | MouseEvent) {
  const wrapper = wrapperRef.value
  if (!wrapper) return props.index
  const rect = wrapper.getBoundingClientRect()
  const clientY = event instanceof MouseEvent ? event.clientY : event.changedTouches[0]?.clientY ?? 0
  const relative = clientY - rect.top - rect.height / 2
  return props.index + Math.round(relative / props.optionHeight)
}

function handleDragStart(event: TouchEvent | MouseEvent) {
  dragging.value = true
  animated.value = false
  moved = false
  dragOffset.value = 0
  lastEvent = event
  startY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY
  lastY = startY
  startOffset = 0
  lastTime = Date.now()
  velocity = 0

  if (event instanceof MouseEvent) {
    window.addEventListener('mousemove', handleDragMove)
    window.addEventListener('mouseup', handleDragEnd)
  } else {
    window.addEventListener('touchmove', handleDragMove, { passive: false })
    window.addEventListener('touchend', handleDragEnd)
    window.addEventListener('touchcancel', handleDragEnd)
  }
}

function handleDragMove(event: TouchEvent | MouseEvent) {
  if (!dragging.value) return
  if (event instanceof TouchEvent && event.cancelable) event.preventDefault()
  lastEvent = event
  const currentY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY
  const now = Date.now()
  const delta = now - lastTime
  if (delta > 0) {
    velocity = (currentY - lastY) / delta
  }
  lastY = currentY
  lastTime = now
  startOffset = currentY - startY
  if (Math.abs(startOffset) > 4) moved = true
  dragOffset.value = startOffset
}

function handleDragEnd() {
  window.removeEventListener('mousemove', handleDragMove)
  window.removeEventListener('mouseup', handleDragEnd)
  window.removeEventListener('touchmove', handleDragMove)
  window.removeEventListener('touchend', handleDragEnd)
  window.removeEventListener('touchcancel', handleDragEnd)
  if (!dragging.value) return
  dragging.value = false
  animated.value = true

  if (!moved) {
    // Treat as a tap: select the option under the pointer position
    if (lastEvent) commitIndex(getIndexFromEvent(lastEvent))
    return
  }

  let distance = startOffset
  if (Math.abs(velocity) > 0.1) {
    const momentum = (-velocity * MOMENTUM_DURATION) / 3
    distance += Math.max(-MOMENTUM_LIMIT * props.optionHeight, Math.min(MOMENTUM_LIMIT * props.optionHeight, momentum))
  }
  const nextIndex = props.index - Math.round(distance / props.optionHeight)
  commitIndex(nextIndex)
}

function handleOptionClick(optionIndex: number) {
  if (moved) return
  commitIndex(optionIndex)
}

watch(
  () => props.options.length,
  () => {
    if (props.index > props.options.length - 1) {
      commitIndex(props.options.length - 1)
    }
  },
)

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleDragMove)
  window.removeEventListener('mouseup', handleDragEnd)
  window.removeEventListener('touchmove', handleDragMove)
  window.removeEventListener('touchend', handleDragEnd)
  window.removeEventListener('touchcancel', handleDragEnd)
})
</script>

<template>
  <div
    ref="wrapperRef"
    class="mt-picker-column"
    :style="wrapperStyle"
    @touchstart="handleDragStart"
    @mousedown.prevent="handleDragStart"
  >
    <div class="mt-picker-column__wheel" :style="wheelStyle">
      <div
        v-for="(option, optionIndex) in options"
        :key="optionIndex"
        class="mt-picker-column__option"
        :class="{
          'is-selected': optionIndex === index,
          'is-disabled': option.disabled,
        }"
        :style="{ height: `${optionHeight}px` }"
        @click="handleOptionClick(optionIndex)"
      >
        {{ option.text }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.mt-picker-column {
  flex: 1;
  position: relative;
  overflow: hidden;
  cursor: grab;
  user-select: none;

  &__wheel {
    transition-property: transform;
    transition-timing-function: var(--mt-easing-standard);
  }

  &__option {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 var(--mt-spacing-sm);
    color: var(--mt-text-color-regular);
    font-size: var(--mt-font-size-lg);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &.is-selected {
      color: var(--mt-text-color-primary);
      font-weight: var(--mt-font-weight-medium);
    }

    &.is-disabled {
      opacity: 0.4;
      pointer-events: none;
    }
  }
}
</style>
