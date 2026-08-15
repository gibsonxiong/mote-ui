<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useLocale } from '../../locale'
import type { MtPullRefreshProps, MtPullRefreshStatus } from './types'

defineOptions({
  name: 'MtPullRefresh',
})

const props = withDefaults(defineProps<MtPullRefreshProps>(), {
  loading: false,
  headHeight: 50,
  successDuration: 500,
  successText: undefined,
  disabled: false,
})

const emit = defineEmits<{
  refresh: []
  'update:loading': [loading: boolean]
}>()

const { t } = useLocale()

const status = ref<MtPullRefreshStatus>('idle')
const distance = ref(0)
const dragging = ref(false)
const startY = ref(0)
let successTimer: ReturnType<typeof setTimeout> | undefined

// Rubber-band resistance once pulled past the trigger distance
function ease(value: number): number {
  if (value <= props.headHeight) return value
  return props.headHeight + (value - props.headHeight) / 2
}

function handleTouchStart(event: TouchEvent) {
  if (props.disabled || props.loading) return
  // Only start a pull when the container is scrolled to the top
  if ((event.currentTarget as HTMLElement).scrollTop !== 0) return
  dragging.value = true
  startY.value = event.touches[0].clientY
}

function handleTouchMove(event: TouchEvent) {
  if (!dragging.value) return
  const delta = event.touches[0].clientY - startY.value
  if (delta <= 0) {
    distance.value = 0
    status.value = 'idle'
    return
  }
  distance.value = ease(delta)
  status.value = distance.value >= props.headHeight ? 'loosing' : 'pulling'
}

function handleTouchEnd() {
  if (!dragging.value) return
  dragging.value = false
  if (status.value === 'loosing') {
    status.value = 'loading'
    distance.value = props.headHeight
    emit('update:loading', true)
    emit('refresh')
  } else {
    status.value = 'idle'
    distance.value = 0
  }
}

// A finished round briefly flashes the success hint before collapsing
watch(
  () => props.loading,
  (loading, previous) => {
    if (!previous || loading) return
    clearTimeout(successTimer)
    if (props.successDuration > 0) {
      status.value = 'success'
      successTimer = setTimeout(() => {
        status.value = 'idle'
        distance.value = 0
      }, props.successDuration)
    } else {
      status.value = 'idle'
      distance.value = 0
    }
  },
)

onBeforeUnmount(() => {
  clearTimeout(successTimer)
})

const headText = computed(() => {
  switch (status.value) {
    case 'pulling':
      return t('pullRefresh.pulling')
    case 'loosing':
      return t('pullRefresh.loosing')
    case 'loading':
      return t('pullRefresh.loading')
    case 'success':
      return props.successText ?? t('pullRefresh.success')
    default:
      return ''
  }
})
</script>

<template>
  <div
    class="mt-pull-refresh"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <div
      class="mt-pull-refresh__head"
      :style="{
        height: `${headHeight}px`,
        transform: `translateY(${distance - headHeight}px)`,
        transitionDuration: dragging ? '0ms' : '300ms',
      }"
    >
      <slot name="head" :status="status">{{ headText }}</slot>
    </div>
    <div
      class="mt-pull-refresh__content"
      :style="{
        transform: `translateY(${distance}px)`,
        transitionDuration: dragging ? '0ms' : '300ms',
      }"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.mt-pull-refresh {
  position: relative;
  overflow: hidden;

  &__head {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--mt-text-color-placeholder);
    font-size: var(--mt-font-size-sm);
    transition-property: transform;
    transition-timing-function: var(--mt-easing-standard);
    overflow: hidden;
  }

  &__content {
    transition-property: transform;
    transition-timing-function: var(--mt-easing-standard);
  }
}
</style>
