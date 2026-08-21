<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { MtFloatingBubbleOffset, MtFloatingBubbleProps } from './types'
import { applyAxis, snapOffset } from './utils'

defineOptions({
  name: 'MtFloatingBubble',
})

const props = withDefaults(defineProps<MtFloatingBubbleProps>(), {
  axis: 'y',
  magnetic: 'x',
  gap: 24,
  offset: () => ({ x: 0, y: 0 }),
  teleport: 'body',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
  offsetChange: [offset: MtFloatingBubbleOffset]
}>()

const rootRef = ref<HTMLElement>()

const offset = reactive<MtFloatingBubbleOffset>({
  x: props.offset.x,
  y: props.offset.y,
})

const positionStyle = computed(() => ({
  right: `${props.gap + offset.x}px`,
  bottom: `${props.gap + offset.y}px`,
}))

let dragging = false
let moved = false
let startX = 0
let startY = 0
let startOffset: MtFloatingBubbleOffset = { x: 0, y: 0 }

function getSize(): { width: number; height: number } {
  const el = rootRef.value
  return {
    width: el?.offsetWidth ?? 48,
    height: el?.offsetHeight ?? 48,
  }
}

function onPointerDown(event: PointerEvent) {
  dragging = true
  moved = false
  startX = event.clientX
  startY = event.clientY
  startOffset = { ...offset }
  ;(event.currentTarget as HTMLElement)?.setPointerCapture?.(event.pointerId)
}

function onPointerMove(event: PointerEvent) {
  if (!dragging) return
  const deltaX = event.clientX - startX
  const deltaY = event.clientY - startY
  if (deltaX !== 0 || deltaY !== 0) moved = true

  const next = applyAxis(
    startOffset,
    { x: startOffset.x - deltaX, y: startOffset.y - deltaY },
    props.axis,
  )
  offset.x = next.x
  offset.y = next.y
}

function onPointerUp() {
  if (!dragging) return
  dragging = false
  if (!moved) return

  const snapped = snapOffset(
    { ...offset },
    props.magnetic,
    { width: window.innerWidth, height: window.innerHeight },
    getSize(),
    props.gap,
  )
  offset.x = snapped.x
  offset.y = snapped.y
  emit('offsetChange', { ...offset })
}

function onClick(event: MouseEvent) {
  if (dragging) return
  emit('click', event)
}
</script>

<template>
  <Teleport :to="teleport">
    <div
      ref="rootRef"
      class="mt-floating-bubble"
      :style="positionStyle"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @click="onClick"
    >
      <slot>+</slot>
    </div>
  </Teleport>
</template>

<style lang="scss">
.mt-floating-bubble {
  position: fixed;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--mt-color-primary);
  color: #fff;
  font-size: var(--mt-font-size-xl);
  cursor: grab;
  box-shadow: var(--mt-shadow-base);
  touch-action: none;
  user-select: none;

  &:active {
    cursor: grabbing;
  }
}
</style>