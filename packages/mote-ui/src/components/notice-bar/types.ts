import type { MtIconName } from '../icon/types'

export interface MtNoticeBarProps {
  /** Notice text */
  text?: string
  /** Force horizontal scrolling (otherwise static with ellipsis) */
  scrollable?: boolean
  /** Scroll speed (px/s) */
  speed?: number
  /** Left icon name */
  leftIcon?: MtIconName
  /** Show a close button on the right */
  closeable?: boolean
  /** Allow the text to wrap onto multiple lines */
  wrapable?: boolean
  color?: string
  background?: string
}
