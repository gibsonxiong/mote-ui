<script setup lang="ts">
import { computed, inject } from 'vue'
import { MtIconLoading } from '@mote-ui/icons'
import { formItemKey } from '../form/types'
import type { MtSwitchProps } from './types'

defineOptions({
  name: 'MtSwitch',
})

const props = withDefaults(defineProps<MtSwitchProps>(), {
  modelValue: false,
  activeValue: true,
  inactiveValue: false,
  disabled: false,
  loading: false,
  size: 'normal',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean | string | number]
  change: [value: boolean | string | number]
}>()

const checked = computed(() => props.modelValue === props.activeValue)

const formItem = inject(formItemKey, null)

const classes = computed(() => [
  'mt-switch',
  `mt-switch--${props.size}`,
  {
    'is-checked': checked.value,
    'is-disabled': props.disabled,
    'is-loading': props.loading,
  },
])

function handleClick() {
  if (props.disabled || props.loading) return
  const next = checked.value ? props.inactiveValue : props.activeValue
  emit('update:modelValue', next)
  emit('change', next)
  formItem?.onFieldChange()
}
</script>

<template>
  <div role="switch" :aria-checked="checked" :class="classes" @click="handleClick">
    <div class="mt-switch__handle">
      <MtIconLoading v-if="loading" class="mt-switch__loading-icon" />
    </div>
  </div>
</template>

<style lang="scss">
.mt-switch {
  display: inline-flex;
  align-items: center;
  width: 44px;
  height: 24px;
  padding: 2px;
  border-radius: var(--mt-radius-pill);
  background-color: var(--mt-border-color);
  cursor: pointer;
  transition: background-color var(--mt-duration-fast) var(--mt-easing-standard);
  vertical-align: middle;

  &__handle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: var(--mt-bg-color);
    box-shadow: var(--mt-shadow-sm);
    color: var(--mt-color-primary);
    transition: transform var(--mt-duration-fast) var(--mt-easing-standard);
  }

  &__loading-icon {
    animation: mt-switch-rotate 0.8s linear infinite;
    font-size: var(--mt-font-size-sm);
  }

  &.is-checked {
    background-color: var(--mt-color-primary);

    .mt-switch__handle {
      transform: translateX(20px);
    }
  }

  // ---- Sizes ----
  &--small {
    width: 36px;
    height: 20px;

    .mt-switch__handle {
      width: 16px;
      height: 16px;
    }

    &.is-checked .mt-switch__handle {
      transform: translateX(16px);
    }
  }

  &--large {
    width: 52px;
    height: 28px;

    .mt-switch__handle {
      width: 24px;
      height: 24px;
    }

    &.is-checked .mt-switch__handle {
      transform: translateX(24px);
    }
  }

  // ---- States ----
  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.is-loading {
    cursor: default;
  }
}

@keyframes mt-switch-rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
