<script setup lang="ts">
import { computed, inject, onBeforeUnmount, reactive, ref, toRef } from 'vue'
import MtIcon from '../icon/icon.vue'
import type { MtStepContext, MtStepProps } from './types'
import { stepsKey } from './types'

defineOptions({
  name: 'MtStep',
})

const props = withDefaults(defineProps<MtStepProps>(), {
  title: undefined,
  description: undefined,
})

const steps = inject(stepsKey, null)

const index = ref(-1)

const step = reactive({
  title: toRef(props, 'title'),
  description: toRef(props, 'description'),
}) as unknown as MtStepContext

if (steps) {
  index.value = steps.register(step)
}

onBeforeUnmount(() => {
  steps?.unregister(step)
})

// finished: before the active step; process: the active one; waiting: after it
const status = computed(() => {
  if (!steps) {
    return 'waiting'
  }
  if (index.value < steps.active) {
    return 'finished'
  }
  if (index.value === steps.active) {
    return 'process'
  }
  return 'waiting'
})
</script>

<template>
  <div class="mt-step" :class="`mt-step--${status}`">
    <div class="mt-step__indicator">
      <span v-if="status === 'finished'" class="mt-step__check">
        <MtIcon name="success" />
      </span>
      <span v-else class="mt-step__circle">{{ index + 1 }}</span>
    </div>
    <div class="mt-step__content">
      <div class="mt-step__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="description || $slots.description" class="mt-step__description">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.mt-step {
  position: relative;
  flex: 1;
  font-size: var(--mt-font-size-sm);
  text-align: center;

  &__indicator {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__circle,
  &__check {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    font-size: 12px;
    border-radius: 50%;
  }

  &__circle {
    color: var(--mt-text-color-placeholder);
    background: var(--mt-bg-color-page);
  }

  &__check {
    color: #fff;
    background: var(--mt-color-primary);
  }

  &__title {
    margin-top: 6px;
    color: var(--mt-text-color-secondary);
  }

  &__description {
    margin-top: 2px;
    font-size: var(--mt-font-size-sm);
    color: var(--mt-text-color-placeholder);
  }

  &--process &__circle {
    color: #fff;
    background: var(--mt-color-primary);
  }

  &--process &__title,
  &--finished &__title {
    color: var(--mt-text-color-primary);
  }

  // Horizontal connector lines on both sides of the indicator
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 10px;
    height: 1px;
    background: var(--mt-border-color-lighter);
  }

  &::before {
    right: 50%;
    left: 0;
  }

  &::after {
    right: 0;
    left: 50%;
  }

  &:first-child::before,
  &:last-child::after {
    display: none;
  }

  &--process::before,
  &--finished::before,
  &--finished::after {
    background: var(--mt-color-primary);
  }
}

.mt-steps--vertical {
  .mt-step {
    display: flex;
    flex: none;
    padding-bottom: 16px;
    text-align: left;

    &__indicator {
      flex-shrink: 0;
      margin-right: var(--mt-spacing-md);
    }

    &__content {
      flex: 1;
      min-width: 0;
    }

    &__title {
      margin-top: 0;
      line-height: 20px;
    }

    &::before,
    &::after {
      display: none;
    }

    // Vertical connector below the indicator (all but the last step)
    &__indicator::after {
      content: '';
      position: absolute;
      top: 24px;
      bottom: -12px;
      left: 50%;
      width: 1px;
      background: var(--mt-border-color-lighter);
    }

    &--finished &__indicator::after {
      background: var(--mt-color-primary);
    }

    &:last-child {
      padding-bottom: 0;

      .mt-step__indicator::after {
        display: none;
      }
    }
  }
}
</style>
