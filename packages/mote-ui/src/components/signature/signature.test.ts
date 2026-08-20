import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MtSignature from './signature.vue'

describe('MtSignature', () => {
  it('renders the canvas and default footer buttons', () => {
    const wrapper = mount(MtSignature)
    expect(wrapper.find('canvas').exists()).toBe(true)
    const buttons = wrapper.findAll('.mt-signature__btn')
    expect(buttons.length).toBe(2)
    expect(buttons[0].text()).toBe('清除')
    expect(buttons[1].text()).toBe('确认')
  })

  it('uses custom button labels', () => {
    const wrapper = mount(MtSignature, {
      props: { clearButtonText: 'Reset', confirmButtonText: 'Done' },
    })
    expect(wrapper.text()).toContain('Reset')
    expect(wrapper.text()).toContain('Done')
  })

  it('shows tips when provided', () => {
    const wrapper = mount(MtSignature, { props: { tips: 'Please sign above' } })
    expect(wrapper.find('.mt-signature__tips').text()).toBe('Please sign above')
  })

  it('starts and ends signing on pointer interactions without throwing', async () => {
    const wrapper = mount(MtSignature)
    await wrapper.find('canvas').trigger('pointerdown', { clientX: 10, clientY: 10 })
    expect(wrapper.emitted('start')).toHaveLength(1)
    expect(wrapper.emitted('signing')?.[0]).toEqual([true])

    window.dispatchEvent(new MouseEvent('pointermove', { clientX: 20, clientY: 20 }))
    window.dispatchEvent(new MouseEvent('pointerup'))
    expect(wrapper.emitted('end')).toHaveLength(1)
    expect(wrapper.emitted('signing')?.[1]).toEqual([false])
  })

  it('emits clear from the exposed clear method', () => {
    const wrapper = mount(MtSignature)
    ;(wrapper.vm as unknown as { clear: () => void }).clear()
    expect(wrapper.emitted('clear')).toHaveLength(1)
  })

  it('emits submit with a canvas and empty image when toDataURL is unavailable', () => {
    const wrapper = mount(MtSignature)
    ;(wrapper.vm as unknown as { submit: () => void }).submit()
    const payload = wrapper.emitted('submit')?.[0]?.[0] as {
      canvas: HTMLCanvasElement | null
      image: string
    }
    expect(payload).toBeDefined()
    expect(payload.canvas).toBeTruthy()
    expect(payload.image).toBe('')
  })

  it('applies a background color to the canvas when set', () => {
    const wrapper = mount(MtSignature, { props: { backgroundColor: '#fff' } })
    const canvas = wrapper.find('canvas').element as HTMLCanvasElement
    expect(canvas.width).toBeGreaterThan(0)
    expect(canvas.height).toBeGreaterThan(0)
  })
})