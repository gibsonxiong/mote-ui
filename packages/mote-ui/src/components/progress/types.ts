export type MtProgressStatus = 'success' | 'danger'

export interface MtProgressProps {
  /** Completion percentage (0-100) */
  percentage?: number
  /** Track height (px) */
  strokeWidth?: number
  /** Bar color; overrides status color */
  color?: string
  /** Semantic status that colors the bar */
  status?: MtProgressStatus
  /** Show the percentage text at the end */
  showText?: boolean
}
