export interface MtNavBarProps {
  /** Title text */
  title?: string
  /** Left button text */
  leftText?: string
  /** Right button text */
  rightText?: string
  /** Show left arrow icon */
  leftArrow?: boolean
  /** Show right arrow icon */
  rightArrow?: boolean
  /** Show bottom border */
  border?: boolean
  /** Fixed to the top of the page */
  fixed?: boolean
  /** Render a placeholder to occupy height when fixed */
  placeholder?: boolean
  /** Inset safe area at the top (for notched devices) */
  safeAreaInsetTop?: boolean
  zIndex?: number
}
