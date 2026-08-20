export interface MtNumberKeyboardProps {
  /** Bound value (the string being typed) */
  modelValue?: string
  /** Whether the keyboard is visible */
  show?: boolean
  /** Keyboard title */
  title?: string
  /** `default` shows the 0-9 keypad; `custom` renders the default slot instead */
  theme?: 'default' | 'custom'
  /** Maximum input length */
  maxlength?: number
  /**
   * Keyboard z-index. Defaults to a globally auto-incrementing value so the
   * keyboard always stacks above other floating layers.
   */
  zIndex?: number
  /** Text of the extra key in the bottom-left corner */
  extraKey?: string
  /** Text of the close button in the top-left corner */
  closeButtonText?: string
  /** Show the delete key */
  showDeleteKey?: boolean
  /** Hide the keyboard when tapping outside of it */
  hideOnClickOutside?: boolean
  /** Add bottom padding for devices with a home indicator */
  safeAreaInsetBottom?: boolean
  /** Teleport target */
  teleport?: string
}