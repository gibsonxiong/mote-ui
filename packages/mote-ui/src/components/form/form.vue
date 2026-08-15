<script setup lang="ts">
import { provide, reactive, toRefs } from 'vue'
import { formKey } from './types'
import { useLocale } from '../../locale'
import type { MtFormContext, MtFormItemContext, MtFormProps } from './types'

defineOptions({
  name: 'MtForm',
})

const props = withDefaults(defineProps<MtFormProps>(), {
  model: undefined,
  rules: undefined,
  hideRequiredAsterisk: false,
})

const { t } = useLocale()

const fields: MtFormItemContext[] = []

function addField(field: MtFormItemContext) {
  if (!fields.includes(field)) fields.push(field)
}

function removeField(field: MtFormItemContext) {
  const index = fields.indexOf(field)
  if (index > -1) fields.splice(index, 1)
}

/** Validates all fields. Resolves true or rejects with { prop: message } map */
async function validate(): Promise<boolean> {
  const errors: Record<string, string> = {}
  await Promise.all(
    fields.map(async (field) => {
      try {
        await field.validate()
      } catch (error) {
        if (field.prop) {
          errors[field.prop] = error instanceof Error ? error.message : t('form.validateFailed')
        }
      }
    }),
  )
  if (Object.keys(errors).length > 0) {
    throw errors
  }
  return true
}

/** Validates a single field by prop */
async function validateField(prop: string): Promise<boolean> {
  const field = fields.find((item) => item.prop === prop)
  if (!field) return true
  return field.validate()
}

/** Resets all fields to their initial values and clears validation state */
function resetFields() {
  fields.forEach((field) => field.resetField())
}

/** Clears all validation error messages */
function clearValidate() {
  fields.forEach((field) => field.clearValidate())
}

provide(
  formKey,
  reactive({
    ...toRefs(props),
    addField,
    removeField,
  }) as unknown as MtFormContext,
)

defineExpose({
  validate,
  validateField,
  resetFields,
  clearValidate,
})
</script>

<template>
  <form class="mt-form" @submit.prevent>
    <slot />
  </form>
</template>

<style lang="scss">
.mt-form {
  background-color: var(--mt-bg-color);
}
</style>
