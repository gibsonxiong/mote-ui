export interface MtStickyProps {
  /** Offset from the top (position top) or bottom (position bottom) edge */
  offset?: number
  /** Sticky direction */
  position?: 'top' | 'bottom'
  /** Scroll container selector; defaults to window */
  target?: string
  /** z-index applied to the sticky element */
  zIndex?: number
}