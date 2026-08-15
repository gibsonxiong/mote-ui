<script setup lang="ts">
import type { MtLoadingProps } from './types'

defineOptions({
  name: 'MtLoading',
})

withDefaults(defineProps<MtLoadingProps>(), {
  type: 'circular',
  size: 30,
  text: undefined,
  vertical: false,
  color: undefined,
})
</script>

<template>
  <div
    class="mt-loading"
    :class="{ 'mt-loading--vertical': vertical }"
    :style="color ? { color } : undefined"
    role="status"
  >
    <span
      v-if="type === 'circular'"
      class="mt-loading__spinner mt-loading__spinner--circular"
      :style="{ width: `${size}px`, height: `${size}px` }"
    />
    <span
      v-else
      class="mt-loading__spinner mt-loading__spinner--bars"
      :style="{ width: `${size}px`, height: `${size}px` }"
    >
      <i v-for="index in 8" :key="index" class="mt-loading__bar" :style="{ transform: `rotate(${index * 45}deg)` }" />
    </span>
    <span v-if="text || $slots.default" class="mt-loading__text">
      <slot>{{ text }}</slot>
    </span>
  </div>
</template>

<style lang="scss">
.mt-loading {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--mt-text-color-placeholder);

  &--vertical {
    flex-direction: column;

    .mt-loading__text {
      margin-top: 8px;
      margin-left: 0;
    }
  }

  &__spinner {
    position: relative;
    flex-shrink: 0;

    &--circular {
      border-radius: 50%;
      border: 2px solid currentColor;
      border-top-color: transparent;
      animation: mt-loading-rotate 0.8s linear infinite;
    }

    &--bars {
      display: block;
    }
  }

  &__bar {
    position: absolute;
    top: 0;
    left: 50%;
    width: 2px;
    height: 100%;
    margin-left: -1px;

    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 25%;
      border-radius: 1px;
      background-color: currentColor;
      animation: mt-loading-fade 0.8s linear infinite;
    }

    @for $index from 1 through 8 {
      &:nth-child(#{$index})::before {
        animation-delay: #{($index - 9) * 0.1}s;
      }
    }
  }

  &__text {
    margin-left: 8px;
    font-size: var(--mt-font-size-sm);
  }
}

@keyframes mt-loading-rotate {
  to {
    transform: rotate(360deg);
  }
}

@keyframes mt-loading-fade {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.25;
  }
}
</style>
