import type { InjectionKey } from 'vue'

export type MtRuleValue = string | number | boolean | unknown[] | Record<string, unknown>

/** Custom validator: throw an Error or return a rejected Promise to fail */
export type MtValidator = (
  rule: MtFormItemRule,
  value: MtRuleValue | undefined,
) => boolean | void | Promise<void>

export interface MtFormItemRule {
  /** Fail when the value is empty */
  required?: boolean
  /** Error message (falls back to a default message when omitted) */
  message?: string
  /** Trigger events that run this rule */
  trigger?: 'change' | 'blur' | Array<'change' | 'blur'>
  /** RegExp the string value must match */
  pattern?: RegExp
  /** Expected value type */
  type?: 'string' | 'number' | 'boolean' | 'array' | 'email'
  /** Min length (string/array) or min value (number) */
  min?: number
  /** Max length (string/array) or max value (number) */
  max?: number
  validator?: MtValidator
}

export type MtFormRules = Record<string, MtFormItemRule | MtFormItemRule[]>

export interface MtFormProps {
  /** Form data object */
  model?: Record<string, unknown>
  /** Validation rules keyed by form-item prop */
  rules?: MtFormRules
  /** Show the required asterisk on required fields */
  hideRequiredAsterisk?: boolean
}

export interface MtFormItemProps {
  /** Key of the model field this item validates */
  prop?: string
  label?: string
  /** Item-level rules merged with form rules */
  rules?: MtFormItemRule | MtFormItemRule[]
  /** Force the required asterisk and empty-value check */
  required?: boolean
}

export interface MtFormItemContext {
  prop: string | undefined
  validate: (trigger?: string) => Promise<boolean>
  resetField: () => void
  clearValidate: () => void
  /** True while an async validation round is in flight */
  validating: boolean
  /** Called by child controls when their value changes */
  onFieldChange: () => void
  /** Called by child controls on blur */
  onFieldBlur: () => void
}

export interface MtFormContext {
  model: Record<string, unknown> | undefined
  rules: MtFormRules | undefined
  hideRequiredAsterisk: boolean
  addField: (field: MtFormItemContext) => void
  removeField: (field: MtFormItemContext) => void
}

export const formKey: InjectionKey<MtFormContext> = Symbol('MtForm')
export const formItemKey: InjectionKey<MtFormItemContext> = Symbol('MtFormItem')
