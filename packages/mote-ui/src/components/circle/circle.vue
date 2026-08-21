<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { MtCircleProps } from './types'

defineOptions({
  name: 'MtCircle',
})

const props = withDefaults(defineProps<MtCircleProps>(), {
  modelValue: 0,
  rate: 100,
  speed: 0,
  size: 100,
  strokeWidth: 40,
  color: undefined,
  layerColor: undefined,
  fill: undefined,
  clockwise: true,
  strokeLinecap: 'round',
  text: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const current = ref(props.modelValue)
let rafId = 0

const clampedRate = computed(() => clamp(props.rate))

const progressColor = computed(() => props.color ?? 'var(--mt-color-primary)')
const layerColor = computed(() => props.layerColor ?? 'var(--mt-bg-color-page)')

const radius = computed(() => Math.max(0, (props.size - props.strokeWidth) / 2))
const circumference = computed(() => 2 * Math.PI * radius.value)
const dashOffset = computed(() => circumference.value * (1 - clampedRate.value / 100))

const transform = computed(() => {
  const rotate = 'rotate(-90deg)'
  return props.clockwise ? rotate : `${rotate} scaleX(-1)`
})

const displayText = computed(() => props.text || `${Math.floor(clampedRate.value)}%`)

function clamp(value: number): number {
  return Math.min(Math.max(value, 0), 100)
}

function setCurrent(value: number) {
  if (value === current.value) return
  current.value = value
  emit('update:modelValue', value)
}

function animate(target: number) {
  cancelAnimationFrame(rafId)
  const start = current.value
  const delta = target - start
  if (props.speed <= 0 || delta === 0) {
    setCurrent(target)
    return
  }
  const startTime = performance.now()
  const duration = (Math.abs(delta) / props.speed) * 1000
  const step = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1)
    const next = start + delta * progress
    setCurrent(next)
    if (progress < 1) rafId = requestAnimationFrame(step)
    else setCurrent(target)
  }
  rafId = requestAnimationFrame(step)
}

watch(
  () => props.modelValue,
  (value) => {
    current.value = value
  },
)

watch(
  () => props.rate,
  (value) => animate(clamp(value)),
  { immediate: true },
)
</script>

<template>
  <div class="mt-circle" :style="{ width: `${size}px`, height: `${size}px` }">
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
      <circle
        class="mt-circle__layer"
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        :fill="fill ?? 'none'"
        :stroke="layerColor"
        :stroke-width="strokeWidth"
      />
      <circle
        class="mt-circle__progress"
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        :stroke="progressColor"
        :stroke-width="strokeWidth"
        :stroke-linecap="strokeLinecap"
        :style="{
          strokeDasharray: `${circumference}px`,
          strokeDashoffset: `${dashOffset}px`,
          transform,
        }"
      />
    </svg>
    <div class="mt-circle__text">
      <slot>{{ displayText }}</slot>
    </div>
  </div>
</template>

<style lang="scss">
.mt-circle {
  position: relative;
  display: inline-flex;

  svg {
    display: block;
  }

  &__progress {
    transform-origin: center;
    transform-box: fill-box;
    transition: stroke-dashoffset var(--mt-duration-normal) var(--mt-easing-standard);
  }

  &__text {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--mt-text-color-regular);
    font-size: var(--mt-font-size-lg);
  }
}
</style>