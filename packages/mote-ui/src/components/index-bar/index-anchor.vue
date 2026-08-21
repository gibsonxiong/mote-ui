<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import type { MtIndexAnchorProps } from './types'
import { indexBarKey } from './types'

defineOptions({
  name: 'MtIndexAnchor',
})

const props = withDefaults(defineProps<MtIndexAnchorProps>(), {
  index: 0,
})

const context = inject(indexBarKey, null)

const anchorRef = ref<HTMLElement>()

const active = computed(() => context?.activeIndex === props.index)

const stickyStyle = computed(() => {
  if (!context?.sticky) return undefined
  return {
    zIndex: context.zIndex,
    top: context.stickyOffsetTop ? `${context.stickyOffsetTop}px` : undefined,
  }
})

onMounted(() => {
  if (context && anchorRef.value) context.register(props.index, anchorRef.value)
})

onBeforeUnmount(() => {
  if (context) context.unregister(props.index)
})
</script>

<template>
  <div ref="anchorRef" class="mt-index-anchor">
    <div
      class="mt-index-anchor__sticky"
      :class="{ 'mt-index-anchor__sticky--active': active }"
      :style="stickyStyle"
    >
      {{ index }}
    </div>
    <div class="mt-index-anchor__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.mt-index-anchor {
  &__sticky {
    position: sticky;
    background: var(--mt-bg-color);
    padding: 0 16px;
    line-height: 32px;
    font-size: var(--mt-font-size-sm);
    color: var(--mt-text-color-regular);

    &--active {
      color: var(--mt-color-primary);
    }
  }
}
</style>