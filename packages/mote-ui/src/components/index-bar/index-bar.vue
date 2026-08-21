<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, provide, reactive, ref, toRefs } from 'vue'
import type { MtIndexBarContext, MtIndexBarIndex, MtIndexBarInstance, MtIndexBarProps } from './types'
import { indexBarKey } from './types'

defineOptions({
  name: 'MtIndexBar',
})

const props = withDefaults(defineProps<MtIndexBarProps>(), {
  indexList: undefined,
  zIndex: 1,
  sticky: true,
  stickyOffsetTop: 0,
  highlightColor: undefined,
})

const emit = defineEmits<{
  select: [index: MtIndexBarIndex]
  change: [index: MtIndexBarIndex]
}>()

const rootRef = ref<HTMLElement>()
const activeIndex = ref<MtIndexBarIndex | undefined>()

const defaultIndexList = computed(() =>
  Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)),
)

const indexList = computed(() => props.indexList ?? defaultIndexList.value)

const anchors = new Map<MtIndexBarIndex, HTMLElement>()

const register = (index: MtIndexBarIndex, el: HTMLElement) => {
  anchors.set(index, el)
}

const unregister = (index: MtIndexBarIndex) => {
  anchors.delete(index)
}

const scrollTo = (index: MtIndexBarIndex) => {
  const el = anchors.get(index)
  el?.scrollIntoView?.()
}

function onSelect(index: MtIndexBarIndex) {
  activeIndex.value = index
  scrollTo(index)
  emit('select', index)
  emit('change', index)
}

function onScroll() {
  if (!rootRef.value) return
  let current: MtIndexBarIndex | undefined
  for (const index of indexList.value) {
    const el = anchors.get(index)
    if (!el) continue
    if (el.getBoundingClientRect().top <= props.stickyOffsetTop) current = index
  }
  if (current !== undefined && current !== activeIndex.value) {
    activeIndex.value = current
    emit('change', current)
  }
}

onMounted(() => {
  // Capture-phase so scrolls from any nested scroller reach the handler.
  window.addEventListener('scroll', onScroll, true)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll, true)
})

provide(
  indexBarKey,
  reactive({
    ...toRefs(props),
    indexList,
    activeIndex,
    register,
    unregister,
    scrollTo,
  }) as unknown as MtIndexBarContext,
)

defineExpose<MtIndexBarInstance>({ scrollTo })
</script>

<template>
  <div ref="rootRef" class="mt-index-bar">
    <div class="mt-index-bar__body">
      <slot />
    </div>
    <div class="mt-index-bar__sidebar" :style="{ zIndex }">
      <div
        v-for="index in indexList"
        :key="index"
        class="mt-index-bar__index"
        :class="{ 'mt-index-bar__index--active': index === activeIndex }"
        :style="index === activeIndex && highlightColor ? { color: highlightColor } : undefined"
        @click="onSelect(index)"
      >
        {{ index }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.mt-index-bar {
  position: relative;
  box-sizing: border-box;
  height: 100%;

  &__body {
    height: 100%;
    overflow: auto;
  }

  &__sidebar {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__index {
    padding: 0 8px;
    font-size: var(--mt-font-size-xs);
    line-height: 16px;
    color: var(--mt-text-color-secondary);
    cursor: pointer;
    user-select: none;

    &--active {
      font-weight: var(--mt-font-weight-bold);
      color: var(--mt-color-primary);
    }
  }
}
</style>