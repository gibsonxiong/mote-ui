export interface MtStepperProps {
  /** Bound value */
  modelValue?: number
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step size */
  step?: number
  /** Number of decimal places */
  precision?: number
  disabled?: boolean
  /** Disable the middle input while keeping the buttons usable */
  disableInput?: boolean
  /** Stepper size */
  size?: 'small' | 'normal' | 'large'
}
