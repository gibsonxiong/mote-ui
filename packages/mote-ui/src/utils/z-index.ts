// Global z-index counter shared by overlay components. Every popup layer
// grabs a fresh value so later-opened layers always stack above earlier
// ones without manual coordination.
let current = 2000

export function nextZIndex(): number {
  current += 1
  return current
}
