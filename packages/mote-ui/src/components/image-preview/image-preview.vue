<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import MtSwipe from '../swipe/swipe.vue'
import MtIcon from '../icon/icon.vue'
import { nextZIndex } from '../../utils/z-index'
import type { MtImagePreviewProps } from './types'

defineOptions({
  name: 'MtImagePreview',
})

const props = withDefaults(defineProps<MtImagePreviewProps>(), {
  modelValue: false,
  images: () => [],
  startPosition: 0,
  showIndex: true,
  closeable: false,
  closeOnOverlay: true,
  zIndex: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: [index: number]
  change: [index: number]
}>()

const current = ref(props.startPosition)

// Auto-allocate a z-index when omitted, so previews stack in opening order.
// An explicit zIndex passes straight through untouched.
const allocatedZIndex = ref(0)

watch(
  () => props.modelValue,
  (visible) => {
    if (visible && props.zIndex === undefined) allocatedZIndex.value = nextZIndex()
  },
  { immediate: true },
)

const zIndex = computed(() => props.zIndex ?? allocatedZIndex.value)

// Reset to the start position every time the preview opens
watch(
  () => props.modelValue,
  (visible) => {
    if (visible) {
      current.value = props.startPosition
    }
  },
)

function handleSwipeChange(index: number) {
  current.value = index
  emit('change', index)
}

function close() {
  emit('update:modelValue', false)
  emit('close', current.value)
}

function handleOverlayClick() {
  if (props.closeOnOverlay) {
    close()
  }
}
</script>

<template>
  <div v-if="modelValue" class="mt-image-preview" :style="{ zIndex }" @click="handleOverlayClick">
    <MtSwipe
      class="mt-image-preview__swipe"
      :model-value="current"
      :loop="false"
      :show-indicators="false"
      @update:model-value="handleSwipeChange"
    >
      <div v-for="(image, index) in images" :key="index" class="mt-image-preview__slide">
        <img class="mt-image-preview__image" :src="image" :alt="`image-${index + 1}`">
      </div>
    </MtSwipe>
    <div v-if="showIndex && images.length" class="mt-image-preview__index">
      {{ current + 1 }} / {{ images.length }}
    </div>
    <span v-if="closeable" class="mt-image-preview__close" @click.stop="close">
      <MtIcon name="close" />
    </span>
  </div>
</template>

<style lang="scss">
.mt-image-preview {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.9);

  &__swipe {
    width: 100%;
  }

  &__slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__image {
    max-width: 100%;
    max-height: 100vh;
    object-fit: contain;
    user-select: none;
  }

  &__index {
    position: absolute;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    font-size: var(--mt-font-size-sm);
    color: #fff;
  }

  &__close {
    position: absolute;
    top: 16px;
    right: 16px;
    display: inline-flex;
    font-size: 18px;
    color: #fff;
    cursor: pointer;
  }
}
</style>
