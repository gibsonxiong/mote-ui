<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { MtSwipeCellPosition, MtSwipeCellProps } from './types'

defineOptions({
  name: 'MtSwipeCell',
})

const props = withDefaults(defineProps<MtSwipeCellProps>(), {
  modelValue: 'none',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [position: MtSwipeCellPosition]
  open: [position: 'left' | 'right']
  close: []
}>()

const rootRef = ref<HTMLElement>()
const leftRef = ref<HTMLElement>()
const rightRef = ref<HTMLElement>()

const position = ref<MtSwipeCellPosition>(props.modelValue)

watch(
  () => props.modelValue,
  (value) => {
    position.value = value
  },
)

function sideWidth(side: 'left' | 'right'): number {
  return (side === 'left' ? leftRef.value : rightRef.value)?.offsetWidth ?? 0
}

function offsetFor(value: MtSwipeCellPosition): number {
  if (value === 'left') return sideWidth('left')
  if (value === 'right') return -sideWidth('right')
  return 0
}

const offset = ref(offsetFor(position.value))

watch(position, (value) => {
  offset.value = offsetFor(value)
})

// offsetFor() reads offsetWidth, which is unavailable during setup (the
// left/right refs aren't attached yet). Recompute once after mount so a cell
// rendered with an already-open modelValue applies the correct offset.
onMounted(() => {
  nextTick(() => {
    offset.value = offsetFor(position.value)
  })
})

const wrapperStyle = computed(() => ({
  transform: `translateX(${offset.value}px)`,
}))

function setPosition(value: MtSwipeCellPosition) {
  // Always emit: dragging back to an unchanged position still needs the
  // offset snapped back via update:modelValue round-trips.
  position.value = value
  emit('update:modelValue', value)
  if (value === 'none') emit('close')
  else emit('open', value)
}

function open(value: 'left' | 'right') {
  // Mark the interaction so the same click/tap that opened the cell (e.g. a
  // button) is ignored by the document click handler, which would otherwise
  // immediately close the cell it just opened.
  lastTouchAt = Date.now()
  setPosition(value)
}

function close() {
  setPosition('none')
}

const dragging = ref(false)
const startX = ref(0)
const startOffset = ref(0)
// Guards against the synthetic click fired right after a touch gesture
// instantly closing a freshly opened cell.
let lastTouchAt = 0

function handleTouchStart(event: TouchEvent) {
  if (props.disabled) return
  dragging.value = true
  startX.value = event.touches[0].clientX
  startOffset.value = offset.value
}

function handleTouchMove(event: TouchEvent) {
  if (!dragging.value || props.disabled) return
  const deltaX = event.touches[0].clientX - startX.value
  const leftWidth = sideWidth('left')
  const rightWidth = sideWidth('right')
  offset.value = Math.min(Math.max(startOffset.value + deltaX, -rightWidth), leftWidth)
}

function handleTouchEnd() {
  if (!dragging.value) return
  dragging.value = false
  lastTouchAt = Date.now()
  // Crossing half of a side's width commits to opening it
  if (offset.value > sideWidth('left') / 2) setPosition('left')
  else if (offset.value < -sideWidth('right') / 2) setPosition('right')
  // Otherwise snap back to the current position's offset (0 when closed, the
  // open width when already open) instead of hardcoding 0 — which left an
  // open cell visually closed while `position` stayed open.
  else offset.value = offsetFor(position.value)
}

function handleDocumentClick(event: MouseEvent) {
  if (Date.now() - lastTouchAt < 300) return
  if (position.value !== 'none' && !rootRef.value?.contains(event.target as Node)) {
    close()
  }
}

watch(
  position,
  (value) => {
    if (value === 'none') document.removeEventListener('click', handleDocumentClick)
    else document.addEventListener('click', handleDocumentClick)
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})

defineExpose({ open, close })
</script>

<template>
  <div
    ref="rootRef"
    class="mt-swipe-cell"
    :class="{ 'is-disabled': disabled }"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <div class="mt-swipe-cell__wrapper" :style="wrapperStyle">
      <div v-if="$slots.left" ref="leftRef" class="mt-swipe-cell__left">
        <slot name="left" />
      </div>
      <div class="mt-swipe-cell__content">
        <slot />
      </div>
      <div v-if="$slots.right" ref="rightRef" class="mt-swipe-cell__right">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.mt-swipe-cell {
  position: relative;
  overflow: hidden;
  background-color: var(--mt-bg-color);

  &__wrapper {
    position: relative;
    width: 100%;
    transition: transform var(--mt-duration-fast) var(--mt-easing-standard);
  }

  &__left,
  &__right {
    position: absolute;
    top: 0;
    height: 100%;
    display: flex;
    align-items: stretch;
  }

  &__left {
    left: 0;
    transform: translateX(-100%);
  }

  &__right {
    right: 0;
    transform: translateX(100%);
  }

  &__content {
    width: 100%;
  }
}
</style>
