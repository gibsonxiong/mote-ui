import type { MtFloatingBubbleAxis, MtFloatingBubbleMagnetic, MtFloatingBubbleOffset } from './types'

/**
 * Restrict a candidate offset to the component's drag axis.
 */
export function applyAxis(
  original: MtFloatingBubbleOffset,
  next: MtFloatingBubbleOffset,
  axis: MtFloatingBubbleAxis,
): MtFloatingBubbleOffset {
  return {
    x: axis === 'y' ? original.x : next.x,
    y: axis === 'x' ? original.y : next.y,
  }
}

/**
 * Snap an offset to the nearest edge along the magnetic axis. The offset is
 * expressed as the distance from the right/bottom edges.
 */
export function snapOffset(
  offset: MtFloatingBubbleOffset,
  magnetic: MtFloatingBubbleMagnetic,
  viewport: { width: number; height: number },
  size: { width: number; height: number },
  gap: number,
): MtFloatingBubbleOffset {
  const result = { ...offset }
  const maxX = Math.max(0, viewport.width - size.width - gap * 2)
  const maxY = Math.max(0, viewport.height - size.height - gap * 2)
  if (magnetic === 'x') {
    result.x = offset.x > maxX / 2 ? maxX : 0
  }
  if (magnetic === 'y') {
    result.y = offset.y > maxY / 2 ? maxY : 0
  }
  return result
}