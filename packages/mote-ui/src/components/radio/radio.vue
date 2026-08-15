<script setup lang="ts">
import { computed, inject } from 'vue'
import { radioGroupKey } from './types'
import { formItemKey } from '../form/types'
import type { MtRadioProps } from './types'

defineOptions({
  name: 'MtRadio',
})

const props = withDefaults(defineProps<MtRadioProps>(), {
  disabled: false,
})

const group = inject(radioGroupKey, null)

const formItem = inject(formItemKey, null)

const isChecked = computed(() => group?.modelValue === props.value)
const isDisabled = computed(() => props.disabled || (group?.disabled ?? false))

const classes = computed(() => [
  'mt-radio',
  {
    'is-checked': isChecked.value,
    'is-disabled': isDisabled.value,
  },
])

function handleClick() {
  if (isDisabled.value || !group) return
  group.selectValue(props.value)
  formItem?.onFieldChange()
}
</script>

<template>
  <label :class="classes" @click="handleClick">
    <span class="mt-radio__circle">
      <span v-if="isChecked" class="mt-radio__dot" />
    </span>
    <span v-if="$slots.default" class="mt-radio__label">
      <slot />
    </span>
  </label>
</template>

<style lang="scss">
.mt-radio {
  display: inline-flex;
  align-items: center;
  gap: var(--mt-spacing-sm);
  color: var(--mt-text-color-regular);
  font-size: var(--mt-font-size-md);
  cursor: pointer;
  user-select: none;

  &__circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: 1px solid var(--mt-border-color);
    border-radius: 50%;
    background-color: var(--mt-bg-color);
    transition: border-color var(--mt-duration-fast) var(--mt-easing-standard);
  }

  &__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--mt-color-primary);
  }

  &.is-checked {
    .mt-radio__circle {
      border-color: var(--mt-color-primary);
    }

    .mt-radio__label {
      color: var(--mt-color-primary);
    }
  }

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
