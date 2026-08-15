<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, provide, ref } from 'vue'
import { formKey, formItemKey } from './types'
import { validateRules } from './validator'
import { getByPath, setByPath } from '../../utils/path'
import { useLocale } from '../../locale'
import type { MtFormItemContext, MtFormItemProps, MtFormItemRule, MtRuleValue } from './types'

defineOptions({
  name: 'MtFormItem',
})

const props = withDefaults(defineProps<MtFormItemProps>(), {
  prop: undefined,
  label: undefined,
  rules: undefined,
  required: false,
})

const form = inject(formKey, null)

const { t } = useLocale()

const errorMessage = ref('')
const validating = ref(false)
// Monotonic token so a slow async round cannot overwrite a newer one.
let validationSeq = 0
let initialValue: unknown

const fieldValue = computed<MtRuleValue | undefined>(() => {
  if (!props.prop) return undefined
  return getByPath(form?.model, props.prop) as MtRuleValue
})

const mergedRules = computed<MtFormItemRule[]>(() => {
  const rules: MtFormItemRule[] = []
  if (props.rules) {
    rules.push(...(Array.isArray(props.rules) ? props.rules : [props.rules]))
  }
  if (props.prop && form?.rules?.[props.prop]) {
    const formRules = form.rules[props.prop]
    rules.push(...(Array.isArray(formRules) ? formRules : [formRules]))
  }
  if (props.required && !rules.some((rule) => rule.required)) {
    rules.unshift({ required: true })
  }
  return rules
})

const isRequired = computed(
  () => props.required || mergedRules.value.some((rule) => rule.required),
)

const showAsterisk = computed(
  () => isRequired.value && !(form?.hideRequiredAsterisk ?? false),
)

async function validate(trigger?: string): Promise<boolean> {
  if (!props.prop || mergedRules.value.length === 0) return true
  const seq = ++validationSeq
  validating.value = true
  try {
    await validateRules(mergedRules.value, fieldValue.value, trigger)
    if (seq === validationSeq) errorMessage.value = ''
    return true
  } catch (error) {
    if (seq === validationSeq) {
      errorMessage.value = error instanceof Error ? error.message : t('form.validateFailed')
    }
    throw error
  } finally {
    if (seq === validationSeq) validating.value = false
  }
}

function resetField() {
  if (!props.prop || !form?.model) return
  clearValidate()
  setByPath(form.model, props.prop, initialValue)
}

function clearValidate() {
  errorMessage.value = ''
}

const context: MtFormItemContext = {
  prop: props.prop,
  validate,
  resetField,
  clearValidate,
  get validating() {
    return validating.value
  },
  onFieldChange: () => {
    validate('change').catch(() => undefined)
  },
  onFieldBlur: () => {
    validate('blur').catch(() => undefined)
  },
}

provide(formItemKey, context)

onMounted(() => {
  if (props.prop) {
    initialValue = JSON.parse(JSON.stringify(fieldValue.value ?? null))
    form?.addField(context)
  }
})

onBeforeUnmount(() => {
  form?.removeField(context)
})
</script>

<template>
  <div
    class="mt-form-item"
    :class="{ 'is-error': !!errorMessage, 'is-validating': validating }"
  >
    <label v-if="label || $slots.label" class="mt-form-item__label">
      <span v-if="showAsterisk" class="mt-form-item__asterisk">*</span>
      <slot name="label">{{ label }}</slot>
    </label>
    <div class="mt-form-item__content">
      <slot />
      <div v-if="errorMessage" class="mt-form-item__error">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.mt-form-item {
  &__label {
    display: block;
    padding: 12px 16px 0;
    color: var(--mt-text-color-primary);
    font-size: var(--mt-font-size-md);
    line-height: var(--mt-line-height-tight);
  }

  &__asterisk {
    margin-right: 2px;
    color: var(--mt-color-danger);
  }

  &__content {
    position: relative;
  }

  &__error {
    padding: 4px 16px 8px;
    color: var(--mt-color-danger);
    font-size: var(--mt-font-size-sm);
    line-height: var(--mt-line-height-tight);
  }
}
</style>
