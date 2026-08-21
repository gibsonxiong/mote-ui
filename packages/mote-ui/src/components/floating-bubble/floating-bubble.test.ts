import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FloatingBubble from './floating-bubble.vue'
import { applyAxis, snapOffset } from './utils'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('applyAxis', () => {
  const from = { x: 0, y: 0 }
  const next = { x: 50, y: 30 }

  it('restricts movement to the requested axis', () => {
    expect(applyAxis(from, next, 'x')).toEqual({ x: 50, y: 0 })
    expect(applyAxis(from, next, 'y')).toEqual({ x: 0, y: 30 })
    expect(applyAxis(from, next, 'xy')).toEqual({ x: 50, y: 30 })
  })
})

describe('snapOffset', () => {
  const viewport = { width: 375, height: 667 }
  const size = { width: 48, height: 48 }
  const gap = 24
  const maxX = 375 - 48 - 48

  it('snaps horizontally to the nearest edge', () => {
    expect(snapOffset({ x: maxX - 1, y: 10 }, 'x', viewport, size, gap)).toEqual({ x: maxX, y: 10 })
    expect(snapOffset({ x: 20, y: 10 }, 'x', viewport, size, gap)).toEqual({ x: 0, y: 10 })
  })

  it('snaps vertically to the nearest edge', () => {
    const maxY = 667 - 48 - 48
    expect(snapOffset({ x: 20, y: maxY - 1 }, 'y', viewport, size, gap)).toEqual({ x: 20, y: maxY })
    expect(snapOffset({ x: 20, y: 10 }, 'y', viewport, size, gap)).toEqual({ x: 20, y: 0 })
  })
})

describe('MtFloatingBubble', () => {
  it('renders the default plus content into the body', () => {
    const wrapper = mount(FloatingBubble, { attachTo: document.body })
    const el = document.body.querySelector('.mt-floating-bubble') as HTMLElement
    expect(el).toBeTruthy()
    expect(el.textContent).toBe('+')
    wrapper.unmount()
  })

  it('applies the gap and offset to the fixed position', () => {
    const wrapper = mount(FloatingBubble, {
      attachTo: document.body,
      props: { gap: 12, offset: { x: 8, y: 20 } },
    })
    const el = document.body.querySelector('.mt-floating-bubble') as HTMLElement
    expect(el.style.right).toBe('20px')
    expect(el.style.bottom).toBe('32px')
    wrapper.unmount()
  })

  it('emits click and renders custom slot content', () => {
    const wrapper = mount(FloatingBubble, {
      attachTo: document.body,
      slots: { default: '<span class="label">Go</span>' },
    })
    const el = document.body.querySelector('.mt-floating-bubble') as HTMLElement
    expect(el.querySelector('.label')?.textContent).toBe('Go')

    el.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(wrapper.emitted('click')).toHaveLength(1)
    wrapper.unmount()
  })
})