export type MtLoadingType = 'circular' | 'spinner'

export interface MtLoadingProps {
  /** Spinner style */
  type?: MtLoadingType
  /** Spinner diameter (px) */
  size?: number
  /** Description text below or beside the spinner */
  text?: string
  /** Stack the text below the spinner */
  vertical?: boolean
  /** Spinner and text color */
  color?: string
}
