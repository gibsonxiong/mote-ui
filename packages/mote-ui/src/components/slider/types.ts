export interface MtSliderProps {
  /** Bound value */
  modelValue?: number
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step size */
  step?: number
  disabled?: boolean
  /** Show a value bubble while dragging */
  showTooltip?: boolean
}
