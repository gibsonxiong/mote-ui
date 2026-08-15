<script setup lang="ts">
import { computed } from 'vue'
import MtPopup from '../popup/popup.vue'
import { useLocale } from '../../locale'
import type { MtDialogProps } from './types'

defineOptions({
  name: 'MtDialog',
})

const props = withDefaults(defineProps<MtDialogProps>(), {
  modelValue: false,
  title: undefined,
  message: undefined,
  messageAlign: 'center',
  confirmButtonText: undefined,
  cancelButtonText: undefined,
  showCancelButton: true,
  closeOnClickOverlay: false,
  width: 280,
})

const { t } = useLocale()

const confirmLabel = computed(() => props.confirmButtonText ?? t('common.confirm'))
const cancelLabel = computed(() => props.cancelButtonText ?? t('common.cancel'))

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
  cancel: []
}>()

function close() {
  emit('update:modelValue', false)
}

function handleConfirm() {
  emit('confirm')
  close()
}

function handleCancel() {
  emit('cancel')
  close()
}
</script>

<template>
  <MtPopup
    :model-value="modelValue"
    position="center"
    :close-on-click-overlay="closeOnClickOverlay"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="mt-dialog" :style="{ width: typeof width === 'number' ? `${width}px` : width }">
      <div v-if="title || $slots.title" class="mt-dialog__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="message || $slots.default" class="mt-dialog__body" :class="`mt-dialog__body--${messageAlign}`">
        <slot>{{ message }}</slot>
      </div>
      <div class="mt-dialog__footer">
        <button
          v-if="showCancelButton"
          type="button"
          class="mt-dialog__button mt-dialog__cancel"
          @click="handleCancel"
        >
          {{ cancelLabel }}
        </button>
        <button type="button" class="mt-dialog__button mt-dialog__confirm" @click="handleConfirm">
          {{ confirmLabel }}
        </button>
      </div>
    </div>
  </MtPopup>
</template>

<style lang="scss">
.mt-dialog {
  border-radius: var(--mt-radius-xl);
  background-color: var(--mt-bg-color-overlay);
  overflow: hidden;

  &__title {
    padding: 24px 24px 0;
    color: var(--mt-text-color-primary);
    font-size: var(--mt-font-size-lg);
    font-weight: var(--mt-font-weight-medium);
    text-align: center;
    line-height: var(--mt-line-height-tight);
  }

  &__body {
    max-height: 50vh;
    padding: 16px 24px;
    overflow-y: auto;
    color: var(--mt-text-color-regular);
    font-size: var(--mt-font-size-md);
    line-height: var(--mt-line-height-normal);
    overflow-wrap: break-word;

    &--left {
      text-align: left;
    }

    &--center {
      text-align: center;
    }

    &--right {
      text-align: right;
    }
  }

  &__title + &__body {
    padding-top: var(--mt-spacing-sm);
  }

  &__footer {
    display: flex;
  }

  &__button {
    flex: 1;
    height: 48px;
    border: none;
    background-color: transparent;
    font-size: var(--mt-font-size-lg);
    cursor: pointer;
    user-select: none;

    &:active {
      background-color: var(--mt-fill-color-light);
    }
  }

  &__cancel {
    color: var(--mt-text-color-regular);
    border-right: 1px solid var(--mt-border-color-lighter);
  }

  &__confirm {
    color: var(--mt-color-primary);
    font-weight: var(--mt-font-weight-medium);
  }
}
</style>
