export interface MtShareSheetOption {
  /** Display name */
  name: string
  /** Built-in icon name rendered via MtIcon */
  icon?: string
  /** Secondary text below the name */
  description?: string
  /** Custom color for the description text */
  color?: string
  disabled?: boolean
}

export interface MtShareSheetProps {
  /** Whether the share sheet is visible */
  modelValue?: boolean
  title?: string
  /** Description under the title */
  description?: string
  /** Share options; nested arrays render as multiple rows */
  options?: MtShareSheetOption[] | MtShareSheetOption[][]
  /** Cancel button text; hidden when undefined */
  cancelText?: string
  closeOnClickOverlay?: boolean
  /** Show the dark overlay */
  overlay?: boolean
  /** Inset safe area at the bottom */
  safeAreaInsetBottom?: boolean
}