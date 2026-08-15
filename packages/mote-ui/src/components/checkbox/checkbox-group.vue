<script setup lang="ts">
import { provide, reactive, toRefs } from 'vue'
import { checkboxGroupKey } from './types'
import type { MtCheckboxGroupProps, MtCheckboxValue } from './types'

defineOptions({
  name: 'MtCheckboxGroup',
})

const props = withDefaults(defineProps<MtCheckboxGroupProps>(), {
  modelValue: () => [],
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: MtCheckboxValue[]]
  change: [value: MtCheckboxValue[]]
}>()

function toggleValue(value: MtCheckboxValue) {
  const next = props.modelValue.includes(value)
    ? props.modelValue.filter((item) => item !== value)
    : [...props.modelValue, value]
  emit('update:modelValue', next)
  emit('change', next)
}

provide(
  checkboxGroupKey,
  reactive({
    ...toRefs(props),
    toggleValue,
  }),
)
</script>

<template>
  <div class="mt-checkbox-group">
    <slot />
  </div>
</template>

<style lang="scss">
.mt-checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--mt-spacing-md) var(--mt-spacing-lg);
}
</style>
