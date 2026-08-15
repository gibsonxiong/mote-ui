<script setup lang="ts">
import { computed, inject } from 'vue'
import { MtIconSuccess } from '@mote-ui/icons'
import { checkboxGroupKey } from './types'
import { formItemKey } from '../form/types'
import type { MtCheckboxProps } from './types'

defineOptions({
  name: 'MtCheckbox',
})

const props = withDefaults(defineProps<MtCheckboxProps>(), {
  modelValue: false,
  value: undefined,
  disabled: false,
  indeterminate: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

const group = inject(checkboxGroupKey, null)

const formItem = inject(formItemKey, null)

const isChecked = computed(() => {
  if (group && props.value !== undefined) {
    return group.modelValue.includes(props.value)
  }
  return props.modelValue
})

const isDisabled = computed(() => props.disabled || (group?.disabled ?? false))

const classes = computed(() => [
  'mt-checkbox',
  {
    'is-checked': isChecked.value,
    'is-disabled': isDisabled.value,
    'is-indeterminate': props.indeterminate,
  },
])

function handleClick() {
  if (isDisabled.value) return
  if (group && props.value !== undefined) {
    group.toggleValue(props.value)
    formItem?.onFieldChange()
    return
  }
  const next = !isChecked.value
  emit('update:modelValue', next)
  emit('change', next)
  formItem?.onFieldChange()
}
</script>

<template>
  <label :class="classes" @click="handleClick">
    <span class="mt-checkbox__box">
      <MtIconSuccess v-if="isChecked && !indeterminate" class="mt-checkbox__icon" />
      <span v-else-if="indeterminate" class="mt-checkbox__dash" />
    </span>
    <span v-if="$slots.default" class="mt-checkbox__label">
      <slot />
    </span>
  </label>
</template>

<style lang="scss">
.mt-checkbox {
  display: inline-flex;
  align-items: center;
  gap: var(--mt-spacing-sm);
  color: var(--mt-text-color-regular);
  font-size: var(--mt-font-size-md);
  cursor: pointer;
  user-select: none;

  &__box {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: 1px solid var(--mt-border-color);
    border-radius: var(--mt-radius-base);
    background-color: var(--mt-bg-color);
    transition:
      background-color var(--mt-duration-fast) var(--mt-easing-standard),
      border-color var(--mt-duration-fast) var(--mt-easing-standard);
  }

  &__icon {
    color: #fff;
    font-size: var(--mt-font-size-sm);
  }

  &__dash {
    width: 10px;
    height: 2px;
    border-radius: 1px;
    background-color: #fff;
  }

  &.is-checked,
  &.is-indeterminate {
    .mt-checkbox__box {
      background-color: var(--mt-color-primary);
      border-color: var(--mt-color-primary);
    }
  }

  &.is-checked .mt-checkbox__label {
    color: var(--mt-color-primary);
  }

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
