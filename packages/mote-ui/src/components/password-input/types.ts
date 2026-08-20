export interface MtPasswordInputProps {
  /** Bound value (the string being entered) */
  modelValue?: string
  /** Hint text shown below the cells */
  info?: string
  /** Error hint text; overrides `info` while set */
  errorInfo?: string
  /** Number of cells */
  length?: number
  /** Gap between cells, as a number (px) or a CSS length string */
  gutter?: number | string
  /** Mask the entered value as dots */
  mask?: boolean
  /** Show the blinking cursor on the next empty cell */
  focused?: boolean
}