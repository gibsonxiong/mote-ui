export type MtSwitchValue = boolean | string | number

export interface MtSwitchProps {
  /** Bound value; supports boolean or custom active/inactive values */
  modelValue?: MtSwitchValue
  /** Value when switched on */
  activeValue?: MtSwitchValue
  /** Value when switched off */
  inactiveValue?: MtSwitchValue
  disabled?: boolean
  loading?: boolean
  /** Switch size */
  size?: 'small' | 'normal' | 'large'
}
