export type MtNotifyType = 'primary' | 'success' | 'warning' | 'danger'

export interface MtNotifyProps {
  /** Whether the notify is shown */
  modelValue?: boolean
  /** Notify content */
  message?: string
  type?: MtNotifyType
}

export interface MtNotifyOptions {
  /** Notify content */
  message?: string
  type?: MtNotifyType
  /** Auto-close delay in ms; 0 keeps the notify until closed */
  duration?: number
}

export interface MtNotifyApi {
  show: (options: MtNotifyOptions | string) => void
  primary: (message: string) => void
  success: (message: string) => void
  warning: (message: string) => void
  danger: (message: string) => void
  close: () => void
}
