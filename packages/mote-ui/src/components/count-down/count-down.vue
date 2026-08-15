<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { MtCountDownCurrentTime, MtCountDownProps } from './types'

defineOptions({
  name: 'MtCountDown',
})

const props = withDefaults(defineProps<MtCountDownProps>(), {
  time: 0,
  format: 'HH:mm:ss',
  autoStart: true,
})

const emit = defineEmits<{
  change: [current: MtCountDownCurrentTime]
  finish: []
}>()

const remaining = ref(props.time)
let endTime = 0
let timer: ReturnType<typeof setInterval> | undefined

function parseTime(total: number): MtCountDownCurrentTime {
  return {
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total % 86_400_000) / 3_600_000),
    minutes: Math.floor((total % 3_600_000) / 60_000),
    seconds: Math.floor((total % 60_000) / 1000),
    milliseconds: total % 1000,
    total,
  }
}

const current = computed(() => parseTime(remaining.value))

function pad(value: number, length = 2): string {
  return String(value).padStart(length, '0')
}

// Higher tokens roll down into lower ones when the format omits them,
// so `mm:ss` on 1h30m renders 90:00.
const formatted = computed(() => {
  const { days } = current.value
  let hours = current.value.hours
  let minutes = current.value.minutes
  let seconds = current.value.seconds
  if (!props.format.includes('DD')) hours += days * 24
  if (!props.format.includes('HH')) minutes += hours * 60
  if (!props.format.includes('mm')) seconds += minutes * 60
  return props.format
    .replace('DD', pad(days))
    .replace('HH', pad(hours))
    .replace('mm', pad(minutes))
    .replace('ss', pad(seconds))
    .replace('SSS', pad(current.value.milliseconds, 3))
})

function tick() {
  const next = Math.max(endTime - Date.now(), 0)
  remaining.value = next
  emit('change', current.value)
  if (next === 0) {
    pause()
    emit('finish')
  }
}

function start() {
  if (timer || remaining.value === 0) return
  endTime = Date.now() + remaining.value
  timer = setInterval(tick, 30)
}

function pause() {
  if (timer) clearInterval(timer)
  timer = undefined
}

function reset() {
  pause()
  remaining.value = props.time
  if (props.autoStart) start()
}

watch(() => props.time, reset)

onMounted(() => {
  if (props.autoStart) start()
})

onBeforeUnmount(pause)

defineExpose({ start, pause, reset })
</script>

<template>
  <span class="mt-count-down">
    <slot :time="current">{{ formatted }}</slot>
  </span>
</template>

<style lang="scss">
.mt-count-down {
  color: var(--mt-text-color-primary);
  font-size: var(--mt-font-size-md);
  font-variant-numeric: tabular-nums;
}
</style>
