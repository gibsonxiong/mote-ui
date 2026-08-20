<script setup lang="ts">
import { computed, provide, reactive, ref, toRefs } from 'vue'
import type { MtDropdownMenuContext, MtDropdownMenuProps } from './types'
import { dropdownMenuKey } from './types'

defineOptions({
  name: 'MtDropdownMenu',
})

const props = withDefaults(defineProps<MtDropdownMenuProps>(), {
  activeColor: undefined,
  closeOnClickOverlay: true,
  duration: 300,
  overlay: true,
  direction: 'down',
  zIndex: undefined,
})

const items: object[] = []

// Only one dropdown is open at a time. Items coordinate through this index.
const activeIndex = ref(-1)

function register(item: object) {
  items.push(item)
  return items.length - 1
}

function unregister(item: object) {
  const index = items.indexOf(item)
  if (index > -1) items.splice(index, 1)
}

function toggle(index: number) {
  activeIndex.value = activeIndex.value === index ? -1 : index
}

function close() {
  activeIndex.value = -1
}

provide(
  dropdownMenuKey,
  reactive({
    ...toRefs(props),
    activeIndex,
    register,
    unregister,
    toggle,
    close,
  }) as unknown as MtDropdownMenuContext,
)

const classes = computed(() => ['mt-dropdown-menu', `mt-dropdown-menu--${props.direction}`])
</script>

<template>
  <div :class="classes" role="navigation">
    <slot />
  </div>
</template>

<style lang="scss">
.mt-dropdown-menu {
  display: flex;
  align-items: center;
  height: 48px;
  background-color: var(--mt-bg-color);
  border-bottom: 1px solid var(--mt-border-color-lighter);
  user-select: none;
}
</style>