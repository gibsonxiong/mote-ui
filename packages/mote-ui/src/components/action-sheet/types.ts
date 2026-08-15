export interface MtActionSheetAction {
  /** Button text */
  name: string
  /** Secondary description below the text */
  subname?: string
  /** Custom text color */
  color?: string
  disabled?: boolean
  loading?: boolean
}

export interface MtActionSheetProps {
  /** Whether the action sheet is visible */
  modelValue?: boolean
  /** Sheet actions */
  actions?: MtActionSheetAction[]
  title?: string
  /** Description under the title */
  description?: string
  /** Show a cancel button separated by a gap when set */
  cancelText?: string
  /** Close after an action is selected */
  closeOnClickAction?: boolean
  closeOnClickOverlay?: boolean
  round?: boolean
}
