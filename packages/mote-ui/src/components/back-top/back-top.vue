<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import MtIcon from '../icon/icon.vue'
import type { MtBackTopProps } from './types'

defineOptions({
  name: 'MtBackTop',
})

const props = withDefaults(defineProps<MtBackTopProps>(), {
  target: undefined,
  visibilityHeight: 200,
  right: 24,
  bottom: 48,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const visible = ref(false)
let scrollTarget: HTMLElement | Window | undefined
// Tracked separately because `instanceof Window` is unreliable across
// test environments
let targetIsWindow = true

function resolveTarget(): HTMLElement | Window {
  if (!props.target) return window
  if (typeof props.target === 'string') {
    return document.querySelector<HTMLElement>(props.target) ?? window
  }
  return props.target
}

function scrollTopOf(target: HTMLElement | Window): number {
  return targetIsWindow ? (target as Window).scrollY : (target as HTMLElement).scrollTop
}

function handleScroll() {
  if (!scrollTarget) return
  visible.value = scrollTopOf(scrollTarget) > props.visibilityHeight
}

function handleClick(event: MouseEvent) {
  scrollTarget?.scrollTo({ top: 0, behavior: 'smooth' })
  emit('click', event)
}

onMounted(() => {
  scrollTarget = resolveTarget()
  targetIsWindow = scrollTarget === window
  scrollTarget.addEventListener('scroll', handleScroll)
  handleScroll()
})

onBeforeUnmount(() => {
  scrollTarget?.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Transition name="mt-back-top">
    <div
      v-show="visible"
      class="mt-back-top"
      role="button"
      aria-label="Back to top"
      :style="{ right: `${right}px`, bottom: `${bottom}px` }"
      @click="handleClick"
    >
      <slot>
        <MtIcon name="arrow-up" />
      </slot>
    </div>
  </Transition>
</template>

<style lang="scss">
.mt-back-top {
  position: fixed;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--mt-bg-color);
  color: var(--mt-color-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  user-select: none;
}

.mt-back-top-enter-active,
.mt-back-top-leave-active {
  transition: opacity 0.2s var(--mt-easing-standard);
}

.mt-back-top-enter-from,
.mt-back-top-leave-to {
  opacity: 0;
}
</style>
