<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import MtIcon from '../icon/icon.vue'
import type { MtPopoverAction, MtPopoverProps } from './types'

defineOptions({
  name: 'MtPopover',
})

const props = withDefaults(defineProps<MtPopoverProps>(), {
  modelValue: false,
  placement: 'bottom',
  actions: () => [],
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  open: []
  close: []
  select: [action: MtPopoverAction, index: number]
}>()

const rootRef = ref<HTMLElement>()

function setVisible(value: boolean) {
  if (value === props.modelValue) {
    return
  }
  emit('update:modelValue', value)
  if (value) {
    emit('open')
  } else {
    emit('close')
  }
}

function handleTriggerClick() {
  setVisible(!props.modelValue)
}

// Clicks outside the popover close the floating panel
function handleDocumentClick(event: MouseEvent) {
  if (!rootRef.value || rootRef.value.contains(event.target as Node)) {
    return
  }
  setVisible(false)
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})

function handleSelect(action: MtPopoverAction, index: number) {
  if (action.disabled) {
    return
  }
  emit('select', action, index)
  setVisible(false)
}
</script>

<template>
  <div ref="rootRef" class="mt-popover">
    <div class="mt-popover__reference" @click="handleTriggerClick">
      <slot name="reference" />
    </div>
    <div v-show="modelValue" class="mt-popover__panel" :class="`mt-popover__panel--${placement}`">
      <slot>
        <div
          v-for="(action, index) in actions"
          :key="index"
          class="mt-popover__action"
          :class="{ 'mt-popover__action--disabled': action.disabled }"
          @click="handleSelect(action, index)"
        >
          <MtIcon v-if="action.icon" class="mt-popover__action-icon" :name="action.icon" />
          <span>{{ action.text }}</span>
        </div>
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
.mt-popover {
  position: relative;
  display: inline-block;

  &__reference {
    display: inline-flex;
  }

  &__panel {
    position: absolute;
    z-index: 10;
    min-width: 120px;
    padding: 4px 0;
    background: var(--mt-bg-color);
    border-radius: var(--mt-radius-base);
    box-shadow: 0 2px 12px rgb(50 50 51 / 12%);
  }

  &__panel--bottom {
    top: 100%;
    left: 50%;
    margin-top: 8px;
    transform: translateX(-50%);
  }

  &__panel--top {
    bottom: 100%;
    left: 50%;
    margin-bottom: 8px;
    transform: translateX(-50%);
  }

  &__panel--left {
    top: 50%;
    right: 100%;
    margin-right: 8px;
    transform: translateY(-50%);
  }

  &__panel--right {
    top: 50%;
    left: 100%;
    margin-left: 8px;
    transform: translateY(-50%);
  }

  &__action {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    font-size: var(--mt-font-size-sm);
    color: var(--mt-text-color-primary);
    white-space: nowrap;
    cursor: pointer;

    &:active {
      background: var(--mt-bg-color-page);
    }

    &--disabled {
      color: var(--mt-text-color-disabled);
      cursor: not-allowed;

      &:active {
        background: none;
      }
    }
  }

  &__action-icon {
    margin-right: 6px;
  }
}
</style>
