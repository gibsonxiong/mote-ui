export interface MtPopupProps {
  /** Whether the popup is visible */
  modelValue?: boolean
  /** Where the popup slides in from */
  position?: 'center' | 'bottom' | 'top' | 'left' | 'right'
  /** Show the dark overlay behind the popup */
  overlay?: boolean
  /** Close when the overlay is clicked */
  closeOnClickOverlay?: boolean
  /** Rounded corners on the side facing the screen center */
  round?: boolean
  /** Teleport target */
  teleport?: string
  /**
   * Base z-index (overlay uses it, popup uses zIndex + 1).
   * Defaults to a globally auto-incrementing value so later-opened
   * popups always stack above earlier ones.
   */
  zIndex?: number
}
