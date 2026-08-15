<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { formItemKey } from '../form/types'
import type { MtStepperProps } from './types'

defineOptions({
  name: 'MtStepper',
})

const props = withDefaults(defineProps<MtStepperProps>(), {
  modelValue: 1,
  min: 1,
  max: Infinity,
  step: 1,
  precision: 0,
  disabled: false,
  disableInput: false,
  size: 'normal',
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const formItem = inject(formItemKey, null)

function format(value: number) {
  return Number(value.toFixed(props.precision))
}

function clamp(value: number) {
  return Math.min(Math.max(value, props.min), props.max)
}

const inputText = ref(String(format(clamp(props.modelValue))))

watch(
  () => props.modelValue,
  (value) => {
    inputText.value = String(format(clamp(value)))
  },
)

const minusDisabled = computed(() => props.disabled || props.modelValue <= props.min)
const plusDisabled = computed(() => props.disabled || props.modelValue >= props.max)

const classes = computed(() => [
  'mt-stepper',
  `mt-stepper--${props.size}`,
  { 'is-disabled': props.disabled },
])

function setValue(next: number) {
  if (next === props.modelValue) return
  emit('update:modelValue', next)
  emit('change', next)
  formItem?.onFieldChange()
}

function handleStep(direction: 1 | -1) {
  if (props.disabled) return
  const next = format(clamp(props.modelValue + direction * props.step))
  setValue(next)
}

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  const next = target.value.replace(/[^0-9.-]/g, '')
  if (next !== target.value) target.value = next
  inputText.value = next
}

function handleBlur(event: FocusEvent) {
  const parsed = Number.parseFloat(inputText.value)
  const next = Number.isNaN(parsed) ? format(clamp(props.modelValue)) : format(clamp(parsed))
  inputText.value = String(next)
  setValue(next)
  emit('blur', event)
  formItem?.onFieldBlur()
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') (event.target as HTMLInputElement).blur()
}
</script>

<template>
  <div :class="classes">
    <button
      type="button"
      class="mt-stepper__minus"
      :disabled="minusDisabled"
      aria-label="decrease"
      @click="handleStep(-1)"
    />
    <input
      class="mt-stepper__input"
      type="tel"
      inputmode="decimal"
      role="spinbutton"
      :value="inputText"
      :disabled="disabled || disableInput"
      :aria-valuemin="min"
      :aria-valuemax="max"
      :aria-valuenow="modelValue"
      @input="handleInput"
      @focus="emit('focus', $event)"
      @blur="handleBlur"
      @keydown="handleKeydown"
    >
    <button
      type="button"
      class="mt-stepper__plus"
      :disabled="plusDisabled"
      aria-label="increase"
      @click="handleStep(1)"
    />
  </div>
</template>

<style lang="scss">
.mt-stepper {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;

  &__minus,
  &__plus {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    border: none;
    border-radius: var(--mt-radius-base);
    background-color: var(--mt-fill-color-light);
    color: var(--mt-text-color-primary);
    cursor: pointer;

    &::before,
    &::after {
      content: '';
      position: absolute;
      background-color: currentColor;
      border-radius: 1px;
    }

    &::before {
      width: 12px;
      height: 2px;
    }

    &:disabled {
      color: var(--mt-text-color-disabled);
      cursor: not-allowed;
    }
  }

  &__plus::after {
    width: 2px;
    height: 12px;
  }

  &__input {
    width: 44px;
    height: 28px;
    margin: 0 4px;
    padding: 0;
    border: none;
    border-radius: var(--mt-radius-base);
    background-color: var(--mt-fill-color-light);
    color: var(--mt-text-color-primary);
    font-size: var(--mt-font-size-md);
    text-align: center;
    outline: none;

    &:disabled {
      color: var(--mt-text-color-disabled);
      cursor: not-allowed;
    }
  }

  // ---- sizes ----
  &--small {
    .mt-stepper__minus,
    .mt-stepper__plus {
      width: 24px;
      height: 24px;
    }

    .mt-stepper__input {
      width: 36px;
      height: 24px;
      font-size: var(--mt-font-size-sm);
    }
  }

  &--large {
    .mt-stepper__minus,
    .mt-stepper__plus {
      width: 36px;
      height: 36px;
    }

    .mt-stepper__input {
      width: 56px;
      height: 36px;
      font-size: var(--mt-font-size-lg);
    }
  }

  &.is-disabled {
    .mt-stepper__minus,
    .mt-stepper__plus {
      color: var(--mt-text-color-disabled);
      cursor: not-allowed;
    }
  }
}
</style>
