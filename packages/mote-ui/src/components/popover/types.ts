import type { MtIconName } from '../icon/types'

export type MtPopoverPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface MtPopoverAction {
  /** Action label */
  text: string
  /** Optional icon rendered before the text */
  icon?: MtIconName
  disabled?: boolean
}

export interface MtPopoverProps {
  /** Whether the popover is shown */
  modelValue?: boolean
  /** Preferred direction of the floating panel */
  placement?: MtPopoverPlacement
  /** Menu actions; can be replaced by the default slot */
  actions?: MtPopoverAction[]
  /** Custom z-index; auto-allocated when omitted */
  zIndex?: number
}
