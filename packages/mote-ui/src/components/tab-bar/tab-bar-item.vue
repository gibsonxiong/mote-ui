<script setup lang="ts">
import { computed, inject, onBeforeUnmount, useSlots } from 'vue'
import MtIcon from '../icon/icon.vue'
import type { MtTabBarItemProps } from './types'
import { tabBarKey } from './types'

defineOptions({
  name: 'MtTabBarItem',
})

const props = withDefaults(defineProps<MtTabBarItemProps>(), {
  name: undefined,
  title: undefined,
  icon: undefined,
  badge: undefined,
  dot: false,
  disabled: false,
})

const slots = useSlots()

const tabBar = inject(tabBarKey, null)

const item: object = {}
const index = tabBar ? tabBar.register(item) : -1

onBeforeUnmount(() => {
  tabBar?.unregister(item)
})

const itemName = computed(() => props.name ?? index)

const active = computed(() => tabBar !== null && (tabBar.modelValue ?? 0) === itemName.value)

const badgeText = computed(() => {
  if (typeof props.badge === 'number') {
    return props.badge > 99 ? '99+' : String(props.badge)
  }
  return props.badge
})

function onClick() {
  if (!tabBar || props.disabled) {
    return
  }
  tabBar.select(itemName.value)
}
</script>

<template>
  <div
    :class="[
      'mt-tab-bar-item',
      {
        'mt-tab-bar-item--active': active,
        'mt-tab-bar-item--disabled': disabled,
      },
    ]"
    role="tab"
    :aria-selected="active"
    @click="onClick"
  >
    <div class="mt-tab-bar-item__body">
      <div v-if="icon || slots.icon" class="mt-tab-bar-item__icon">
        <MtIcon v-if="icon" :name="icon" />
        <slot v-else name="icon" />
      </div>
      <div class="mt-tab-bar-item__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <span v-if="dot" class="mt-tab-bar-item__dot" />
      <span v-else-if="badgeText" class="mt-tab-bar-item__badge">{{ badgeText }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.mt-tab-bar-item {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  font-size: var(--mt-font-size-sm);
  line-height: var(--mt-line-height-tight);
  color: var(--mt-text-color-regular);
  cursor: pointer;

  &--active {
    color: var(--mt-color-primary);
    font-weight: var(--mt-font-weight-medium);
  }

  &--disabled {
    color: var(--mt-text-color-disabled);
    cursor: not-allowed;
  }

  &__body {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  &__icon {
    display: inline-flex;
    font-size: 20px;
  }

  &__badge {
    position: absolute;
    top: -4px;
    right: -8px;
    box-sizing: border-box;
    min-width: 16px;
    padding: 0 3px;
    font-size: var(--mt-font-size-xs);
    font-weight: var(--mt-font-weight-medium);
    line-height: 14px;
    color: #fff;
    text-align: center;
    background: var(--mt-color-danger);
    border: 1px solid var(--mt-bg-color);
    border-radius: var(--mt-radius-pill);
  }

  &__dot {
    position: absolute;
    top: -2px;
    right: -4px;
    width: 8px;
    height: 8px;
    background: var(--mt-color-danger);
    border-radius: 50%;
  }
}
</style>
