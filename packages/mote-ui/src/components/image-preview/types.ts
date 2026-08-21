export interface MtImagePreviewProps {
  /** Whether the preview overlay is shown */
  modelValue?: boolean
  /** Image URLs to preview */
  images?: string[]
  /** Index of the initially shown image */
  startPosition?: number
  /** Show the `1 / n` index indicator */
  showIndex?: boolean
  /** Show a close button at the top-right corner */
  closeable?: boolean
  /** Close when tapping the overlay */
  closeOnOverlay?: boolean
  /** Custom z-index; auto-allocated when omitted */
  zIndex?: number
}
