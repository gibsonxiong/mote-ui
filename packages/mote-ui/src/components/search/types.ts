export interface MtSearchProps {
  /** Bound value */
  modelValue?: string
  placeholder?: string
  /** Shape of the search box */
  shape?: 'square' | 'round'
  /** Show the action button on the right */
  showAction?: boolean
  /** Text of the action button */
  actionText?: string
  disabled?: boolean
  readonly?: boolean
  /** Show a clear icon when the value is not empty */
  clearable?: boolean
  maxlength?: number | string
}
