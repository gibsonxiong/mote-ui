import type { MtIconName } from '../icon/types'

export type MtPopoverPlacement = 'top' | 'bottom' | 'left' | 'right'

/** Alignment along the cross axis, relative to the trigger element. */
export type MtPopoverAlign = 'start' | 'center' | 'end'

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
  /**
   * Alignment along the cross axis.
   * - `top`/`bottom`: aligns the panel horizontally (start = left, end = right)
   * - `left`/`right`: aligns the panel vertically (start = top, end = bottom)
   */
  align?: MtPopoverAlign
  /** Menu actions; can be replaced by the default slot */
  actions?: MtPopoverAction[]
  /** Gap between the panel and the trigger element in px */
  offset?: number
  /** Whether selecting an action closes the popover */
  closeOnSelect?: boolean
  /** Render a page overlay behind the panel */
  overlay?: boolean
  /** Whether clicking the overlay closes the popover */
  closeOnClickOverlay?: boolean
  /** Teleport target; defaults to `body` so the panel escapes clipping ancestors */
  teleport?: string
  /** Custom z-index; auto-allocated when omitted */
  zIndex?: number
  /** Transition duration in milliseconds */
  duration?: number
}
