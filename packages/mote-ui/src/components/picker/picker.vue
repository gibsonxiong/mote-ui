<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import MtPickerColumn from './picker-column.vue'
import { isCascadeColumns, resolveColumns } from './columns'
import { formItemKey } from '../form/types'
import { useLocale } from '../../locale'
import type { MtPickerOption, MtPickerProps, MtPickerValue } from './types'

defineOptions({
  name: 'MtPicker',
})

const props = withDefaults(defineProps<MtPickerProps>(), {
  columns: () => [],
  modelValue: undefined,
  title: undefined,
  confirmButtonText: undefined,
  cancelButtonText: undefined,
  optionHeight: 44,
  visibleOptionNum: 6,
})

const emit = defineEmits<{
  'update:modelValue': [value: MtPickerValue | MtPickerValue[]]
  confirm: [value: MtPickerValue | MtPickerValue[], options: MtPickerOption[]]
  cancel: []
  change: [columnIndex: number, index: number]
}>()

const formItem = inject(formItemKey, null)

const { t } = useLocale()

const confirmLabel = computed(() => props.confirmButtonText ?? t('common.confirm'))
const cancelLabel = computed(() => props.cancelButtonText ?? t('common.cancel'))

const indexes = ref<number[]>([])

const resolvedColumns = computed(() => resolveColumns(props.columns, indexes.value))

const frameStyle = computed(() => ({
  height: `${props.optionHeight * props.visibleOptionNum}px`,
}))

const barStyle = computed(() => ({
  top: `${(props.optionHeight * (props.visibleOptionNum - 1)) / 2}px`,
  height: `${props.optionHeight}px`,
}))

function indexesFromValues(): number[] {
  const columns = resolveColumns(props.columns, [])
  const values = Array.isArray(props.modelValue)
    ? props.modelValue
    : props.modelValue === undefined
      ? []
      : [props.modelValue]
  return columns.map((column, columnIndex) => {
    const found = column.findIndex((option) => option.value === values[columnIndex])
    return found > -1 ? found : 0
  })
}

indexes.value = indexesFromValues()

watch(
  () => props.columns,
  () => {
    indexes.value = indexesFromValues()
  },
)

watch(
  () => props.modelValue,
  () => {
    const next = indexesFromValues()
    if (next.join(',') !== indexes.value.join(',')) {
      indexes.value = next
    }
  },
)

function getSelectedOptions(): MtPickerOption[] {
  return resolvedColumns.value.map((column, columnIndex) => {
    const index = Math.min(indexes.value[columnIndex] ?? 0, column.length - 1)
    return column[Math.max(index, 0)]
  })
}

function getSelectedValues(): MtPickerValue | MtPickerValue[] {
  const values = getSelectedOptions().map((option) => option?.value)
  return resolvedColumns.value.length === 1 ? values[0] : values
}

function handleColumnChange(columnIndex: number, index: number) {
  const next = [...indexes.value]
  next[columnIndex] = index
  if (isCascadeColumns(props.columns)) {
    for (let downstream = columnIndex + 1; downstream < next.length; downstream++) {
      next[downstream] = 0
    }
  }
  indexes.value = next
  emit('change', columnIndex, index)
}

function handleConfirm() {
  const options = getSelectedOptions()
  const value = getSelectedValues()
  emit('update:modelValue', value)
  emit('confirm', value, options)
  formItem?.onFieldChange()
}

function handleCancel() {
  emit('cancel')
}

defineExpose({
  getSelectedOptions,
  getSelectedValues,
})
</script>

<template>
  <div class="mt-picker">
    <div class="mt-picker__toolbar">
      <button type="button" class="mt-picker__cancel" @click="handleCancel">
        <slot name="cancel">{{ cancelLabel }}</slot>
      </button>
      <div class="mt-picker__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <button type="button" class="mt-picker__confirm" @click="handleConfirm">
        <slot name="confirm">{{ confirmLabel }}</slot>
      </button>
    </div>
    <div class="mt-picker__frame" :style="frameStyle">
      <MtPickerColumn
        v-for="(column, columnIndex) in resolvedColumns"
        :key="columnIndex"
        :options="column"
        :index="indexes[columnIndex] ?? 0"
        :option-height="optionHeight"
        :visible-option-num="visibleOptionNum"
        @update:index="(index) => handleColumnChange(columnIndex, index)"
      />
      <div class="mt-picker__bar" :style="barStyle" />
    </div>
  </div>
</template>

<style lang="scss">
.mt-picker {
  background-color: var(--mt-bg-color-overlay);
  user-select: none;

  &__toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    padding: 0 var(--mt-spacing-lg);
    border-bottom: 1px solid var(--mt-border-color-lighter);
  }

  &__cancel,
  &__confirm {
    padding: var(--mt-spacing-sm) 0;
    border: none;
    background-color: transparent;
    font-size: var(--mt-font-size-md);
    cursor: pointer;
  }

  &__cancel {
    color: var(--mt-text-color-secondary);
  }

  &__confirm {
    color: var(--mt-color-primary);
  }

  &__title {
    flex: 1;
    text-align: center;
    color: var(--mt-text-color-primary);
    font-size: var(--mt-font-size-lg);
    font-weight: var(--mt-font-weight-medium);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__frame {
    position: relative;
    display: flex;
  }

  &__bar {
    position: absolute;
    left: 0;
    right: 0;
    pointer-events: none;
    border-top: 1px solid var(--mt-border-color-lighter);
    border-bottom: 1px solid var(--mt-border-color-lighter);
  }
}
</style>
