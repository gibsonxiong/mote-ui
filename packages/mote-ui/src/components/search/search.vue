<script setup lang="ts">
import { computed, inject } from 'vue'
import { MtIconSearch, MtIconClose } from '@mote-ui/icons'
import { useLocale } from '../../locale'
import { formItemKey } from '../form/types'
import type { MtSearchProps } from './types'

defineOptions({
  name: 'MtSearch',
})

const props = withDefaults(defineProps<MtSearchProps>(), {
  modelValue: '',
  placeholder: undefined,
  shape: 'square',
  showAction: false,
  actionText: undefined,
  disabled: false,
  readonly: false,
  clearable: true,
  maxlength: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
  search: [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: []
  cancel: []
}>()

const { t } = useLocale()

const formItem = inject(formItemKey, null)

const showClear = computed(
  () => props.clearable && props.modelValue !== '' && !props.readonly && !props.disabled,
)

const classes = computed(() => [
  'mt-search',
  `mt-search--${props.shape}`,
  { 'is-disabled': props.disabled },
])

function handleInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
  formItem?.onFieldChange()
}

function handleChange(event: Event) {
  emit('change', (event.target as HTMLInputElement).value)
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    event.preventDefault()
    emit('search', props.modelValue)
  }
}

function handleBlur(event: FocusEvent) {
  emit('blur', event)
  formItem?.onFieldBlur()
}

function handleClear() {
  emit('update:modelValue', '')
  emit('clear')
  formItem?.onFieldChange()
}

function handleCancel() {
  emit('cancel')
}
</script>

<template>
  <div :class="classes">
    <div class="mt-search__content">
      <MtIconSearch class="mt-search__icon" />
      <input
        class="mt-search__input"
        type="search"
        :value="modelValue"
        :placeholder="placeholder ?? t('search.placeholder')"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength ? Number(maxlength) : undefined"
        @input="handleInput"
        @change="handleChange"
        @keydown="handleKeydown"
        @focus="emit('focus', $event)"
        @blur="handleBlur"
      >
      <MtIconClose v-if="showClear" class="mt-search__clear" @click="handleClear" />
    </div>
    <div v-if="showAction || $slots.action" class="mt-search__action" @click="handleCancel">
      <slot name="action">{{ actionText || t('common.cancel') }}</slot>
    </div>
  </div>
</template>

<style lang="scss">
.mt-search {
  display: flex;
  align-items: center;
  padding: var(--mt-spacing-sm) var(--mt-spacing-lg);
  background-color: var(--mt-bg-color);

  &__content {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    padding: 0 var(--mt-spacing-md);
    height: 36px;
    border-radius: var(--mt-radius-base);
    background-color: var(--mt-bg-color-page);
  }

  &--round &__content {
    border-radius: var(--mt-radius-pill);
  }

  &__icon {
    flex-shrink: 0;
    font-size: var(--mt-font-size-lg);
    color: var(--mt-text-color-secondary);
  }

  &__input {
    flex: 1;
    min-width: 0;
    height: 100%;
    margin: 0 var(--mt-spacing-sm);
    padding: 0;
    border: none;
    background: transparent;
    color: var(--mt-text-color-primary);
    font-size: var(--mt-font-size-md);
    outline: none;

    &::placeholder {
      color: var(--mt-text-color-placeholder);
    }

    // Hide the native clear button of type="search"
    &::-webkit-search-cancel-button {
      display: none;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  &__clear {
    flex-shrink: 0;
    font-size: var(--mt-font-size-lg);
    color: var(--mt-text-color-placeholder);
    cursor: pointer;
  }

  &__action {
    flex-shrink: 0;
    margin-left: var(--mt-spacing-md);
    color: var(--mt-color-primary);
    font-size: var(--mt-font-size-md);
    cursor: pointer;
  }

  &.is-disabled &__input {
    color: var(--mt-text-color-disabled);
  }
}
</style>
