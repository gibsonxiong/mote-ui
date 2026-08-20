<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { nextZIndex } from '../../utils/z-index'
import type { MtOverlayProps } from './types'

defineOptions({
  name: 'MtOverlay',
})

const props = withDefaults(defineProps<MtOverlayProps>(), {
  modelValue: false,
  zIndex: undefined,
  duration: 300,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// Auto-allocate a z-index when omitted, so standalone overlays stack in
// opening order. An explicit zIndex passes straight through untouched.
const allocatedZIndex = ref(0)

watch(
  () => props.modelValue,
  (visible) => {
    if (visible && props.zIndex === undefined) allocatedZIndex.value = nextZIndex()
  },
  { immediate: true },
)

const zIndex = computed(() => props.zIndex ?? allocatedZIndex.value)

function onClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<template>
  <Transition name="mt-overlay-fade" :duration="duration">
    <div v-if="modelValue" class="mt-overlay" :style="{ zIndex }" @click="onClick" />
  </Transition>
</template>

<style lang="scss">
.mt-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.mt-overlay-fade-enter-active,
.mt-overlay-fade-leave-active {
  transition: opacity var(--mt-duration-normal) var(--mt-easing-standard);
}

.mt-overlay-fade-enter-from,
.mt-overlay-fade-leave-to {
  opacity: 0;
}
</style>