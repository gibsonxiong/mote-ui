<script setup lang="ts">
import { computed } from 'vue'
import MtPicker from '../picker/picker.vue'
import { useLocale } from '../../locale'
import type { MtPickerOption, MtPickerValue } from '../picker/types'
import type { MtAreaEvent, MtAreaList, MtAreaProps } from './types'

defineOptions({
  name: 'MtArea',
})

const props = withDefaults(defineProps<MtAreaProps>(), {
  modelValue: undefined,
  areaList: () => ({ province_list: {}, city_list: {}, county_list: {} }),
  columnsNum: 3,
  title: undefined,
  confirmButtonText: undefined,
  cancelButtonText: undefined,
  optionHeight: 44,
  visibleOptionNum: 6,
})

const emit = defineEmits<{
  'update:modelValue': [code: string]
  confirm: [detail: MtAreaEvent]
  cancel: []
}>()

const { t } = useLocale()

interface AreaEntry {
  code: string
  text: string
}

function toEntries(map: Record<string, string>): AreaEntry[] {
  return Object.entries(map).map(([code, text]) => ({ code, text }))
}

/** Builds cascade picker columns from the three-map area data. */
function buildColumns(areaList: MtAreaList, columnsNum: number): MtPickerOption[] {
  const provinces = toEntries(areaList.province_list ?? {})
  const cities = toEntries(areaList.city_list ?? {})
  const counties = toEntries(areaList.county_list ?? {})

  return provinces.map((province) => {
    const provinceOption: MtPickerOption = { text: province.text, value: province.code }
    if (columnsNum >= 2) {
      provinceOption.children = cities
        .filter((city) => city.code.slice(0, 2) === province.code.slice(0, 2))
        .map((city) => {
          const cityOption: MtPickerOption = { text: city.text, value: city.code }
          if (columnsNum >= 3) {
            cityOption.children = counties
              .filter((county) => county.code.slice(0, 4) === city.code.slice(0, 4))
              .map((county) => ({ text: county.text, value: county.code }))
          }
          return cityOption
        })
    }
    return provinceOption
  })
}

const columns = computed(() => buildColumns(props.areaList, props.columnsNum))

/** Locates the value path for a region code inside the cascade tree. */
function findValuePath(options: MtPickerOption[], code: string, path: string[] = []): string[] | null {
  for (const option of options) {
    const next = [...path, String(option.value)]
    if (String(option.value) === code) return next
    if (option.children?.length) {
      const found = findValuePath(option.children, code, next)
      if (found) return found
    }
  }
  return null
}

const pickerValue = computed<MtPickerValue[]>(() =>
  props.modelValue ? findValuePath(columns.value, props.modelValue) ?? [] : [],
)

const pickerTitle = computed(() => props.title ?? t('area.title'))

const confirmLabel = computed(() => props.confirmButtonText ?? t('common.confirm'))
const cancelLabel = computed(() => props.cancelButtonText ?? t('common.cancel'))

function buildEvent(options: MtPickerOption[]): MtAreaEvent {
  const [province, city, county] = options
  const last = options[options.length - 1]
  return {
    code: String(last?.value ?? ''),
    province: province?.text ?? '',
    city: city?.text ?? '',
    county: county?.text ?? '',
  }
}

function onConfirm(_value: MtPickerValue | MtPickerValue[], options: MtPickerOption[]) {
  const detail = buildEvent(options)
  emit('update:modelValue', detail.code)
  emit('confirm', detail)
}

function onCancel() {
  emit('cancel')
}
</script>

<template>
  <MtPicker
    :columns="columns"
    :model-value="pickerValue"
    :title="pickerTitle"
    :confirm-button-text="confirmLabel"
    :cancel-button-text="cancelLabel"
    :option-height="optionHeight"
    :visible-option-num="visibleOptionNum"
    @confirm="onConfirm"
    @cancel="onCancel"
  />
</template>