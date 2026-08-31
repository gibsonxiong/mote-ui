import { computed, onBeforeUnmount, ref, watch, type Ref } from 'vue'
import type { MtPopoverAlign, MtPopoverPlacement } from '../components/popover/types'

const SAFE_GAP = 8

interface Rect {
  top: number
  left: number
  width: number
  height: number
}

export interface PopoverPosition {
  top: number
  left: number
  placement: MtPopoverPlacement
}

/**
 * Returns the nearest scrollable ancestor of `el`, or null when the page
 * itself (window) is the only scroll container.
 */
function getScrollParent(el: HTMLElement | null): HTMLElement | null {
  if (!el) return null
  let node: HTMLElement | null = el.parentElement
  while (node) {
    const { overflowY, overflowX } = getComputedStyle(node)
    const scrollableY = /auto|scroll|overlay/.test(overflowY)
    const scrollableX = /auto|scroll|overlay/.test(overflowX)
    if (scrollableY || scrollableX) return node
    node = node.parentElement
  }
  return null
}

/**
 * Computes the absolute (viewport) position of the floating panel for a
 * trigger element, flipping to the opposite direction and clamping within the
 * viewport when space is insufficient.
 */
export function usePopoverPosition(options: {
  triggerRef: Ref<HTMLElement | undefined>
  panelRef: Ref<HTMLElement | undefined>
  placement: Ref<MtPopoverPlacement>
  align: Ref<MtPopoverAlign>
  offset: Ref<number>
  visible: Ref<boolean>
}) {
  const { triggerRef, panelRef, placement, align, offset, visible } = options

  const position = ref<PopoverPosition>({ top: 0, left: 0, placement: placement.value })
  const currentPlacement = ref<MtPopoverPlacement>(placement.value)

  function measurePanel(): Rect {
    const el = panelRef.value
    if (!el) return { top: 0, left: 0, width: 0, height: 0 }
    const rect = el.getBoundingClientRect()
    return { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
  }

  function flipIfNeeded(
    preferred: MtPopoverPlacement,
    trigger: Rect,
    panel: Rect,
  ): MtPopoverPlacement {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const gap = offset.value + SAFE_GAP

    const fitsTop = trigger.top - panel.height - gap >= 0
    const fitsBottom = trigger.top + trigger.height + panel.height + gap <= vh
    const fitsLeft = trigger.left - panel.width - gap >= 0
    const fitsRight = trigger.left + trigger.width + panel.width + gap <= vw

    switch (preferred) {
      case 'top':
        return fitsTop ? 'top' : fitsBottom ? 'bottom' : fitsLeft ? 'left' : 'right'
      case 'bottom':
        return fitsBottom ? 'bottom' : fitsTop ? 'top' : fitsLeft ? 'left' : 'right'
      case 'left':
        return fitsLeft ? 'left' : fitsRight ? 'right' : fitsTop ? 'top' : 'bottom'
      case 'right':
        return fitsRight ? 'right' : fitsLeft ? 'left' : fitsTop ? 'top' : 'bottom'
    }
  }

  function alignValue(trigger: Rect, panel: Rect, axis: 'horizontal' | 'vertical'): number {
    const a = align.value
    if (axis === 'horizontal') {
      if (a === 'start') return trigger.left
      if (a === 'end') return trigger.left + trigger.width - panel.width
      return trigger.left + (trigger.width - panel.width) / 2
    }
    if (a === 'start') return trigger.top
    if (a === 'end') return trigger.top + trigger.height - panel.height
    return trigger.top + (trigger.height - panel.height) / 2
  }

  function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
  }

  function updatePosition() {
    const trigger = triggerRef.value
    if (!trigger || !visible.value) return

    // Measure the panel at its natural size before positioning. It is rendered
    // off-screen while hidden so its dimensions are available.
    const panel = measurePanel()
    if (panel.width === 0 && panel.height === 0) return

    const triggerRect = trigger.getBoundingClientRect()
    const triggerRectFull: Rect = {
      top: triggerRect.top,
      left: triggerRect.left,
      width: triggerRect.width,
      height: triggerRect.height,
    }

    const placement_ = flipIfNeeded(placement.value, triggerRectFull, panel)
    currentPlacement.value = placement_

    const gap = offset.value
    let top = 0
    let left = 0

    switch (placement_) {
      case 'top':
        top = triggerRectFull.top - panel.height - gap
        left = alignValue(triggerRectFull, panel, 'horizontal')
        break
      case 'bottom':
        top = triggerRectFull.top + triggerRectFull.height + gap
        left = alignValue(triggerRectFull, panel, 'horizontal')
        break
      case 'left':
        left = triggerRectFull.left - panel.width - gap
        top = alignValue(triggerRectFull, panel, 'vertical')
        break
      case 'right':
        left = triggerRectFull.left + triggerRectFull.width + gap
        top = alignValue(triggerRectFull, panel, 'vertical')
        break
    }

    // Clamp within the viewport with a safe gap.
    top = clamp(top, SAFE_GAP, window.innerHeight - panel.height - SAFE_GAP)
    left = clamp(left, SAFE_GAP, window.innerWidth - panel.width - SAFE_GAP)

    position.value = { top, left, placement: placement_ }
  }

  // Reposition when the trigger moves (scroll) or the viewport resizes.
  let scrollParent: HTMLElement | null = null

  function onScroll() {
    updatePosition()
  }

  function onResize() {
    updatePosition()
  }

  watch(
    visible,
    (v) => {
      if (v) {
        scrollParent = getScrollParent(triggerRef.value ?? null)
        window.addEventListener('scroll', onScroll, true)
        window.addEventListener('resize', onResize)
        if (scrollParent) scrollParent.addEventListener('scroll', onScroll, true)
        // Wait a tick for the panel to render before measuring.
        requestAnimationFrame(updatePosition)
      } else {
        window.removeEventListener('scroll', onScroll, true)
        window.removeEventListener('resize', onResize)
        if (scrollParent) scrollParent.removeEventListener('scroll', onScroll, true)
        scrollParent = null
      }
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll, true)
    window.removeEventListener('resize', onResize)
    if (scrollParent) scrollParent.removeEventListener('scroll', onScroll, true)
  })

  const panelStyle = computed(() => ({
    top: `${position.value.top}px`,
    left: `${position.value.left}px`,
  }))

  return {
    position,
    currentPlacement,
    panelStyle,
    updatePosition,
  }
}
