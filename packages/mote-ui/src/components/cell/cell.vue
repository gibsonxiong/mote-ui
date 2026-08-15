<script setup lang="ts">
import { computed } from 'vue'
import MtIcon from '../icon/icon.vue'
import type { MtCellProps } from './types'

defineOptions({
  name: 'MtCell',
})

const props = withDefaults(defineProps<MtCellProps>(), {
  title: undefined,
  value: undefined,
  label: undefined,
  icon: undefined,
  isLink: false,
  arrowDirection: 'right',
  center: false,
  border: true,
  required: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const arrowIconMap = {
  left: 'arrow-left',
  right: 'arrow-right',
  up: 'arrow-up',
  down: 'arrow-down',
} as const

const classes = computed(() => [
  'mt-cell',
  {
    'mt-cell--center': props.center,
    'mt-cell--border': props.border,
    'mt-cell--clickable': props.isLink,
    'mt-cell--required': props.required,
  },
])

function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<template>
  <div :class="classes" :role="isLink ? 'button' : undefined" @click="handleClick">
    <div v-if="icon || $slots.icon" class="mt-cell__left-icon">
      <slot name="icon">
        <MtIcon :name="icon" size="20" />
      </slot>
    </div>
    <div class="mt-cell__title">
      <span class="mt-cell__title-text">
        <slot name="title">{{ title }}</slot>
      </span>
      <div v-if="label || $slots.label" class="mt-cell__label">
        <slot name="label">{{ label }}</slot>
      </div>
    </div>
    <div class="mt-cell__value">
      <slot>{{ value }}</slot>
    </div>
    <div v-if="isLink || $slots['right-icon']" class="mt-cell__right-icon">
      <slot name="right-icon">
        <MtIcon :name="arrowIconMap[arrowDirection]" size="16" color="var(--mt-text-color-placeholder)" />
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
.mt-cell {
  position: relative;
  display: flex;
  align-items: flex-start;
  width: 100%;
  min-height: 48px;
  padding: 12px 16px;
  background-color: var(--mt-bg-color);
  color: var(--mt-text-color-primary);
  font-size: var(--mt-font-size-md);
  line-height: var(--mt-line-height-normal);
  overflow: hidden;

  &--center {
    align-items: center;
  }

  &--border::after {
    content: '';
    position: absolute;
    left: 16px;
    right: 0;
    bottom: 0;
    height: 1px;
    background-color: var(--mt-border-color-lighter);
    transform: scaleY(0.5);
  }

  &--clickable {
    cursor: pointer;

    &:active {
      background-color: var(--mt-fill-color-light);
    }
  }

  &--required .mt-cell__title-text::before {
    content: '*';
    margin-right: 2px;
    color: var(--mt-color-danger);
  }

  &__left-icon {
    display: flex;
    align-items: center;
    margin-right: var(--mt-spacing-xs);
    min-height: 24px;
    color: var(--mt-color-primary);
  }

  &__title {
    flex: 1;
    min-width: 0;

    &-text {
      display: inline;
    }
  }

  &__label {
    margin-top: 2px;
    color: var(--mt-text-color-secondary);
    font-size: var(--mt-font-size-sm);
  }

  &__value {
    flex: none;
    max-width: 60%;
    margin-left: var(--mt-spacing-sm);
    color: var(--mt-text-color-regular);
    text-align: right;
    overflow-wrap: break-word;

    &:empty {
      display: none;
    }
  }

  &__right-icon {
    display: flex;
    align-items: center;
    margin-left: var(--mt-spacing-xs);
    min-height: 24px;
  }
}
</style>
