export interface MtOverlayProps {
  /** Whether the overlay is visible */
  modelValue?: boolean
  /**
   * Overlay z-index. Defaults to a globally auto-incrementing value so
   * standalone overlays stack in opening order without manual coordination.
   */
  zIndex?: number
  /** Fade transition duration in milliseconds */
  duration?: number
}