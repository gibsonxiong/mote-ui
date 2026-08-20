<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { lockScroll, unlockScroll } from '../../utils/lock-scroll'
import { nextZIndex } from '../../utils/z-index'
import Overlay from '../overlay/overlay.vue'
import type { MtPopupProps } from './types'

defineOptions({
  name: 'MtPopup',
})

const props = withDefaults(defineProps<MtPopupProps>(), {
  modelValue: false,
  position: 'center',
  overlay: true,
  closeOnClickOverlay: true,
  round: false,
  teleport: 'body',
  zIndex: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  open: []
  close: []
  opened: []
  closed: []
  clickOverlay: [event: MouseEvent]
}>()

// Auto-allocated when no explicit zIndex is given, so overlapping popups
// stack in opening order without manual coordination.
const allocatedZIndex = ref(0)

watch(
  () => props.modelValue,
  (visible) => {
    if (visible) {
      if (props.zIndex === undefined) allocatedZIndex.value = nextZIndex()
      lockScroll()
    } else {
      unlockScroll()
    }
  },
  { immediate: true },
)

const baseZIndex = computed(() => props.zIndex ?? allocatedZIndex.value)

onBeforeUnmount(() => {
  if (props.modelValue) unlockScroll()
})

const transitionName = computed(() =>
  props.position === 'center' ? 'mt-popup-fade' : `mt-popup-slide-${props.position}`,
)

const classes = computed(() => [
  'mt-popup',
  `mt-popup--${props.position}`,
  { 'mt-popup--round': props.round },
])

function handleOverlayClick(event: MouseEvent) {
  emit('clickOverlay', event)
  if (props.closeOnClickOverlay) {
    emit('update:modelValue', false)
  }
}
</script>

<template>
  <Teleport :to="teleport">
    <Overlay :model-value="modelValue && overlay" :z-index="baseZIndex" @click="handleOverlayClick" />
    <Transition
      :name="transitionName"
      :duration="300"
      @before-enter="emit('open')"
      @after-enter="emit('opened')"
      @before-leave="emit('close')"
      @after-leave="emit('closed')"
    >
      <div v-if="modelValue" :class="classes" :style="{ zIndex: baseZIndex + 1 }">
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
.mt-popup {
  position: fixed;
  max-width: 100vw;
  max-height: 100vh;
  overflow-y: auto;
  background-color: var(--mt-bg-color-overlay);
  -webkit-overflow-scrolling: touch;

  &--center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &--top {
    top: 0;
    left: 0;
    right: 0;
  }

  &--bottom {
    bottom: 0;
    left: 0;
    right: 0;
  }

  &--left {
    top: 0;
    bottom: 0;
    left: 0;
  }

  &--right {
    top: 0;
    bottom: 0;
    right: 0;
  }

  &--round {
    &.mt-popup--center {
      border-radius: var(--mt-radius-xl);
    }

    &.mt-popup--top {
      border-radius: 0 0 var(--mt-radius-xl) var(--mt-radius-xl);
    }

    &.mt-popup--bottom {
      border-radius: var(--mt-radius-xl) var(--mt-radius-xl) 0 0;
    }

    &.mt-popup--left {
      border-radius: 0 var(--mt-radius-xl) var(--mt-radius-xl) 0;
    }

    &.mt-popup--right {
      border-radius: var(--mt-radius-xl) 0 0 var(--mt-radius-xl);
    }
  }
}

// ---- Center: fade ----
.mt-popup-fade-enter-active,
.mt-popup-fade-leave-active {
  transition: opacity var(--mt-duration-normal) var(--mt-easing-standard);
}

.mt-popup-fade-enter-from,
.mt-popup-fade-leave-to {
  opacity: 0;
}

// ---- Directional: slide ----
@mixin popup-slide($selector, $transform) {
  #{$selector}-enter-active,
  #{$selector}-leave-active {
    transition: transform var(--mt-duration-normal) var(--mt-easing-standard);
  }

  #{$selector}-enter-from,
  #{$selector}-leave-to {
    transform: $transform;
  }
}

@include popup-slide('.mt-popup-slide-top', translateY(-100%));
@include popup-slide('.mt-popup-slide-bottom', translateY(100%));
@include popup-slide('.mt-popup-slide-left', translateX(-100%));
@include popup-slide('.mt-popup-slide-right', translateX(100%));
</style>
