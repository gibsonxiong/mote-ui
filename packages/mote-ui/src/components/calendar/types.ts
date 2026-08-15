export type MtCalendarType = 'single' | 'range'

/** Bound value: a Date in single mode, a `[start, end]` tuple in range mode */
export type MtCalendarValue = Date | [Date, Date] | null

export interface MtCalendarProps {
  /** Bound value, updated on confirm */
  modelValue?: MtCalendarValue
  /** Selection mode */
  type?: MtCalendarType
  /** First selectable date */
  minDate?: Date
  /** Last selectable date */
  maxDate?: Date
  /** Title shown in the header */
  title?: string
  /** Text of the confirm button */
  confirmText?: string
  /** Hide the confirm button and emit on select directly */
  showConfirm?: boolean
  /** Display only, selection disabled */
  readonly?: boolean
}
