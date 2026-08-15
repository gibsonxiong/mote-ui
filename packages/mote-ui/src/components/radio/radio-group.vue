<script setup lang="ts">
import { provide, reactive, toRefs } from 'vue'
import { radioGroupKey } from './types'
import type { MtRadioGroupProps, MtRadioValue } from './types'

defineOptions({
  name: 'MtRadioGroup',
})

const props = withDefaults(defineProps<MtRadioGroupProps>(), {
  modelValue: undefined,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: MtRadioValue]
  change: [value: MtRadioValue]
}>()

function selectValue(value: MtRadioValue) {
  if (props.modelValue === value) return
  emit('update:modelValue', value)
  emit('change', value)
}

provide(
  radioGroupKey,
  reactive({
    ...toRefs(props),
    selectValue,
  }),
)
</script>

<template>
  <div class="mt-radio-group">
    <slot />
  </div>
</template>

<style lang="scss">
.mt-radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--mt-spacing-md) var(--mt-spacing-lg);
}
</style>
