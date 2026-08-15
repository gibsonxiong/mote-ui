<script setup lang="ts">
import { computed, provide, reactive, ref, watch } from 'vue'
import type { MtTabPaneContext, MtTabsContext, MtTabsProps, MtTabsValue } from './types'
import { tabsKey } from './types'

defineOptions({
  name: 'MtTabs',
})

const props = withDefaults(defineProps<MtTabsProps>(), {
  modelValue: undefined,
  type: 'line',
})

const emit = defineEmits<{
  'update:modelValue': [value: MtTabsValue]
  change: [value: MtTabsValue]
}>()

const panes = reactive<MtTabPaneContext[]>([])

const register = (pane: MtTabPaneContext) => {
  panes.push(pane)
  return panes.length - 1
}

const unregister = (pane: MtTabPaneContext) => {
  const index = panes.indexOf(pane)
  if (index > -1) {
    panes.splice(index, 1)
  }
}

const internalActive = ref<MtTabsValue | undefined>(undefined)

watch(
  () => props.modelValue,
  (value) => {
    internalActive.value = value
  },
  { immediate: true },
)

const currentName = computed(() => internalActive.value ?? panes[0]?.name)

const isActive = (name: MtTabsValue) => currentName.value === name

const select = (value: MtTabsValue) => {
  if (value !== currentName.value) {
    internalActive.value = value
    emit('update:modelValue', value)
    emit('change', value)
  }
}

provide(
  tabsKey,
  reactive({
    currentName,
    isActive,
    register,
    unregister,
    select,
  }) as unknown as MtTabsContext,
)

function onClickItem(pane: MtTabPaneContext) {
  if (pane.disabled) {
    return
  }
  select(pane.name)
}

const lineStyle = computed(() => {
  const activeIndex = panes.findIndex((pane) => isActive(pane.name))
  return {
    width: `${100 / panes.length}%`,
    transform: `translateX(${Math.max(activeIndex, 0) * 100}%)`,
  }
})
</script>

<template>
  <div :class="['mt-tabs', `mt-tabs--${type}`]">
    <div class="mt-tabs__nav" role="tablist">
      <div
        v-for="pane in panes"
        :key="String(pane.name)"
        :class="[
          'mt-tabs__item',
          {
            'mt-tabs__item--active': isActive(pane.name),
            'mt-tabs__item--disabled': pane.disabled,
          },
        ]"
        role="tab"
        :aria-selected="isActive(pane.name)"
        @click="onClickItem(pane)"
      >
        {{ pane.title }}
      </div>
      <div v-if="type === 'line' && panes.length" class="mt-tabs__line" :style="lineStyle" />
    </div>
    <div class="mt-tabs__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.mt-tabs {
  &__nav {
    position: relative;
    display: flex;
    background: var(--mt-bg-color);
    user-select: none;
  }

  &__item {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    height: 44px;
    padding: 0 var(--mt-spacing-sm);
    overflow: hidden;
    font-size: var(--mt-font-size-md);
    color: var(--mt-text-color-regular);
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;

    &--active {
      color: var(--mt-color-primary);
      font-weight: var(--mt-font-weight-medium);
    }

    &--disabled {
      color: var(--mt-text-color-disabled);
      cursor: not-allowed;
    }
  }

  &__line {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: var(--mt-color-primary);
    border-radius: var(--mt-radius-pill);
    transition: transform var(--mt-duration-normal) var(--mt-easing-standard);
  }

  &--line .mt-tabs__nav {
    border-bottom: 1px solid var(--mt-border-color-lighter);
  }

  &--card .mt-tabs__nav {
    margin: var(--mt-spacing-md) var(--mt-spacing-lg);
    overflow: hidden;
    border: 1px solid var(--mt-color-primary);
    border-radius: var(--mt-radius-base);
  }

  &--card .mt-tabs__item {
    height: 32px;

    &--active {
      color: #fff;
      background: var(--mt-color-primary);
    }
  }
}
</style>
