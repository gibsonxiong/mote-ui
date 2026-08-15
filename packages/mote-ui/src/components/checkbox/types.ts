import type { InjectionKey } from 'vue'

export type MtCheckboxValue = string | number | boolean

export interface MtCheckboxProps {
  /** Standalone usage: bound checked state. In a group this is managed by the group */
  modelValue?: boolean
  /** Identifier value used inside a checkbox group */
  value?: MtCheckboxValue
  disabled?: boolean
  /** Indeterminate state (visual only, controls group children styling) */
  indeterminate?: boolean
}

export interface MtCheckboxGroupProps {
  /** Bound array of checked values */
  modelValue?: MtCheckboxValue[]
  disabled?: boolean
}

export interface MtCheckboxGroupContext {
  modelValue: MtCheckboxValue[]
  disabled: boolean
  toggleValue: (value: MtCheckboxValue) => void
}

export const checkboxGroupKey: InjectionKey<MtCheckboxGroupContext> = Symbol('MtCheckboxGroup')
