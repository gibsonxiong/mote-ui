<script setup lang="ts">
import type { MtNotifyProps } from './types'

defineOptions({
  name: 'MtNotifyComponent',
})

withDefaults(defineProps<MtNotifyProps>(), {
  modelValue: false,
  message: '',
  type: 'danger',
})
</script>

<template>
  <Transition name="mt-notify-slide" :duration="200">
    <div v-if="modelValue" class="mt-notify" :class="`mt-notify--${type}`">
      {{ message }}
    </div>
  </Transition>
</template>

<style lang="scss">
.mt-notify {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3000;
  padding: 10px 16px;
  padding-top: calc(10px + env(safe-area-inset-top));
  color: #fff;
  font-size: var(--mt-font-size-md);
  line-height: var(--mt-line-height-normal);
  text-align: center;
  overflow-wrap: break-word;

  &--primary {
    background-color: var(--mt-color-primary);
  }

  &--success {
    background-color: var(--mt-color-success);
  }

  &--warning {
    background-color: var(--mt-color-warning);
  }

  &--danger {
    background-color: var(--mt-color-danger);
  }
}

.mt-notify-slide-enter-active,
.mt-notify-slide-leave-active {
  transition: transform var(--mt-duration-fast) var(--mt-easing-standard);
}

.mt-notify-slide-enter-from,
.mt-notify-slide-leave-to {
  transform: translateY(-100%);
}
</style>
