import { describe, it, expect } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import MtGrid from './grid.vue'
import MtGridItem from './grid-item.vue'

function renderGrid(gridProps: Record<string, unknown>, itemCount: number) {
  const items = Array.from({ length: itemCount }, (_, i) =>
    h(MtGridItem, { icon: 'success', text: `item ${i}` }),
  )
  return mount(defineComponent({ render: () => h(MtGrid, gridProps, () => items) }))
}

describe('MtGrid', () => {
  it('renders columns from columnNum', () => {
    const wrapper = renderGrid({ columnNum: 3 }, 6)
    expect(wrapper.find('.mt-grid').attributes('style')).toContain('repeat(3, 1fr)')
    expect(wrapper.findAll('.mt-grid-item')).toHaveLength(6)
  })

  it('defaults to 4 columns with borders', () => {
    const wrapper = renderGrid({}, 4)
    expect(wrapper.find('.mt-grid').attributes('style')).toContain('repeat(4, 1fr)')
    expect(wrapper.find('.mt-grid').classes()).toContain('mt-grid--border')
    expect(wrapper.find('.mt-grid-item').classes()).toContain('mt-grid-item--border')
  })

  it('renders square items when square is set', () => {
    const wrapper = renderGrid({ square: true }, 2)
    expect(wrapper.find('.mt-grid-item__content').classes()).toContain(
      'mt-grid-item__content--square',
    )
  })

  it('renders icon and text of items', () => {
    const wrapper = renderGrid({}, 1)
    expect(wrapper.find('.mt-grid-item svg').exists()).toBe(true)
    expect(wrapper.find('.mt-grid-item__text').text()).toBe('item 0')
  })

  it('emits click from items', async () => {
    const wrapper = renderGrid({}, 1)
    await wrapper.find('.mt-grid-item').trigger('click')
    expect(wrapper.findComponent(MtGridItem).emitted('click')).toHaveLength(1)
  })
})
