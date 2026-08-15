<script setup lang="ts">
import { computed } from 'vue'
import MtIcon from '../icon/icon.vue'
import type { MtTagProps } from './types'

defineOptions({
  name: 'MtTag',
})

const props = withDefaults(defineProps<MtTagProps>(), {
  type: 'primary',
  size: 'default',
  effect: 'light',
  closable: false,
  round: false,
})

const emit = defineEmits<{
  close: [event: MouseEvent]
}>()

const classes = computed(() => [
  'mt-tag',
  `mt-tag--${props.type}`,
  `mt-tag--${props.effect}`,
  {
    'mt-tag--small': props.size === 'small',
    'mt-tag--large': props.size === 'large',
    'mt-tag--round': props.round,
  },
])
</script>

<template>
  <span :class="classes">
    <slot />
    <MtIcon v-if="closable" name="close" class="mt-tag__close" @click="emit('close', $event)" />
  </span>
</template>

<style lang="scss">
@use 'sass:map';

.mt-tag {
  $tag-colors: (
    'primary': (
      base: var(--mt-color-primary),
      light: #ecf5ff,
      light-border: #d9ecff,
    ),
    'success': (
      base: var(--mt-color-success),
      light: #f0f9eb,
      light-border: #e1f3d8,
    ),
    'warning': (
      base: var(--mt-color-warning),
      light: #fdf6ec,
      light-border: #faecd8,
    ),
    'danger': (
      base: var(--mt-color-danger),
      light: #fef0f0,
      light-border: #fde2e2,
    ),
    'info': (
      base: var(--mt-color-info),
      light: #f4f4f5,
      light-border: #e9e9eb,
    ),
  );

  display: inline-flex;
  align-items: center;
  gap: var(--mt-spacing-xs);
  height: 24px;
  padding: 0 var(--mt-spacing-sm);
  font-size: var(--mt-font-size-sm);
  line-height: 1;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: var(--mt-radius-base);

  &--small {
    height: 20px;
    padding: 0 var(--mt-spacing-xs);
    font-size: var(--mt-font-size-xs);
  }

  &--large {
    height: 28px;
    padding: 0 var(--mt-spacing-md);
    font-size: var(--mt-font-size-md);
  }

  &--round {
    border-radius: var(--mt-radius-pill);
  }

  &__close {
    font-size: 1em;
    cursor: pointer;

    &:active {
      opacity: 0.7;
    }
  }

  @each $name, $colors in $tag-colors {
    &--#{$name} {
      &.mt-tag--light {
        color: map.get($colors, base);
        background: map.get($colors, light);
        border-color: map.get($colors, light-border);
      }

      &.mt-tag--dark {
        color: #fff;
        background: map.get($colors, base);
      }

      &.mt-tag--plain {
        color: map.get($colors, base);
        background: var(--mt-bg-color);
        border-color: map.get($colors, base);
      }
    }
  }
}

// Light-effect tints for dark theme (EP dark palette approximation)
[data-theme='dark'] .mt-tag {
  $tag-dark-tints: (
    'primary': (
      light: #18222c,
      light-border: #10344f,
    ),
    'success': (
      light: #1c2518,
      light-border: #274a1d,
    ),
    'warning': (
      light: #292007,
      light-border: #594214,
    ),
    'danger': (
      light: #2b1d1d,
      light-border: #58181c,
    ),
    'info': (
      light: #202121,
      light-border: #414243,
    ),
  );

  @each $name, $colors in $tag-dark-tints {
    &--#{$name}.mt-tag--light {
      background: map.get($colors, light);
      border-color: map.get($colors, light-border);
    }
  }
}
</style>
