<script setup lang="ts">
import { computed } from 'vue'
import type { MtCellGroupProps } from './types'

defineOptions({
  name: 'MtCellGroup',
})

const props = withDefaults(defineProps<MtCellGroupProps>(), {
  title: undefined,
  inset: false,
  border: true,
})

const classes = computed(() => [
  'mt-cell-group',
  {
    'mt-cell-group--inset': props.inset,
    'mt-cell-group--border': props.border,
  },
])
</script>

<template>
  <div :class="classes">
    <div v-if="title || $slots.title" class="mt-cell-group__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="mt-cell-group__body">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.mt-cell-group {
  &__title {
    padding: 16px 16px 8px;
    color: var(--mt-text-color-secondary);
    font-size: var(--mt-font-size-md);
    line-height: var(--mt-line-height-tight);
  }

  &__body {
    background-color: var(--mt-bg-color);
  }

  &--border .mt-cell-group__body {
    border-top: 1px solid var(--mt-border-color-lighter);
    border-bottom: 1px solid var(--mt-border-color-lighter);
  }

  &--inset {
    padding: 0 var(--mt-spacing-lg);

    .mt-cell-group__title {
      padding-left: 0;
    }

    .mt-cell-group__body {
      border-radius: var(--mt-radius-lg);
      overflow: hidden;
    }
  }
}
</style>
