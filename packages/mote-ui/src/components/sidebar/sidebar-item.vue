<script setup lang="ts">
import { computed, inject, onBeforeUnmount } from 'vue'
import type { MtSidebarItemProps } from './types'
import { sidebarKey } from './types'

defineOptions({
  name: 'MtSidebarItem',
})

const props = withDefaults(defineProps<MtSidebarItemProps>(), {
  name: undefined,
  title: undefined,
  badge: undefined,
  dot: false,
  disabled: false,
})

const sidebar = inject(sidebarKey, null)

const item: object = {}
const index = sidebar ? sidebar.register(item) : -1

onBeforeUnmount(() => {
  sidebar?.unregister(item)
})

const itemName = computed(() => props.name ?? index)

const active = computed(() => sidebar !== null && (sidebar.modelValue ?? 0) === itemName.value)

const badgeText = computed(() => {
  if (typeof props.badge === 'number') {
    return props.badge > 99 ? '99+' : String(props.badge)
  }
  return props.badge
})

function onClick() {
  if (!sidebar || props.disabled) return
  sidebar.select(itemName.value)
}
</script>

<template>
  <div
    :class="[
      'mt-sidebar-item',
      {
        'mt-sidebar-item--active': active,
        'mt-sidebar-item--disabled': disabled,
      },
    ]"
    role="button"
    :aria-selected="active"
    @click="onClick"
  >
    <span v-if="dot" class="mt-sidebar-item__dot" />
    <span class="mt-sidebar-item__title">{{ title }}</span>
    <span v-if="badgeText !== undefined" class="mt-sidebar-item__badge">{{ badgeText }}</span>
  </div>
</template>

<style lang="scss">
.mt-sidebar-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 50px;
  padding: 0 8px;
  font-size: var(--mt-font-size-md);
  line-height: var(--mt-line-height-tight);
  color: var(--mt-text-color-primary);
  cursor: pointer;

  &::before {
    position: absolute;
    top: 50%;
    left: 0;
    width: 3px;
    height: 50%;
    content: '';
    border-radius: 0 3px 3px 0;
    background: var(--mt-color-primary);
    transform: translateY(-50%) scaleY(0);
    transition: transform var(--mt-duration-fast) var(--mt-easing-standard);
  }

  &--active {
    color: var(--mt-color-primary);
    font-weight: var(--mt-font-weight-medium);
    background: var(--mt-bg-color);

    &::before {
      transform: translateY(-50%) scaleY(1);
    }
  }

  &--disabled {
    color: var(--mt-text-color-disabled);
    cursor: not-allowed;
  }

  &__title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__badge {
    position: absolute;
    top: 6px;
    right: 8px;
    box-sizing: border-box;
    min-width: 16px;
    padding: 0 3px;
    font-size: var(--mt-font-size-xs);
    line-height: 14px;
    color: #fff;
    text-align: center;
    background: var(--mt-color-danger);
    border-radius: var(--mt-radius-pill);
  }

  &__dot {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 6px;
    height: 6px;
    background: var(--mt-color-danger);
    border-radius: 50%;
  }
}
</style>