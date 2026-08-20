<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { MtTreeSelectChild, MtTreeSelectId, MtTreeSelectItem, MtTreeSelectProps } from './types'

defineOptions({
  name: 'MtTreeSelect',
})

const props = withDefaults(defineProps<MtTreeSelectProps>(), {
  items: () => [],
  activeId: undefined,
  mainActiveIndex: 0,
  height: 300,
  max: undefined,
})

const emit = defineEmits<{
  'update:activeId': [id: MtTreeSelectId]
  'update:mainActiveIndex': [index: number]
  'click-item': [item: MtTreeSelectChild]
  'click-nav': [index: number]
}>()

const internalMainActiveIndex = ref(props.mainActiveIndex)
const internalActiveId = ref(props.activeId)

watch(
  () => props.mainActiveIndex,
  (value) => {
    internalMainActiveIndex.value = value
  },
)

watch(
  () => props.activeId,
  (value) => {
    internalActiveId.value = value
  },
)

const currentMainActiveIndex = computed(() => internalMainActiveIndex.value)
const currentActiveId = computed(() => internalActiveId.value)

const activeChildren = computed<MtTreeSelectChild[]>(
  () => props.items[currentMainActiveIndex.value]?.children ?? [],
)

const rootHeight = computed(() => {
  const { height } = props
  if (typeof height === 'number') return `${height}px`
  return height
})

function badgeText(value: string | number) {
  if (typeof value === 'number' && props.max !== undefined && value > props.max) {
    return `${props.max}+`
  }
  return String(value)
}

function onNavClick(index: number) {
  const item: MtTreeSelectItem | undefined = props.items[index]
  if (!item || item.disabled) return
  internalMainActiveIndex.value = index
  emit('update:mainActiveIndex', index)
  emit('click-nav', index)
}

function onItemClick(item: MtTreeSelectChild) {
  if (item.disabled) return
  internalActiveId.value = item.id
  emit('update:activeId', item.id)
  emit('click-item', item)
}
</script>

<template>
  <div class="mt-tree-select" :style="{ height: rootHeight }">
    <div class="mt-tree-select__nav" role="tablist" aria-orientation="vertical">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="mt-tree-select__nav-item"
        :class="{
          'is-active': index === currentMainActiveIndex,
          'is-disabled': item.disabled,
        }"
        role="tab"
        :aria-selected="index === currentMainActiveIndex"
        @click="onNavClick(index)"
      >
        <span class="mt-tree-select__nav-text">{{ item.text }}</span>
        <span v-if="item.dot" class="mt-tree-select__nav-dot" />
        <span v-else-if="item.badge !== undefined" class="mt-tree-select__nav-badge">
          {{ badgeText(item.badge) }}
        </span>
      </div>
    </div>
    <div class="mt-tree-select__content">
      <div
        v-for="item in activeChildren"
        :key="item.id"
        class="mt-tree-select__item"
        :class="{
          'is-active': item.id === currentActiveId,
          'is-disabled': item.disabled,
        }"
        @click="onItemClick(item)"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.mt-tree-select {
  display: flex;
  position: relative;
  overflow: hidden;
  background: var(--mt-bg-color);

  &__nav {
    flex: none;
    width: 32%;
    overflow-y: auto;
    background: var(--mt-fill-color-light);
  }

  &__nav-item {
    position: relative;
    box-sizing: border-box;
    padding: 12px 8px;
    font-size: var(--mt-font-size-md);
    line-height: var(--mt-line-height-tight);
    color: var(--mt-text-color-primary);
    cursor: pointer;

    &.is-active {
      color: var(--mt-color-primary);
      font-weight: var(--mt-font-weight-medium);
      background: var(--mt-bg-color);
    }

    &.is-disabled {
      color: var(--mt-text-color-placeholder);
      cursor: not-allowed;
    }
  }

  &__nav-text {
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__nav-badge {
    position: absolute;
    top: 8px;
    right: 4px;
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

  &__nav-dot {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 6px;
    height: 6px;
    background: var(--mt-color-danger);
    border-radius: 50%;
  }

  &__content {
    flex: 1;
    overflow-y: auto;
    padding: 8px;
  }

  &__item {
    padding: 8px 12px;
    font-size: var(--mt-font-size-md);
    line-height: var(--mt-line-height-tight);
    color: var(--mt-text-color-primary);
    border-radius: var(--mt-radius-sm);
    cursor: pointer;

    &.is-active {
      color: var(--mt-color-primary);
      font-weight: var(--mt-font-weight-medium);
    }

    &.is-disabled {
      color: var(--mt-text-color-placeholder);
      cursor: not-allowed;
    }
  }
}
</style>