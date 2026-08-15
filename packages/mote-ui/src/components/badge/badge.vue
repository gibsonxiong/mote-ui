<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { MtBadgeProps } from './types'

defineOptions({
  name: 'MtBadge',
})

const props = withDefaults(defineProps<MtBadgeProps>(), {
  value: undefined,
  max: undefined,
  isDot: false,
  hidden: false,
})

const slots = useSlots()

const hasContent = computed(() => Boolean(slots.default))

const displayValue = computed(() => {
  if (props.isDot) {
    return undefined
  }
  if (typeof props.value === 'number' && typeof props.max === 'number' && props.value > props.max) {
    return `${props.max}+`
  }
  return props.value
})

const showBadge = computed(() => !props.hidden && (props.isDot || displayValue.value !== undefined))
</script>

<template>
  <div class="mt-badge">
    <slot />
    <sup
      v-if="showBadge"
      class="mt-badge__content"
      :class="{
        'mt-badge__content--dot': isDot,
        'mt-badge__content--fixed': hasContent,
      }"
    >
      {{ displayValue }}
    </sup>
  </div>
</template>

<style lang="scss">
.mt-badge {
  position: relative;
  display: inline-flex;
  vertical-align: middle;

  &__content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    min-width: 16px;
    height: 16px;
    padding: 0 var(--mt-spacing-xs);
    font-size: var(--mt-font-size-xs);
    line-height: 1;
    color: #fff;
    white-space: nowrap;
    background: var(--mt-color-danger);
    border-radius: var(--mt-radius-pill);

    &--fixed {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
    }

    &--dot {
      min-width: 8px;
      width: 8px;
      height: 8px;
      padding: 0;
      border-radius: 50%;
    }
  }
}
</style>
