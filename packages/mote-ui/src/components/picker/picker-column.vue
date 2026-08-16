<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { usePointerDrag } from '../../composables/use-pointer-drag'
import { settleIndex } from './momentum'
import type { MtPickerOption } from './types'

defineOptions({
  name: 'MtPickerColumn',
})

const props = withDefaults(
  defineProps<{
    options: MtPickerOption[]
    index: number
    optionHeight: number
    visibleOptionNum: number
  }>(),
  {
    optionHeight: 44,
    visibleOptionNum: 6,
  },
)

const emit = defineEmits<{
  'update:index': [index: number]
  change: [index: number]
}>()

const wrapperRef = ref<HTMLElement | null>(null)
const dragOffset = ref(0)
const animated = ref(true)

let startOffset = 0
let moved = false

const translateY = computed(() => {
  const extra = dragging.value ? dragOffset.value : 0
  return (props.visibleOptionNum - 1) / 2 - props.index + extra / props.optionHeight
})

const wrapperStyle = computed(() => ({
  height: `${props.optionHeight * props.visibleOptionNum}px`,
}))

const wheelStyle = computed(() => ({
  transform: `translate3d(0, ${translateY.value * props.optionHeight}px, 0)`,
  transitionDuration: animated.value && !dragging.value ? '300ms' : '0ms',
}))

function clampIndex(index: number) {
  return Math.max(0, Math.min(props.options.length - 1, index))
}

/** Returns the nearest non-disabled index to `index`, skipping disabled options. */
function resolveEnabledIndex(index: number): number {
  const options = props.options
  if (!options[index]?.disabled) return index
  const length = options.length
  for (let offset = 1; offset < length; offset++) {
    const down = index + offset
    const up = index - offset
    if (down < length && !options[down]?.disabled) return down
    if (up >= 0 && !options[up]?.disabled) return up
  }
  return index
}

function commitIndex(next: number) {
  const clamped = clampIndex(next)
  const resolved = resolveEnabledIndex(clamped)
  if (props.options[resolved]?.disabled) return
  if (resolved !== props.index) {
    emit('update:index', resolved)
    emit('change', resolved)
  }
}

function getIndexFromClientY(clientY: number) {
  const wrapper = wrapperRef.value
  if (!wrapper) return props.index
  const rect = wrapper.getBoundingClientRect()
  const relative = clientY - rect.top - rect.height / 2
  return props.index + Math.round(relative / props.optionHeight)
}

const { dragging } = usePointerDrag(wrapperRef, {
  direction: 'vertical',
  onStart: () => {
    animated.value = false
    moved = false
    dragOffset.value = 0
    startOffset = 0
  },
  onMove: (info) => {
    startOffset = info.deltaY
    if (Math.abs(startOffset) > 4) moved = true
    dragOffset.value = startOffset
  },
  onEnd: (info) => {
    animated.value = true

    if (!moved) {
      // Treat as a tap: select the option under the pointer position
      commitIndex(getIndexFromClientY(info.clientY))
      return
    }

    const nextIndex = settleIndex(props.index, startOffset, info.velocity, props.optionHeight)
    commitIndex(nextIndex)
  },
})

function handleOptionClick(optionIndex: number) {
  if (moved) return
  commitIndex(optionIndex)
}

watch(
  () => props.options.length,
  () => {
    if (props.index > props.options.length - 1) {
      commitIndex(props.options.length - 1)
    }
  },
)
</script>

<template>
  <div
    ref="wrapperRef"
    class="mt-picker-column"
    :style="wrapperStyle"
  >
    <div class="mt-picker-column__wheel" :style="wheelStyle">
      <div
        v-for="(option, optionIndex) in options"
        :key="optionIndex"
        class="mt-picker-column__option"
        :class="{
          'is-selected': optionIndex === index,
          'is-disabled': option.disabled,
        }"
        :style="{ height: `${optionHeight}px` }"
        @click="handleOptionClick(optionIndex)"
      >
        {{ option.text }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.mt-picker-column {
  flex: 1;
  position: relative;
  overflow: hidden;
  cursor: grab;
  user-select: none;

  &__wheel {
    transition-property: transform;
    transition-timing-function: var(--mt-easing-standard);
  }

  &__option {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 var(--mt-spacing-sm);
    color: var(--mt-text-color-regular);
    font-size: var(--mt-font-size-lg);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &.is-selected {
      color: var(--mt-text-color-primary);
      font-weight: var(--mt-font-weight-medium);
    }

    &.is-disabled {
      opacity: 0.4;
      pointer-events: none;
    }
  }
}
</style>
