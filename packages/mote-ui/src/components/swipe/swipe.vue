<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, onUpdated, ref, watch } from 'vue'
import { usePointerDrag } from '../../composables/use-pointer-drag'
import type { MtSwipeProps } from './types'

defineOptions({
  name: 'MtSwipe',
})

const props = withDefaults(defineProps<MtSwipeProps>(), {
  modelValue: 0,
  autoplay: 0,
  duration: 300,
  loop: true,
  showIndicators: true,
  vertical: false,
})

const emit = defineEmits<{
  'update:modelValue': [index: number]
  change: [index: number]
}>()

const rootRef = ref<HTMLElement>()
const trackRef = ref<HTMLElement>()

const slideCount = ref(0)

function updateSlideCount() {
  const count = trackRef.value?.children.length ?? 0
  if (count !== slideCount.value) slideCount.value = count
}

const current = ref(props.modelValue)

watch(
  () => props.modelValue,
  (index) => {
    current.value = index
  },
)

// Plain function instead of a computed: the size comes from the DOM and
// must be re-read on every evaluation.
function measure(): number {
  if (!rootRef.value) return 0
  return props.vertical ? rootRef.value.offsetHeight : rootRef.value.offsetWidth
}

const delta = ref(0)

const axisDelta = (info: { deltaX: number; deltaY: number }) =>
  props.vertical ? info.deltaY : info.deltaX

const { dragging } = usePointerDrag(rootRef, {
  direction: () => (props.vertical ? 'vertical' : 'horizontal'),
  onStart: () => {
    delta.value = 0
    stopAutoplay()
  },
  onMove: (info) => {
    delta.value = axisDelta(info)
  },
  onEnd: (info) => {
    // A quarter of the slide size is enough intent to switch
    const threshold = measure() / 4
    if (axisDelta(info) <= -threshold) moveBy(1)
    else if (axisDelta(info) >= threshold) moveBy(-1)
    delta.value = 0
    startAutoplay()
  },
})

const trackStyle = computed(() => ({
  transform: `${props.vertical ? 'translateY' : 'translateX'}(${
    delta.value - current.value * measure()
  }px)`,
  transitionDuration: dragging.value ? '0ms' : `${props.duration}ms`,
}))

function moveTo(index: number) {
  if (index === current.value || slideCount.value === 0) return
  current.value = index
  emit('update:modelValue', index)
  emit('change', index)
}

function moveBy(offset: number) {
  if (offset === 0 || slideCount.value <= 1) return
  let next = current.value + offset
  if (props.loop) {
    next = (next + slideCount.value) % slideCount.value
  } else {
    next = Math.min(Math.max(next, 0), slideCount.value - 1)
  }
  moveTo(next)
}

let timer: ReturnType<typeof setInterval> | undefined

function startAutoplay() {
  stopAutoplay()
  if (props.autoplay > 0 && slideCount.value > 1) {
    timer = setInterval(() => moveBy(1), props.autoplay)
  }
}

function stopAutoplay() {
  if (timer) clearInterval(timer)
  timer = undefined
}

watch(
  () => props.autoplay,
  () => startAutoplay(),
)

onMounted(() => {
  updateSlideCount()
  startAutoplay()
})

// Keep the count in sync when slides are added or removed dynamically.
onUpdated(updateSlideCount)

onBeforeUnmount(stopAutoplay)
</script>

<template>
  <div
    ref="rootRef"
    class="mt-swipe"
    :class="{ 'mt-swipe--vertical': vertical }"
  >
    <div ref="trackRef" class="mt-swipe__track" :style="trackStyle">
      <slot />
    </div>
    <div v-if="showIndicators && slideCount > 1" class="mt-swipe__indicators">
      <span
        v-for="index in slideCount"
        :key="index"
        class="mt-swipe__indicator"
        :class="{ 'is-active': index - 1 === current }"
        @click="moveTo(index - 1)"
      />
    </div>
  </div>
</template>

<style lang="scss">
.mt-swipe {
  position: relative;
  overflow: hidden;

  &__track {
    display: flex;
    transition-property: transform;
    transition-timing-function: var(--mt-easing-standard);
  }

  &__track > * {
    flex-shrink: 0;
    width: 100%;
  }

  &--vertical {
    .mt-swipe__track {
      flex-direction: column;
      height: 100%;
    }

    .mt-swipe__track > * {
      width: auto;
      height: 100%;
    }

    .mt-swipe__indicators {
      top: 50%;
      bottom: auto;
      right: 8px;
      left: auto;
      transform: translateY(-50%);
      flex-direction: column;
    }
  }

  &__indicators {
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 6px;
  }

  &__indicator {
    width: 6px;
    height: 6px;
    border-radius: var(--mt-radius-pill);
    background-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;

    &.is-active {
      background-color: var(--mt-color-primary);
    }
  }
}
</style>
