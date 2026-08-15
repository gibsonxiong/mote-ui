<script setup lang="ts">
import { computed, type Component } from 'vue'
import {
  MtIconArrowLeft,
  MtIconArrowRight,
  MtIconArrowUp,
  MtIconArrowDown,
  MtIconClose,
  MtIconSuccess,
  MtIconLoading,
} from '@mote-ui/icons'
import type { MtIconName, MtIconProps } from './types'

defineOptions({
  name: 'MtIcon',
})

const props = withDefaults(defineProps<MtIconProps>(), {
  name: undefined,
  size: '1em',
  color: undefined,
  spin: false,
})

const iconRegistry: Record<MtIconName, Component> = {
  'arrow-left': MtIconArrowLeft,
  'arrow-right': MtIconArrowRight,
  'arrow-up': MtIconArrowUp,
  'arrow-down': MtIconArrowDown,
  close: MtIconClose,
  success: MtIconSuccess,
  loading: MtIconLoading,
}

const iconComponent = computed(() =>
  props.name ? iconRegistry[props.name as MtIconName] : undefined,
)
const spinning = computed(() => props.spin || props.name === 'loading')
</script>

<template>
  <component
    :is="iconComponent"
    v-if="iconComponent"
    :size="size"
    :color="color"
    :class="['mt-icon', { 'mt-icon--spin': spinning }]"
  />
  <span v-else :class="['mt-icon', { 'mt-icon--spin': spinning }]">
    <slot />
  </span>
</template>

<style lang="scss">
.mt-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;

  &--spin {
    animation: mt-icon-spin 0.8s linear infinite;
  }
}

@keyframes mt-icon-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
