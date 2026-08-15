<script setup lang="ts">
import { computed, inject } from 'vue'
import MtIcon from '../icon/icon.vue'
import { gridContextKey } from './types'
import type { MtGridItemProps } from './types'

defineOptions({
  name: 'MtGridItem',
})

withDefaults(defineProps<MtGridItemProps>(), {
  icon: undefined,
  text: undefined,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const grid = inject(gridContextKey, { square: false, border: false, center: true })

const classes = computed(() => [
  'mt-grid-item',
  {
    'mt-grid-item--border': grid.border,
  },
])

const contentClasses = computed(() => [
  'mt-grid-item__content',
  {
    'mt-grid-item__content--square': grid.square,
    'mt-grid-item__content--center': grid.center,
  },
])

function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<template>
  <div :class="classes" @click="handleClick">
    <div :class="contentClasses">
      <div class="mt-grid-item__inner">
        <slot>
          <MtIcon v-if="icon" :name="icon" size="28" class="mt-grid-item__icon" />
          <div v-if="text || $slots.text" class="mt-grid-item__text">
            <slot name="text">
              {{ text }}
            </slot>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.mt-grid-item {
  min-width: 0;
  background-color: var(--mt-bg-color);

  &--border {
    border-right: 1px solid var(--mt-border-color-lighter);
    border-bottom: 1px solid var(--mt-border-color-lighter);
  }

  &__content {
    position: relative;
    height: 100%;

    &--square {
      padding-bottom: 100%;
      height: 0;
    }

    &--center .mt-grid-item__inner {
      justify-content: center;
      text-align: center;
    }
  }

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 8px;
  }

  &__content--square &__inner {
    position: absolute;
    inset: 0;
  }

  &__icon {
    color: var(--mt-color-primary);
  }

  &__text {
    margin-top: var(--mt-spacing-sm);
    color: var(--mt-text-color-regular);
    font-size: var(--mt-font-size-sm);
    line-height: var(--mt-line-height-tight);
  }

  &__icon + &__text {
    margin-top: var(--mt-spacing-sm);
  }
}
</style>
