<script setup lang="ts">
import { computed, inject, onBeforeUnmount, reactive, ref } from 'vue'
import MtIcon from '../icon/icon.vue'
import type { MtCollapseItemContext, MtCollapseItemProps, MtCollapseValue } from './types'
import { collapseKey } from './types'

defineOptions({
  name: 'MtCollapseItem',
})

const props = withDefaults(defineProps<MtCollapseItemProps>(), {
  name: undefined,
  title: undefined,
  disabled: false,
})

const collapse = inject(collapseKey, null)

const index = ref(-1)

const item = reactive({
  name: computed<MtCollapseValue>(() => props.name ?? index.value),
}) as unknown as MtCollapseItemContext

if (collapse) {
  index.value = collapse.register(item)
}

onBeforeUnmount(() => {
  collapse?.unregister(item)
})

const expanded = computed(() => (collapse ? collapse.isExpanded(item.name) : false))

function handleHeaderClick() {
  if (props.disabled || !collapse) {
    return
  }
  collapse.toggle(item.name)
}
</script>

<template>
  <div
    class="mt-collapse-item"
    :class="{
      'mt-collapse-item--expanded': expanded,
      'mt-collapse-item--disabled': disabled,
    }"
  >
    <div
      class="mt-collapse-item__header"
      role="button"
      :aria-expanded="expanded"
      :aria-disabled="disabled || undefined"
      @click="handleHeaderClick"
    >
      <slot name="title">{{ title }}</slot>
      <MtIcon class="mt-collapse-item__arrow" name="arrow-down" />
    </div>
    <div class="mt-collapse-item__wrapper">
      <div class="mt-collapse-item__body">
        <div class="mt-collapse-item__content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.mt-collapse-item {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px var(--mt-spacing-md);
    font-size: var(--mt-font-size-md);
    color: var(--mt-text-color-primary);
    cursor: pointer;
    user-select: none;
  }

  &__arrow {
    flex-shrink: 0;
    margin-left: var(--mt-spacing-sm);
    color: var(--mt-text-color-placeholder);
    transition: transform var(--mt-duration-normal) var(--mt-easing-standard);
  }

  &--expanded &__arrow {
    transform: rotate(-180deg);
  }

  &--disabled &__header {
    color: var(--mt-text-color-disabled);
    cursor: not-allowed;
  }

  &__wrapper {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--mt-duration-normal) var(--mt-easing-standard);
  }

  &--expanded &__wrapper {
    grid-template-rows: 1fr;
  }

  &__body {
    min-height: 0;
    overflow: hidden;
  }

  &__content {
    padding: 0 var(--mt-spacing-md) 12px;
    font-size: var(--mt-font-size-sm);
    color: var(--mt-text-color-secondary);
  }

  & + & {
    .mt-collapse-item__header {
      border-top: 1px solid var(--mt-border-color-lighter);
    }
  }
}
</style>
