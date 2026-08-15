export interface MtBadgeProps {
  /** Badge content; numbers above `max` render as `{max}+` */
  value?: number | string
  /** Upper bound for numeric values */
  max?: number
  /** Render a small red dot instead of content */
  isDot?: boolean
  /** Hide the badge */
  hidden?: boolean
}
