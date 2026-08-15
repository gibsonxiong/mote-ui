<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import MtIcon from '../icon/icon.vue'
import { useLocale } from '../../locale'
import type { MtImageProps } from './types'

defineOptions({
  name: 'MtImage',
})

const props = withDefaults(defineProps<MtImageProps>(), {
  src: undefined,
  alt: undefined,
  fit: 'cover',
  block: false,
  width: undefined,
  height: undefined,
  radius: undefined,
  round: false,
  lazyLoad: false,
  showLoading: true,
  showError: true,
})

const emit = defineEmits<{
  load: [event: Event]
  error: [event: Event]
}>()

const { t } = useLocale()

const rootRef = ref<HTMLElement>()

const visible = ref(false)

let observer: IntersectionObserver | undefined

onMounted(() => {
  if (!props.lazyLoad) {
    return
  }
  if (typeof IntersectionObserver === 'undefined' || !rootRef.value) {
    visible.value = true
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        visible.value = true
        observer?.disconnect()
      }
    },
    { rootMargin: '50px' },
  )
  observer.observe(rootRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

const currentSrc = computed(() => {
  if (props.lazyLoad && !visible.value) {
    return undefined
  }
  return props.src
})

type Status = 'loading' | 'loaded' | 'error'

const status = ref<Status>('loading')

watch(currentSrc, () => {
  status.value = 'loading'
})

function onLoad(event: Event) {
  status.value = 'loaded'
  emit('load', event)
}

function onError(event: Event) {
  status.value = 'error'
  emit('error', event)
}

function toSize(value: number | string | undefined) {
  if (value === undefined) {
    return undefined
  }
  return typeof value === 'number' ? `${value}px` : value
}

const rootStyle = computed(() => ({
  width: toSize(props.width),
  height: toSize(props.height),
  borderRadius: toSize(props.radius),
}))
</script>

<template>
  <div
    ref="rootRef"
    class="mt-image"
    :class="{ 'mt-image--round': round, 'mt-image--block': block }"
    :style="rootStyle"
  >
    <img
      v-if="currentSrc && status !== 'error'"
      class="mt-image__img"
      :src="currentSrc"
      :alt="alt"
      :style="{ objectFit: fit }"
      @load="onLoad"
      @error="onError"
    >
    <div v-if="status === 'loading' && showLoading" class="mt-image__placeholder">
      <slot name="loading">
        <MtIcon name="loading" class="mt-image__loading" />
      </slot>
    </div>
    <div v-else-if="status === 'error' && showError" class="mt-image__placeholder">
      <slot name="error">
        <span class="mt-image__error-text">{{ t('image.error') }}</span>
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
.mt-image {
  position: relative;
  display: inline-block;
  overflow: hidden;

  &--block {
    display: block;
  }

  &--round {
    border-radius: 50%;
  }

  &__img {
    display: block;
    width: 100%;
    height: 100%;
  }

  &__placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--mt-text-color-placeholder);
    background: var(--mt-fill-color-light);
  }

  &__loading {
    font-size: var(--mt-font-size-xl);
  }

  &__error-text {
    font-size: var(--mt-font-size-sm);
  }
}
</style>
