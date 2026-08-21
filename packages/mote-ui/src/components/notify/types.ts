export type MtNotifyType = 'primary' | 'success' | 'warning' | 'danger'

export interface MtNotifyProps {
  /** Whether the notify is shown */
  modelValue?: boolean
  /** Notify content */
  message?: string
  type?: MtNotifyType
  /** Stacking order; defaults to 3000 to stay above modal layers */
  zIndex?: number
}

export interface MtNotifyOptions {
  /** Notify content */
  message?: string
  type?: MtNotifyType
  /** Auto-close delay in ms; 0 keeps the notify until closed */
  duration?: number
  /** Stacking order; defaults to 3000 to stay above modal layers */
  zIndex?: number
}

export interface MtNotifyApi {
  show: (options: MtNotifyOptions | string) => void
  primary: (message: string) => void
  success: (message: string) => void
  warning: (message: string) => void
  danger: (message: string) => void
  close: () => void
}
