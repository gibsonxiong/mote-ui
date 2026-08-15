<script setup lang="ts">
import { computed, onBeforeUnmount, watch } from 'vue'
import { lockScroll, unlockScroll } from '../../utils/lock-scroll'
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
  zIndex: 2000,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  open: []
  close: []
  opened: []
  closed: []
  clickOverlay: [event: MouseEvent]
}>()

watch(
  () => props.modelValue,
  (visible) => {
    if (visible) {
      lockScroll()
    } else {
      unlockScroll()
    }
  },
  { immediate: true },
)

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
    <Transition name="mt-overlay-fade" :duration="300">
      <div v-if="modelValue && overlay" class="mt-overlay" :style="{ zIndex }" @click="handleOverlayClick" />
    </Transition>
    <Transition
      :name="transitionName"
      :duration="300"
      @before-enter="emit('open')"
      @after-enter="emit('opened')"
      @before-leave="emit('close')"
      @after-leave="emit('closed')"
    >
      <div v-if="modelValue" :class="classes" :style="{ zIndex: zIndex + 1 }">
        <slot />
      </div>
    </Transition>
  </Teleport>
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
