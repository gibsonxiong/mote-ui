<script setup lang="ts">
import { computed } from 'vue'
import type { MtSkeletonProps } from './types'

defineOptions({
  name: 'MtSkeleton',
})

const props = withDefaults(defineProps<MtSkeletonProps>(), {
  loading: true,
  rows: 3,
  title: false,
  avatar: false,
  round: false,
  animate: true,
})

const rowsList = computed(() => Array.from({ length: props.rows }, (_, i) => i))

function rowStyle(index: number) {
  return index === props.rows - 1 && props.rows > 1 ? { width: '60%' } : undefined
}
</script>

<template>
  <slot v-if="!loading" />
  <div
    v-else
    class="mt-skeleton"
    :class="{
      'mt-skeleton--animate': animate,
      'mt-skeleton--round': round,
    }"
  >
    <div v-if="avatar" class="mt-skeleton__avatar" />
    <div class="mt-skeleton__content">
      <div v-if="title" class="mt-skeleton__title" />
      <div v-for="index in rowsList" :key="index" class="mt-skeleton__row" :style="rowStyle(index)" />
    </div>
  </div>
</template>

<style lang="scss">
.mt-skeleton {
  display: flex;
  gap: var(--mt-spacing-lg);
  padding: var(--mt-spacing-lg) 0;

  &__avatar {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    background: var(--mt-fill-color-light);
    border-radius: 50%;
  }

  &__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--mt-spacing-md);
  }

  &__title {
    width: 40%;
    height: 16px;
    background: var(--mt-fill-color-light);
    border-radius: var(--mt-radius-base);
  }

  &__row {
    height: 12px;
    background: var(--mt-fill-color-light);
    border-radius: var(--mt-radius-base);
  }

  &--round .mt-skeleton__title,
  &--round .mt-skeleton__row {
    border-radius: var(--mt-radius-pill);
  }

  &--animate .mt-skeleton__avatar,
  &--animate .mt-skeleton__title,
  &--animate .mt-skeleton__row {
    background: linear-gradient(
      90deg,
      var(--mt-fill-color-light) 25%,
      var(--mt-border-color-lighter) 37%,
      var(--mt-fill-color-light) 63%
    );
    background-size: 400% 100%;
    animation: mt-skeleton-shimmer 1.4s ease infinite;
  }
}

@keyframes mt-skeleton-shimmer {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}
</style>
