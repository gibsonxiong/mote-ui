import type { InjectionKey } from 'vue'

export type MtRadioValue = string | number | boolean

export interface MtRadioProps {
  /** Identifier value of this radio option (required inside a group) */
  value: MtRadioValue
  disabled?: boolean
}

export interface MtRadioGroupProps {
  /** Bound selected value */
  modelValue?: MtRadioValue
  disabled?: boolean
}

export interface MtRadioGroupContext {
  modelValue: MtRadioValue | undefined
  disabled: boolean
  selectValue: (value: MtRadioValue) => void
}

export const radioGroupKey: InjectionKey<MtRadioGroupContext> = Symbol('MtRadioGroup')
