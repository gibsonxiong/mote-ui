// Momentum math for the picker wheel. Extracted into a pure function so the
// settle direction can be unit-tested without simulating touch events.

export const MOMENTUM_DURATION = 1000
export const MOMENTUM_LIMIT = 15

/**
 * Computes the option index the wheel should settle on after a drag ends.
 *
 * Sign convention: `dragOffset` and `velocity` are positive when the pointer
 * moved *downward* (finger down → content down → earlier options come to the
 * center). The velocity term continues the wheel's motion in the same
 * direction it was travelling, so a flick up (negative velocity) settles on a
 * *higher* index and a flick down (positive velocity) on a *lower* index.
 */
export function settleIndex(
  currentIndex: number,
  dragOffset: number,
  velocity: number,
  optionHeight: number,
): number {
  let distance = dragOffset
  if (Math.abs(velocity) > 0.1) {
    const momentum = (velocity * MOMENTUM_DURATION) / 3
    distance += Math.max(
      -MOMENTUM_LIMIT * optionHeight,
      Math.min(MOMENTUM_LIMIT * optionHeight, momentum),
    )
  }
  return currentIndex - Math.round(distance / optionHeight)
}
