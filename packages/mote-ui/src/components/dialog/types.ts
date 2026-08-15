export interface MtDialogProps {
  /** Whether the dialog is visible */
  modelValue?: boolean
  title?: string
  message?: string
  /** Text alignment of the message */
  messageAlign?: 'left' | 'center' | 'right'
  confirmButtonText?: string
  cancelButtonText?: string
  showCancelButton?: boolean
  closeOnClickOverlay?: boolean
  /** Dialog width (375-design px, converted to vw) */
  width?: number | string
}

export interface MtDialogOptions {
  title?: string
  message?: string
  confirmButtonText?: string
  cancelButtonText?: string
  showCancelButton?: boolean
}
