<script setup lang="ts">
import { computed } from 'vue'
import type { MtDividerProps } from './types'

defineOptions({
  name: 'MtDivider',
})

const props = withDefaults(defineProps<MtDividerProps>(), {
  dashed: false,
  contentPosition: 'center',
})

const classes = computed(() => [
  'mt-divider',
  `mt-divider--${props.contentPosition}`,
  { 'mt-divider--dashed': props.dashed },
])
</script>

<template>
  <div :class="classes" role="separator">
    <span class="mt-divider__text">
      <slot />
    </span>
  </div>
</template>

<style lang="scss">
.mt-divider {
  display: flex;
  align-items: center;
  margin: var(--mt-spacing-lg) 0;
  color: var(--mt-text-color-secondary);
  font-size: var(--mt-font-size-sm);

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-top: 1px solid var(--mt-border-color-light);
  }

  &--dashed::before,
  &--dashed::after {
    border-top-style: dashed;
  }

  &--left::before {
    flex: 0 0 10%;
    max-width: 10%;
  }

  &--right::after {
    flex: 0 0 10%;
    max-width: 10%;
  }

  &__text {
    padding: 0 var(--mt-spacing-md);
    line-height: var(--mt-line-height-tight);

    &:empty {
      padding: 0;
    }
  }
}
</style>
