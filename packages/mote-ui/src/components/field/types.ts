export interface MtFieldProps {
  /** Bound input value */
  modelValue?: string | number
  /** Left-side label text */
  label?: string
  /** Input element type; `digit` allows numbers only */
  type?: 'text' | 'textarea' | 'password' | 'number' | 'tel' | 'digit'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  /** Show a clear button when focused and non-empty */
  clearable?: boolean
  /** Required mark before the label */
  required?: boolean
  maxlength?: number | string
  /** Show the remaining word count (with maxlength) */
  showWordLimit?: boolean
  /** Rows for textarea */
  rows?: number | string
  /** Error style (usually driven by form validation) */
  error?: boolean
  /** Show the bottom hairline border */
  border?: boolean
}
