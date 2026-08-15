export interface MtSwipeProps {
  /** Bound value: index of the active slide */
  modelValue?: number
  /** Autoplay interval in ms; disabled when not positive */
  autoplay?: number
  /** Slide animation duration in ms */
  duration?: number
  /** Wrap around at the edges */
  loop?: boolean
  /** Show the indicator dots */
  showIndicators?: boolean
  /** Vertical sliding direction */
  vertical?: boolean
}
