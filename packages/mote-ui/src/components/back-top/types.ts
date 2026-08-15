export interface MtBackTopProps {
  /** Scrolling element to track; defaults to the window */
  target?: string | HTMLElement
  /** Show the button once the scroll distance exceeds this value */
  visibilityHeight?: number
  /** Offset from the right edge of the viewport (px) */
  right?: number
  /** Offset from the bottom edge of the viewport (px) */
  bottom?: number
}
