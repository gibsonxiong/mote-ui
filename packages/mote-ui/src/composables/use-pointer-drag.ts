import { onBeforeUnmount, onMounted, ref, toValue, watchEffect } from 'vue'
import type { MaybeRefOrGetter, Ref } from 'vue'

export type DragDirection = 'horizontal' | 'vertical'

export interface DragInfo {
  /** Horizontal offset from the pointer-down position, in px. */
  deltaX: number
  /** Vertical offset from the pointer-down position, in px. */
  deltaY: number
  /** Instantaneous velocity along the active axis, in px/ms. */
  velocity: number
  /** Last known pointer position, in viewport px. */
  clientX: number
  clientY: number
}

export interface UsePointerDragOptions {
  /** Axis the gesture operates on. Reacts to changes (e.g. swipe's `vertical`). */
  direction: MaybeRefOrGetter<DragDirection>
  /** When true, the pointer is ignored entirely. */
  disabled?: MaybeRefOrGetter<boolean>
  onStart?: (info: DragInfo) => void
  onMove?: (info: DragInfo) => void
  onEnd?: (info: DragInfo) => void
}

/**
 * A horizontal drag keeps vertical page panning (so the page still scrolls);
 * a vertical drag keeps horizontal panning. This stops the browser from
 * stealing the gesture while never blocking the perpendicular scroll.
 */
function touchActionFor(direction: DragDirection): string {
  return direction === 'horizontal' ? 'pan-y' : 'pan-x'
}

/**
 * Unified pointer-based drag lifecycle shared by gesture components. It only
 * manages the plumbing (capture, window listeners, cleanup, direction -> delta
 * / velocity normalisation); every component owns its own settle logic.
 */
export function usePointerDrag(
  target: Ref<HTMLElement | null | undefined>,
  options: UsePointerDragOptions,
) {
  const dragging = ref(false)

  let startX = 0
  let startY = 0
  let lastX = 0
  let lastY = 0
  let lastTime = 0
  let velocity = 0

  function info(): DragInfo {
    return {
      deltaX: lastX - startX,
      deltaY: lastY - startY,
      velocity,
      clientX: lastX,
      clientY: lastY,
    }
  }

  function isDisabled() {
    return toValue(options.disabled) ?? false
  }

  function handleDown(event: PointerEvent) {
    if (isDisabled()) return
    dragging.value = true
    startX = event.clientX
    startY = event.clientY
    lastX = event.clientX
    lastY = event.clientY
    lastTime = Date.now()
    velocity = 0
    target.value?.setPointerCapture?.(event.pointerId)
    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleEnd)
    window.addEventListener('pointercancel', handleEnd)
    options.onStart?.(info())
  }

  function handleMove(event: PointerEvent) {
    if (!dragging.value) return
    const now = Date.now()
    const delta = now - lastTime
    if (delta > 0) {
      const direction = toValue(options.direction)
      const axisDelta = direction === 'horizontal' ? event.clientX - lastX : event.clientY - lastY
      velocity = axisDelta / delta
    }
    lastX = event.clientX
    lastY = event.clientY
    lastTime = now
    options.onMove?.(info())
  }

  function handleEnd() {
    removeWindowListeners()
    if (!dragging.value) return
    dragging.value = false
    options.onEnd?.(info())
  }

  function removeWindowListeners() {
    window.removeEventListener('pointermove', handleMove)
    window.removeEventListener('pointerup', handleEnd)
    window.removeEventListener('pointercancel', handleEnd)
  }

  // `touch-action` must track the active axis reactively (swipe can toggle
  // vertical), and is applied once the root element exists.
  watchEffect(() => {
    const el = target.value
    if (!el) return
    el.style.touchAction = touchActionFor(toValue(options.direction))
  })

  onMounted(() => {
    const el = target.value
    if (el) el.addEventListener('pointerdown', handleDown)
  })

  onBeforeUnmount(() => {
    const el = target.value
    if (el) el.removeEventListener('pointerdown', handleDown)
    removeWindowListeners()
  })

  return { dragging }
}
