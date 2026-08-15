export interface MtSkeletonProps {
  /** Show the skeleton; renders slot content when false */
  loading?: boolean
  /** Number of paragraph rows */
  rows?: number
  /** Show a title row */
  title?: boolean
  /** Show an avatar placeholder */
  avatar?: boolean
  /** Round the row ends */
  round?: boolean
  /** Shimmer animation */
  animate?: boolean
}
