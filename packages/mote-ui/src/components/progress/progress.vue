<script setup lang="ts">
import { computed } from 'vue'
import type { MtProgressProps } from './types'

defineOptions({
  name: 'MtProgress',
})

const props = withDefaults(defineProps<MtProgressProps>(), {
  percentage: 0,
  strokeWidth: 4,
  color: undefined,
  status: undefined,
  showText: true,
})

const clamped = computed(() => Math.min(Math.max(props.percentage, 0), 100))

const barColor = computed(() => {
  if (props.color) return props.color
  if (props.status === 'success') return 'var(--mt-color-success)'
  if (props.status === 'danger') return 'var(--mt-color-danger)'
  return 'var(--mt-color-primary)'
})
</script>

<template>
  <div
    class="mt-progress"
    :class="status ? `mt-progress--${status}` : undefined"
    role="progressbar"
    :aria-valuenow="clamped"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div class="mt-progress__track" :style="{ height: `${strokeWidth}px` }">
      <div
        class="mt-progress__bar"
        :style="{ width: `${clamped}%`, height: `${strokeWidth}px`, backgroundColor: barColor }"
      />
    </div>
    <span v-if="showText" class="mt-progress__text">{{ clamped }}%</span>
  </div>
</template>

<style lang="scss">
.mt-progress {
  display: flex;
  align-items: center;

  &__track {
    flex: 1;
    border-radius: var(--mt-radius-pill);
    background-color: var(--mt-bg-color-page);
    overflow: hidden;
  }

  &__bar {
    border-radius: var(--mt-radius-pill);
    transition: width var(--mt-duration-fast) var(--mt-easing-standard);
  }

  &__text {
    flex-shrink: 0;
    margin-left: 8px;
    min-width: 36px;
    text-align: right;
    color: var(--mt-text-color-secondary);
    font-size: var(--mt-font-size-sm);
  }
}
</style>
