<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useLocale } from '../../locale'
import type { MtListProps } from './types'

defineOptions({
  name: 'MtList',
})

const props = withDefaults(defineProps<MtListProps>(), {
  loading: false,
  finished: false,
  error: false,
  offset: 300,
  immediateCheck: true,
  loadingText: undefined,
  finishedText: undefined,
  errorText: undefined,
})

const emit = defineEmits<{
  load: []
  'update:loading': [loading: boolean]
  'update:error': [error: boolean]
}>()

const { t } = useLocale()

const sentinelRef = ref<HTMLElement>()
let observer: IntersectionObserver | undefined

function check() {
  if (props.loading || props.finished || props.error) return
  emit('update:loading', true)
  emit('load')
}

function retry() {
  emit('update:error', false)
  check()
}

function createObserver() {
  if (typeof IntersectionObserver === 'undefined' || !sentinelRef.value) {
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) check()
    },
    { rootMargin: `0px 0px ${props.offset}px 0px` },
  )
  observer.observe(sentinelRef.value)
}

// Re-check once a load round settles so screens that are not yet filled
// keep loading until the content pushes the sentinel out of range.
watch(
  () => [props.loading, props.error],
  ([loading, error]) => {
    if (!loading && !error) check()
  },
)

onMounted(() => {
  createObserver()
  if (props.immediateCheck) check()
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="mt-list">
    <slot />
    <div v-if="error" class="mt-list__error" @click="retry">
      <slot name="error">{{ errorText ?? t('list.error') }}</slot>
    </div>
    <div v-else-if="loading" class="mt-list__loading">
      <slot name="loading">{{ loadingText ?? t('list.loading') }}</slot>
    </div>
    <div v-else-if="finished" class="mt-list__finished">
      <slot name="finished">{{ finishedText ?? t('list.finished') }}</slot>
    </div>
    <div ref="sentinelRef" class="mt-list__sentinel" aria-hidden="true" />
  </div>
</template>

<style lang="scss">
.mt-list {
  &__loading,
  &__finished,
  &__error {
    padding: 12px 16px;
    text-align: center;
    color: var(--mt-text-color-placeholder);
    font-size: var(--mt-font-size-sm);
  }

  &__error {
    color: var(--mt-color-primary);
    cursor: pointer;
  }

  &__sentinel {
    height: 1px;
  }
}
</style>
