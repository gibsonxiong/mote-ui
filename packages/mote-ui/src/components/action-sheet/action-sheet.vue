<script setup lang="ts">
import MtPopup from '../popup/popup.vue'
import { MtIconLoading } from '@mote-ui/icons'
import type { MtActionSheetAction, MtActionSheetProps } from './types'

defineOptions({
  name: 'MtActionSheet',
})

const props = withDefaults(defineProps<MtActionSheetProps>(), {
  modelValue: false,
  actions: () => [],
  title: undefined,
  description: undefined,
  cancelText: undefined,
  closeOnClickAction: true,
  closeOnClickOverlay: true,
  round: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  select: [action: MtActionSheetAction, index: number]
  cancel: []
}>()

function close() {
  emit('update:modelValue', false)
}

function handleSelect(action: MtActionSheetAction, index: number) {
  if (action.disabled || action.loading) return
  emit('select', action, index)
  if (props.closeOnClickAction) close()
}

function handleCancel() {
  emit('cancel')
  close()
}
</script>

<template>
  <MtPopup
    :model-value="modelValue"
    position="bottom"
    :round="round"
    :close-on-click-overlay="closeOnClickOverlay"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="mt-action-sheet">
      <div v-if="title || description" class="mt-action-sheet__header">
        <div v-if="title" class="mt-action-sheet__title">{{ title }}</div>
        <div v-if="description" class="mt-action-sheet__description">{{ description }}</div>
      </div>
      <div class="mt-action-sheet__actions">
        <button
          v-for="(action, index) in actions"
          :key="index"
          type="button"
          class="mt-action-sheet__action"
          :class="{ 'is-disabled': action.disabled, 'is-loading': action.loading }"
          :style="action.color ? { color: action.color } : undefined"
          @click="handleSelect(action, index)"
        >
          <MtIconLoading v-if="action.loading" size="20" class="mt-action-sheet__loading" />
          <template v-else>
            <span class="mt-action-sheet__name">{{ action.name }}</span>
            <span v-if="action.subname" class="mt-action-sheet__subname">{{ action.subname }}</span>
          </template>
        </button>
      </div>
      <button
        v-if="cancelText"
        type="button"
        class="mt-action-sheet__cancel"
        @click="handleCancel"
      >
        {{ cancelText }}
      </button>
    </div>
  </MtPopup>
</template>

<style lang="scss">
.mt-action-sheet {
  &__header {
    padding: 16px;
    text-align: center;
  }

  &__title {
    color: var(--mt-text-color-primary);
    font-size: var(--mt-font-size-lg);
    font-weight: var(--mt-font-weight-medium);
    line-height: var(--mt-line-height-tight);
  }

  &__description {
    margin-top: var(--mt-spacing-xs);
    color: var(--mt-text-color-secondary);
    font-size: var(--mt-font-size-sm);
    line-height: var(--mt-line-height-normal);
  }

  &__actions {
    overflow: hidden;
    border-radius: inherit;
  }

  &__action {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 52px;
    padding: 12px 16px;
    border: none;
    background-color: transparent;
    color: var(--mt-text-color-primary);
    font-size: var(--mt-font-size-lg);
    cursor: pointer;
    user-select: none;

    &:not(:first-child) {
      border-top: 1px solid var(--mt-border-color-lighter);
    }

    &:active {
      background-color: var(--mt-fill-color-light);
    }

    &.is-disabled {
      color: var(--mt-text-color-placeholder);
      cursor: not-allowed;

      &:active {
        background-color: transparent;
      }
    }

    &.is-loading {
      cursor: default;

      &:active {
        background-color: transparent;
      }
    }
  }

  &__loading {
    animation: mt-action-sheet-rotate 0.8s linear infinite;
  }

  &__subname {
    margin-top: var(--mt-spacing-xs);
    color: var(--mt-text-color-secondary);
    font-size: var(--mt-font-size-sm);
    line-height: var(--mt-line-height-normal);
  }

  &__cancel {
    display: block;
    width: 100%;
    height: 52px;
    margin-top: var(--mt-spacing-sm);
    border: none;
    background-color: var(--mt-fill-color-light);
    color: var(--mt-text-color-primary);
    font-size: var(--mt-font-size-lg);
    cursor: pointer;
    user-select: none;

    &:active {
      background-color: var(--mt-border-color-lighter);
    }
  }
}

@keyframes mt-action-sheet-rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
