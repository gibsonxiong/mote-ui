<script setup lang="ts">
import { MtIconSuccess, MtIconClose, MtIconLoading } from '@mote-ui/icons'
import type { MtToastPosition, MtToastType } from './types'

defineOptions({
  name: 'MtToast',
})

withDefaults(
  defineProps<{
    visible: boolean
    message: string
    type: MtToastType
    position: MtToastPosition
    overlay: boolean
    zIndex: number
  }>(),
  {
    visible: false,
    message: '',
    type: 'text',
    position: 'middle',
    overlay: false,
    zIndex: 3000,
  },
)
</script>

<template>
  <Transition name="mt-toast-fade" :duration="200">
    <div v-if="visible" class="mt-toast-wrap" :style="{ zIndex }">
      <div v-if="overlay" class="mt-toast__overlay" />
      <div
        class="mt-toast"
        :class="[`mt-toast--${position}`, { 'mt-toast--with-icon': type !== 'text' }]"
      >
        <MtIconSuccess v-if="type === 'success'" size="32" class="mt-toast__icon" />
        <MtIconClose v-else-if="type === 'fail'" size="32" class="mt-toast__icon" />
        <MtIconLoading v-else-if="type === 'loading'" size="32" class="mt-toast__icon mt-toast__icon--spin" />
        <div class="mt-toast__message">{{ message }}</div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
.mt-toast-wrap {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.mt-toast__overlay {
  position: absolute;
  inset: 0;
  pointer-events: auto;
}

.mt-toast {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 70vw;
  padding: 10px 16px;
  border-radius: var(--mt-radius-lg);
  background-color: rgba(0, 0, 0, 0.72);
  color: #fff;
  font-size: var(--mt-font-size-md);
  text-align: center;
  overflow-wrap: break-word;

  &--top {
    top: 20%;
  }

  &--bottom {
    top: auto;
    bottom: 15%;
    transform: translateX(-50%);
  }

  &--with-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 100px;
    padding: 16px;
  }

  &__icon {
    margin-bottom: var(--mt-spacing-sm);
  }

  &__icon--spin {
    animation: mt-toast-rotate 0.8s linear infinite;
  }

  &--with-icon .mt-toast__message:empty {
    display: none;
  }
}

.mt-toast-fade-enter-active,
.mt-toast-fade-leave-active {
  transition: opacity var(--mt-duration-fast) var(--mt-easing-standard);
}

.mt-toast-fade-enter-from,
.mt-toast-fade-leave-to {
  opacity: 0;
}

@keyframes mt-toast-rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
