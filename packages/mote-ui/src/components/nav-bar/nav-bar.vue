<script setup lang="ts">
import { computed } from 'vue'
import MtIcon from '../icon/icon.vue'
import type { MtNavBarProps } from './types'

defineOptions({
  name: 'MtNavBar',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MtNavBarProps>(), {
  title: undefined,
  leftText: undefined,
  rightText: undefined,
  leftArrow: false,
  rightArrow: false,
  border: true,
  fixed: false,
  placeholder: false,
  safeAreaInsetTop: false,
  zIndex: undefined,
})

const emit = defineEmits<{
  clickLeft: [event: MouseEvent]
  clickRight: [event: MouseEvent]
}>()

const showPlaceholder = computed(() => props.fixed && props.placeholder)

const classes = computed(() => [
  'mt-nav-bar',
  {
    'mt-nav-bar--border': props.border,
    'mt-nav-bar--fixed': props.fixed,
    'mt-nav-bar--safe-top': props.safeAreaInsetTop,
  },
])

const style = computed(() => (props.zIndex !== undefined ? { zIndex: props.zIndex } : undefined))
</script>

<template>
  <div v-if="showPlaceholder" class="mt-nav-bar__placeholder" aria-hidden="true" />
  <div :class="classes" :style="style" v-bind="$attrs" role="navigation">
    <div class="mt-nav-bar__left" @click="emit('clickLeft', $event)">
      <slot name="left">
        <MtIcon v-if="leftArrow" name="arrow-left" class="mt-nav-bar__arrow" />
        <span v-if="leftText" class="mt-nav-bar__text">{{ leftText }}</span>
      </slot>
    </div>
    <div class="mt-nav-bar__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="mt-nav-bar__right" @click="emit('clickRight', $event)">
      <slot name="right">
        <span v-if="rightText" class="mt-nav-bar__text">{{ rightText }}</span>
        <MtIcon v-if="rightArrow" name="arrow-right" class="mt-nav-bar__arrow" />
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
.mt-nav-bar {
  --mt-nav-bar-height: 46px;

  position: relative;
  display: flex;
  align-items: center;
  height: var(--mt-nav-bar-height);
  padding: 0 var(--mt-spacing-lg);
  background: var(--mt-bg-color);
  color: var(--mt-text-color-primary);
  user-select: none;

  &--border {
    border-bottom: 1px solid var(--mt-border-color-light);
  }

  &--fixed {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
  }

  &--safe-top {
    padding-top: env(safe-area-inset-top);
  }

  &__placeholder {
    --mt-nav-bar-height: 46px;

    height: var(--mt-nav-bar-height);
  }

  &__left,
  &__right {
    display: flex;
    align-items: center;
    gap: var(--mt-spacing-xs);
    font-size: var(--mt-font-size-md);
    color: var(--mt-color-primary);
    cursor: pointer;

    &:active {
      opacity: 0.7;
    }
  }

  &__title {
    flex: 1;
    max-width: 60%;
    margin: 0 auto;
    overflow: hidden;
    font-size: var(--mt-font-size-xl);
    font-weight: var(--mt-font-weight-bold);
    line-height: var(--mt-line-height-tight);
    color: var(--mt-text-color-primary);
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__arrow {
    font-size: var(--mt-font-size-xl);
  }
}
</style>
