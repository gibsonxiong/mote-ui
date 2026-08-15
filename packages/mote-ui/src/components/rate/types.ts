export interface MtRateProps {
  /** Bound value */
  modelValue?: number
  /** Maximum score (star count) */
  max?: number
  /** Allow selecting half stars */
  allowHalf?: boolean
  disabled?: boolean
  /** Read only, interaction disabled */
  readonly?: boolean
  /** Rate size */
  size?: 'small' | 'normal' | 'large'
}
