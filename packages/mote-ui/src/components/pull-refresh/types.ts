export type MtPullRefreshStatus = 'idle' | 'pulling' | 'loosing' | 'loading' | 'success'

export interface MtPullRefreshProps {
  /** Whether a refresh round is in progress */
  loading?: boolean
  /** Distance from the top (in px) that triggers a refresh */
  headHeight?: number
  /** How long the success hint stays visible (ms); hidden when not positive */
  successDuration?: number
  successText?: string
  disabled?: boolean
}
