// Reference-counted body scroll lock shared by overlay components.
let lockCount = 0
let previousOverflow = ''

export function lockScroll(): void {
  if (lockCount === 0) {
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
  lockCount++
}

export function unlockScroll(): void {
  if (lockCount === 0) return
  lockCount--
  if (lockCount === 0) {
    document.body.style.overflow = previousOverflow
  }
}
