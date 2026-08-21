export type MtFloatingBubbleAxis = 'x' | 'y' | 'xy'

export type MtFloatingBubbleMagnetic = 'x' | 'y'

export interface MtFloatingBubbleOffset {
  x: number
  y: number
}

export interface MtFloatingBubbleProps {
  /** Dragging axis; 'xy' allows free movement in both directions */
  axis?: MtFloatingBubbleAxis
  /** Axis to magnetically snap to the nearest edge after dragging */
  magnetic?: MtFloatingBubbleMagnetic
  /** Distance from the screen edge in px */
  gap?: number
  /** Initial offset from the default bottom-right position */
  offset?: MtFloatingBubbleOffset
  /** Teleport target, defaults to body */
  teleport?: string
}