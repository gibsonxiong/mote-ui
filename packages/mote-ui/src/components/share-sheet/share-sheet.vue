<script setup lang="ts">
import { computed } from 'vue'
import MtPopup from '../popup/popup.vue'
import MtIcon from '../icon/icon.vue'
import type { MtShareSheetOption, MtShareSheetProps } from './types'

defineOptions({
  name: 'MtShareSheet',
})

const props = withDefaults(defineProps<MtShareSheetProps>(), {
  modelValue: false,
  title: undefined,
  description: undefined,
  options: () => [],
  cancelText: undefined,
  closeOnClickOverlay: true,
  overlay: true,
  safeAreaInsetBottom: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  select: [option: MtShareSheetOption, index: number]
  cancel: []
}>()

// Normalizes the nested-row input into a uniform list of rows.
const rows = computed<MtShareSheetOption[][]>(() => {
  const options = props.options
  if (options.length === 0) return []
  return Array.isArray(options[0])
    ? (options as MtShareSheetOption[][])
    : [options as MtShareSheetOption[]]
})

// The emitted index is the flat position across all rows.
function flatIndex(rowIndex: number, colIndex: number): number {
  let index = 0
  for (let r = 0; r < rowIndex; r += 1) index += rows.value[r].length
  return index + colIndex
}

function close() {
  emit('update:modelValue', false)
}

function handleSelect(option: MtShareSheetOption, rowIndex: number, colIndex: number) {
  if (option.disabled) return
  emit('select', option, flatIndex(rowIndex, colIndex))
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
    position="bottom"
    :overlay="overlay"
    :close-on-click-overlay="closeOnClickOverlay"
    round
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="mt-share-sheet" :class="{ 'mt-share-sheet--safe-bottom': safeAreaInsetBottom }">
      <div v-if="title || description || $slots.description" class="mt-share-sheet__header">
        <div v-if="title" class="mt-share-sheet__title">{{ title }}</div>
        <div v-if="description || $slots.description" class="mt-share-sheet__description">
          <slot name="description">{{ description }}</slot>
        </div>
      </div>
      <div class="mt-share-sheet__rows">
        <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="mt-share-sheet__row">
          <button
            v-for="(option, colIndex) in row"
            :key="colIndex"
            type="button"
            class="mt-share-sheet__option"
            :class="{ 'is-disabled': option.disabled }"
            @click="handleSelect(option, rowIndex, colIndex)"
          >
            <span v-if="option.icon" class="mt-share-sheet__icon">
              <MtIcon :name="option.icon" size="24" />
            </span>
            <span class="mt-share-sheet__name">{{ option.name }}</span>
            <span
              v-if="option.description"
              class="mt-share-sheet__option-description"
              :style="option.color ? { color: option.color } : undefined"
            >
              {{ option.description }}
            </span>
          </button>
        </div>
      </div>
      <button v-if="cancelText" type="button" class="mt-share-sheet__cancel" @click="handleCancel">
        {{ cancelText }}
      </button>
    </div>
  </MtPopup>
</template>

<style lang="scss">
.mt-share-sheet {
  padding-bottom: var(--mt-spacing-md);

  &--safe-bottom {
    padding-bottom: calc(var(--mt-spacing-md) + env(safe-area-inset-bottom));
  }

  &__header {
    padding: 16px 16px 0;
    text-align: center;
  }

  &__title {
    color: var(--mt-text-color-primary);
    font-size: var(--mt-font-size-md);
    font-weight: var(--mt-font-weight-medium);
    line-height: var(--mt-line-height-tight);
  }

  &__description {
    margin-top: var(--mt-spacing-xs);
    color: var(--mt-text-color-secondary);
    font-size: var(--mt-font-size-sm);
    line-height: var(--mt-line-height-normal);
  }

  &__rows {
    padding: var(--mt-spacing-md) var(--mt-spacing-md) 0;
  }

  &__row {
    display: flex;
    flex-wrap: wrap;

    &:not(:first-child) {
      margin-top: var(--mt-spacing-lg);
    }
  }

  &__option {
    display: flex;
    flex-basis: 25%;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: var(--mt-spacing-sm) 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
    user-select: none;

    &.is-disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    margin-bottom: var(--mt-spacing-xs);
    border-radius: var(--mt-radius-md);
    background-color: var(--mt-fill-color-light);
    color: var(--mt-text-color-secondary);
  }

  &__name {
    color: var(--mt-text-color-primary);
    font-size: var(--mt-font-size-sm);
    line-height: var(--mt-line-height-tight);
  }

  &__option-description {
    margin-top: 2px;
    color: var(--mt-text-color-secondary);
    font-size: var(--mt-font-size-xs);
    line-height: var(--mt-line-height-tight);
  }

  &__cancel {
    display: block;
    width: calc(100% - 32px);
    height: 48px;
    margin: var(--mt-spacing-md) 16px 0;
    border: none;
    border-radius: var(--mt-radius-md);
    background-color: var(--mt-fill-color-light);
    color: var(--mt-text-color-primary);
    font-size: var(--mt-font-size-md);
    cursor: pointer;
    user-select: none;

    &:active {
      background-color: var(--mt-border-color-lighter);
    }
  }
}
</style>