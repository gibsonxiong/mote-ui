export type MtDatetimePickerType = 'date' | 'time' | 'datetime' | 'year-month'

export type MtDatetimePickerColumnType = 'year' | 'month' | 'day' | 'hour' | 'minute'

export interface MtDatetimePickerProps {
  /** Bound value: a Date for date types, an `'HH:mm'` string for time type */
  modelValue?: Date | string
  /** Picker mode */
  type?: MtDatetimePickerType
  /** Minimum selectable date (date types) */
  minDate?: Date
  /** Maximum selectable date (date types) */
  maxDate?: Date
  /** Minimum hour (time / datetime) */
  minHour?: number
  /** Maximum hour (time / datetime) */
  maxHour?: number
  /** Minimum minute (time / datetime) */
  minMinute?: number
  /** Maximum minute (time / datetime) */
  maxMinute?: number
  /** Title shown in the toolbar */
  title?: string
  confirmButtonText?: string
  cancelButtonText?: string
  /** Filters candidate values of a column */
  filter?: (type: MtDatetimePickerColumnType, values: number[]) => number[]
  /** Formats the display text of a value */
  formatter?: (type: MtDatetimePickerColumnType, value: number) => string
}
