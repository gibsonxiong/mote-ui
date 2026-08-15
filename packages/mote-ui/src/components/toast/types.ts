export type MtToastType = 'text' | 'success' | 'fail' | 'loading'
export type MtToastPosition = 'top' | 'middle' | 'bottom'

export interface MtToastOptions {
  /** Toast content */
  message?: string
  type?: MtToastType
  /** Auto-close delay in ms; 0 keeps the toast until cleared */
  duration?: number
  position?: MtToastPosition
  /** Show a transparent overlay that blocks page interaction */
  overlay?: boolean
}

export interface MtToastApi {
  show: (options: MtToastOptions | string) => void
  text: (message: string) => void
  success: (message: string) => void
  fail: (message: string) => void
  loading: (message?: string) => void
  clear: () => void
}
