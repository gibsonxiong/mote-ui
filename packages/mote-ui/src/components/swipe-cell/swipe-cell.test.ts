import { describe, it, expect, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { h } from 'vue'
import MtSwipeCell from './swipe-cell.vue'

function mountCell(props: Record<string, unknown> = {}) {
  return mount(MtSwipeCell, {
    props,
    slots: {
      default: () => h('div', { class: 'content' }, 'cell content'),
      left: () => h('div', { class: 'left-action' }, 'pin'),
      right: () => h('div', { class: 'right-action' }, 'delete'),
    },
    attachTo: document.body,
  })
}

function mockSideWidths(wrapper: ReturnType<typeof mount>, left = 60, right = 80) {
  const leftEl = wrapper.find('.mt-swipe-cell__left').element as HTMLElement
  const rightEl = wrapper.find('.mt-swipe-cell__right').element as HTMLElement
  Object.defineProperty(leftEl, 'offsetWidth', { value: left, configurable: true })
  Object.defineProperty(rightEl, 'offsetWidth', { value: right, configurable: true })
}

async function drag(wrapper: ReturnType<typeof mount>, from: number, to: number) {
  await wrapper.find('.mt-swipe-cell').trigger('touchstart', { touches: [{ clientX: from, clientY: 0 }] })
  await wrapper.find('.mt-swipe-cell').trigger('touchmove', { touches: [{ clientX: to, clientY: 0 }] })
  await wrapper.find('.mt-swipe-cell').trigger('touchend')
}

const wrappers: ReturnType<typeof mount>[] = []

afterEach(() => {
  while (wrappers.length) wrappers.pop()!.unmount()
  document.body.innerHTML = ''
})

describe('MtSwipeCell', () => {
  it('renders default, left and right slots', () => {
    const wrapper = mountCell()
    wrappers.push(wrapper)
    expect(wrapper.find('.content').exists()).toBe(true)
    expect(wrapper.find('.left-action').exists()).toBe(true)
    expect(wrapper.find('.right-action').exists()).toBe(true)
  })

  it('opens to the right side after dragging left past half its width', async () => {
    const wrapper = mountCell()
    wrappers.push(wrapper)
    mockSideWidths(wrapper)
    await drag(wrapper, 100, 10)
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['right'])
    expect(wrapper.emitted('open')?.at(-1)).toEqual(['right'])
    const style = (wrapper.find('.mt-swipe-cell__wrapper').element as HTMLElement).style
    expect(style.transform).toBe('translateX(-80px)')
  })

  it('opens to the left side after dragging right past half its width', async () => {
    const wrapper = mountCell()
    wrappers.push(wrapper)
    mockSideWidths(wrapper)
    await drag(wrapper, 10, 80)
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['left'])
    expect(wrapper.emitted('open')?.at(-1)).toEqual(['left'])
  })

  it('snaps back when the drag does not cross the threshold', async () => {
    const wrapper = mountCell()
    wrappers.push(wrapper)
    mockSideWidths(wrapper)
    await drag(wrapper, 100, 70)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    const style = (wrapper.find('.mt-swipe-cell__wrapper').element as HTMLElement).style
    expect(style.transform).toBe('translateX(0px)')
  })

  it('closes when clicking outside while open', async () => {
    const wrapper = mountCell({ modelValue: 'right' })
    wrappers.push(wrapper)
    mockSideWidths(wrapper)
    // Wait past the post-touch click guard window
    await new Promise((resolve) => setTimeout(resolve, 320))
    document.body.click()
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['none'])
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('can be controlled through v-model', async () => {
    const wrapper = mountCell()
    wrappers.push(wrapper)
    mockSideWidths(wrapper)
    await wrapper.setProps({ modelValue: 'right' })
    const style = (wrapper.find('.mt-swipe-cell__wrapper').element as HTMLElement).style
    expect(style.transform).toBe('translateX(-80px)')
  })

  it('exposes open and close methods', async () => {
    const wrapper = mountCell()
    wrappers.push(wrapper)
    mockSideWidths(wrapper)
    ;(wrapper.vm as unknown as { open: (p: 'left' | 'right') => void; close: () => void }).open('right')
    expect(wrapper.emitted('open')?.at(-1)).toEqual(['right'])
    ;(wrapper.vm as unknown as { close: () => void }).close()
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['none'])
  })

  it('ignores drags when disabled', async () => {
    const wrapper = mountCell({ disabled: true })
    wrappers.push(wrapper)
    mockSideWidths(wrapper)
    await drag(wrapper, 100, 10)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.classes()).toContain('is-disabled')
  })

  it('applies the offset when mounted already open', async () => {
    const wrapper = mountCell({ modelValue: 'right' })
    wrappers.push(wrapper)
    mockSideWidths(wrapper)
    await flushPromises()
    const style = (wrapper.find('.mt-swipe-cell__wrapper').element as HTMLElement).style
    expect(style.transform).toBe('translateX(-80px)')
  })

  it('snaps back to open when released without crossing the opposite threshold', async () => {
    const wrapper = mountCell({ modelValue: 'right' })
    wrappers.push(wrapper)
    mockSideWidths(wrapper)
    await flushPromises()
    // drag right by 60px: offset goes -80 -> -20, within neither threshold
    await drag(wrapper, 0, 60)
    const style = (wrapper.find('.mt-swipe-cell__wrapper').element as HTMLElement).style
    expect(style.transform).toBe('translateX(-80px)')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
