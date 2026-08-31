<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { MtStickyProps } from './types'

defineOptions({
  name: 'MtSticky',
})

const props = withDefaults(defineProps<MtStickyProps>(), {
  offset: 0,
  position: 'top',
  target: '',
  zIndex: 100,
})

const emit = defineEmits<{
  change: [fixed: boolean]
  scroll: [scrollTop: number, fixed: boolean]
}>()

const rootRef = ref<HTMLElement>()
const fixed = ref(false)

function getTarget(): Window | HTMLElement {
  if (!props.target) return window
  return document.querySelector(props.target) as HTMLElement
}

function getScrollTop(): number {
  const target = getTarget()
  if (target === window) return window.pageYOffset || document.documentElement.scrollTop
  return (target as HTMLElement).scrollTop
}

function getContainerBounds(): { top: number; bottom: number } {
  const target = getTarget()
  if (target === window) return { top: 0, bottom: window.innerHeight }
  const rect = (target as HTMLElement).getBoundingClientRect()
  return { top: rect.top, bottom: rect.bottom }
}

function onScroll() {
  const root = rootRef.value
  if (!root) return

  const rootRect = root.getBoundingClientRect()
  const { top, bottom } = getContainerBounds()
  const isFixed =
    props.position === 'top' ? rootRect.top <= top + props.offset : rootRect.bottom >= bottom - props.offset

  emit('scroll', getScrollTop(), isFixed)
  if (isFixed !== fixed.value) {
    fixed.value = isFixed
    emit('change', isFixed)
  }
}

onMounted(() => {
  // Capture-phase handling so scrolls bubbling from any nested scroller
  // still reach the handler (scroll does not bubble).
  getTarget().addEventListener('scroll', onScroll, true)
  window.addEventListener('resize', onScroll)
  window.addEventListener('orientationchange', onScroll)
  onScroll()
})

onBeforeUnmount(() => {
  getTarget().removeEventListener('scroll', onScroll, true)
  window.removeEventListener('resize', onScroll)
  window.removeEventListener('orientationchange', onScroll)
})

const stickyStyle = computed(() => {
  const style: Record<string, string | number> = { zIndex: props.zIndex }
  if (props.position === 'top') style.top = `${props.offset}px`
  else style.bottom = `${props.offset}px`
  return style
})
</script>

<template>
  <div ref="rootRef" class="mt-sticky" :style="stickyStyle">
    <slot />
  </div>
</template>

<style lang="scss">
.mt-sticky {
  // The sticky element must be a direct child of the scroll container, with
  // enough scroll room around it, for `position: sticky` to take effect.
  // Wrapping it in an inner div of identical height leaves no room to stick.
  position: sticky;
}
</style>