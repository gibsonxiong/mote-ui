export interface MtListProps {
  /** Whether a load round is in progress */
  loading?: boolean
  /** Whether all data has been loaded */
  finished?: boolean
  /** Whether the last load failed; tapping the error text retries */
  error?: boolean
  /** Distance from the bottom (in px) at which the check fires */
  offset?: number
  /** Whether to run an initial check right after mount */
  immediateCheck?: boolean
  loadingText?: string
  finishedText?: string
  errorText?: string
}
