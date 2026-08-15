<script setup lang="ts">
import { computed } from 'vue'
import { MtIconLoading } from '@mote-ui/icons'
import type { MtButtonProps } from './types'

defineOptions({
  name: 'MtButton',
})

const props = withDefaults(defineProps<MtButtonProps>(), {
  type: 'default',
  size: 'normal',
  plain: false,
  round: false,
  block: false,
  disabled: false,
  loading: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const classes = computed(() => [
  'mt-button',
  `mt-button--${props.type}`,
  `mt-button--${props.size}`,
  {
    'mt-button--plain': props.plain,
    'mt-button--round': props.round,
    'mt-button--block': props.block,
    'is-disabled': props.disabled,
    'is-loading': props.loading,
  },
])

function handleClick(event: MouseEvent) {
  if (props.disabled || props.loading) return
  emit('click', event)
}
</script>

<template>
  <button :class="classes" :disabled="disabled" type="button" @click="handleClick">
    <MtIconLoading v-if="loading" class="mt-button__loading" />
    <span class="mt-button__content">
      <slot />
    </span>
  </button>
</template>

<style lang="scss">
.mt-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--mt-spacing-xs);
  padding: 8px 16px;
  border: 1px solid var(--mt-border-color);
  border-radius: var(--mt-radius-base);
  background-color: var(--mt-bg-color);
  color: var(--mt-text-color-regular);
  font-size: var(--mt-font-size-md);
  font-weight: var(--mt-font-weight-normal);
  line-height: var(--mt-line-height-tight);
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition: opacity var(--mt-duration-fast) var(--mt-easing-standard);
  -webkit-appearance: none;

  &:active {
    opacity: 0.8;
  }

  // ---- Sizes ----
  &--small {
    padding: 5px 12px;
    font-size: var(--mt-font-size-sm);
  }

  &--large {
    padding: 12px 24px;
    font-size: var(--mt-font-size-lg);
  }

  // ---- Types ----
  @mixin solid($color) {
    background-color: $color;
    border-color: $color;
    color: #fff;
  }

  &--primary {
    @include solid(var(--mt-color-primary));
  }

  &--success {
    @include solid(var(--mt-color-success));
  }

  &--warning {
    @include solid(var(--mt-color-warning));
  }

  &--danger {
    @include solid(var(--mt-color-danger));
  }

  &--info {
    @include solid(var(--mt-color-info));
  }

  // ---- Plain variants ----
  &--plain {
    background-color: var(--mt-bg-color);

    &.mt-button--primary {
      color: var(--mt-color-primary);
      border-color: var(--mt-color-primary);
    }

    &.mt-button--success {
      color: var(--mt-color-success);
      border-color: var(--mt-color-success);
    }

    &.mt-button--warning {
      color: var(--mt-color-warning);
      border-color: var(--mt-color-warning);
    }

    &.mt-button--danger {
      color: var(--mt-color-danger);
      border-color: var(--mt-color-danger);
    }

    &.mt-button--info {
      color: var(--mt-color-info);
      border-color: var(--mt-color-info);
    }
  }

  // ---- Shapes ----
  &--round {
    border-radius: var(--mt-radius-pill);
  }

  &--block {
    display: flex;
    width: 100%;
  }

  // ---- States ----
  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:active {
      opacity: 0.5;
    }
  }

  &__loading {
    animation: mt-button-rotate 0.8s linear infinite;
  }
}

@keyframes mt-button-rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
