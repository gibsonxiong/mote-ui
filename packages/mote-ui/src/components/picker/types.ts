export type MtPickerValue = string | number

export interface MtPickerOption {
  text: string
  value: MtPickerValue
  /** Child options for cascade columns */
  children?: MtPickerOption[]
  disabled?: boolean
}

/**
 * Column input formats:
 * - flat:  [{ text, value }, ...] or ['a', 'b']
 * - cascade: options with `children`
 * - multiple columns: [columnA, columnB]
 */
export type MtPickerColumn = Array<MtPickerOption | MtPickerValue>
export type MtPickerColumns = MtPickerColumn | MtPickerColumn[]

export interface MtPickerProps {
  /** Column definitions (flat, cascade, or multi-column) */
  columns?: MtPickerColumns
  /** Selected value: single value for one column, array for multiple */
  modelValue?: MtPickerValue | MtPickerValue[]
  /** Title shown in the toolbar */
  title?: string
  /** Text of the confirm button (i18n refactor lands before v1.0) */
  confirmButtonText?: string
  /** Text of the cancel button */
  cancelButtonText?: string
  /** Height of one option row in px (375-design value, converted to vw) */
  optionHeight?: number
  /** Number of visible rows */
  visibleOptionNum?: number
}
