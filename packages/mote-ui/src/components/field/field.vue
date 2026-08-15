<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { MtIconClose } from '@mote-ui/icons'
import { formItemKey } from '../form/types'
import type { MtFieldProps } from './types'

defineOptions({
  name: 'MtField',
})

const props = withDefaults(defineProps<MtFieldProps>(), {
  modelValue: '',
  label: undefined,
  type: 'text',
  placeholder: undefined,
  disabled: false,
  readonly: false,
  clearable: false,
  required: false,
  maxlength: undefined,
  showWordLimit: false,
  rows: 2,
  error: false,
  border: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  input: [value: string]
  change: [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: []
}>()

const focused = ref(false)

const formItem = inject(formItemKey, null)

const inputValue = computed(() => String(props.modelValue ?? ''))

const isTextarea = computed(() => props.type === 'textarea')

const nativeType = computed(() => (props.type === 'digit' ? 'tel' : props.type))

const inputMode = computed(() => (props.type === 'digit' ? 'numeric' : undefined))

const showClear = computed(
  () => props.clearable && focused.value && inputValue.value !== '' && !props.readonly && !props.disabled,
)

const classes = computed(() => [
  'mt-field',
  {
    'mt-field--error': props.error,
    'mt-field--border': props.border,
    'is-disabled': props.disabled,
  },
])

function filterValue(value: string) {
  return props.type === 'digit' ? value.replace(/\D/g, '') : value
}

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  const next = filterValue(target.value)
  if (next !== target.value) target.value = next
  emit('update:modelValue', next)
  emit('input', next)
  formItem?.onFieldChange()
}

function handleChange(event: Event) {
  emit('change', (event.target as HTMLInputElement).value)
}

function handleFocus(event: FocusEvent) {
  focused.value = true
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  focused.value = false
  emit('blur', event)
  formItem?.onFieldBlur()
}

function handleClear() {
  emit('update:modelValue', '')
  emit('clear')
  formItem?.onFieldChange()
}
</script>

<template>
  <div :class="classes">
    <label v-if="label || $slots.label" class="mt-field__label">
      <span v-if="required" class="mt-field__required">*</span>
      <slot name="label">{{ label }}</slot>
    </label>
    <div class="mt-field__body">
      <textarea
        v-if="isTextarea"
        class="mt-field__control mt-field__textarea"
        :value="inputValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength ? Number(maxlength) : undefined"
        :rows="Number(rows)"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <input
        v-else
        class="mt-field__control"
        :type="nativeType"
        :inputmode="inputMode"
        :value="inputValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength ? Number(maxlength) : undefined"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <MtIconClose v-if="showClear" class="mt-field__clear" @click.prevent="handleClear" />
      <span v-if="showWordLimit && maxlength" class="mt-field__word-limit">
        {{ inputValue.length }}/{{ maxlength }}
      </span>
      <slot name="right" />
    </div>
  </div>
</template>

<style lang="scss">
.mt-field {
  display: flex;
  align-items: flex-start;
  padding: 10px 16px;
  background-color: var(--mt-bg-color);
  font-size: var(--mt-font-size-md);

  &--border {
    border-bottom: 1px solid var(--mt-border-color-lighter);
  }

  &__label {
    flex: none;
    width: 88px;
    padding-top: 4px;
    padding-right: var(--mt-spacing-md);
    color: var(--mt-text-color-primary);
    line-height: var(--mt-line-height-tight);
    overflow-wrap: break-word;
  }

  &__required {
    margin-right: 2px;
    color: var(--mt-color-danger);
  }

  &__body {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    min-width: 0;
  }

  &__control {
    flex: 1;
    min-width: 0;
    padding: 4px 0;
    border: none;
    outline: none;
    background-color: transparent;
    color: var(--mt-text-color-primary);
    font-size: inherit;
    font-family: inherit;
    line-height: var(--mt-line-height-tight);
    appearance: none;

    &::placeholder {
      color: var(--mt-text-color-placeholder);
    }

    &:disabled {
      color: var(--mt-text-color-disabled);
      -webkit-text-fill-color: var(--mt-text-color-disabled);
      opacity: 1;
    }
  }

  &__textarea {
    resize: none;
  }

  &--error .mt-field__control {
    color: var(--mt-color-danger);

    &::placeholder {
      color: var(--mt-color-danger);
      opacity: 0.6;
    }
  }

  &__clear {
    flex: none;
    margin-left: var(--mt-spacing-sm);
    color: var(--mt-text-color-secondary);
    cursor: pointer;
  }

  &__word-limit {
    flex: none;
    margin-left: var(--mt-spacing-sm);
    color: var(--mt-text-color-secondary);
    font-size: var(--mt-font-size-sm);
  }

  &.is-disabled {
    cursor: not-allowed;
  }
}
</style>
