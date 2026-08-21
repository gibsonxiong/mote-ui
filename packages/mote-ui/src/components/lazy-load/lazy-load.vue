<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { MtLazyLoadProps } from './types'

defineOptions({
  name: 'MtLazyLoad',
})

const props = withDefaults(defineProps<MtLazyLoadProps>(), {
  root: undefined,
  rootMargin: '0px',
  threshold: 0,
  disabled: false,
})

const emit = defineEmits<{
  load: [entry: IntersectionObserverEntry]
}>()

const rootRef = ref<HTMLElement>()
const loaded = ref(false)

let observer: IntersectionObserver | undefined

function resolveRoot(): Element | Document | null {
  if (!props.root) return null
  if (typeof props.root === 'string') return document.querySelector(props.root)
  return props.root
}

onMounted(() => {
  if (props.disabled || !rootRef.value || typeof IntersectionObserver === 'undefined') {
    loaded.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries.find((item) => item.isIntersecting)
      if (entry) {
        loaded.value = true
        emit('load', entry)
        observer?.disconnect()
      }
    },
    {
      root: resolveRoot(),
      rootMargin: props.rootMargin,
      threshold: props.threshold,
    },
  )
  observer.observe(rootRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <div ref="rootRef" class="mt-lazy-load">
    <slot v-if="loaded" />
    <slot v-else name="placeholder" />
  </div>
</template>

<style lang="scss">
.mt-lazy-load {
  min-width: 0;
}
</style>