import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MtCell from './cell.vue'
import MtCellGroup from './cell-group.vue'

describe('MtCell', () => {
  it('renders title, value and label', () => {
    const wrapper = mount(MtCell, {
      props: { title: 'Title', value: 'Value', label: 'Label' },
    })
    expect(wrapper.text()).toContain('Title')
    expect(wrapper.text()).toContain('Value')
    expect(wrapper.text()).toContain('Label')
  })

  it('shows arrow and becomes clickable when isLink', async () => {
    const wrapper = mount(MtCell, { props: { title: 'Link', isLink: true } })
    expect(wrapper.classes()).toContain('mt-cell--clickable')
    expect(wrapper.find('.mt-cell__right-icon svg').exists()).toBe(true)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('applies border class by default and can remove it', () => {
    const wrapper = mount(MtCell, { props: { title: 'A' } })
    expect(wrapper.classes()).toContain('mt-cell--border')
    const noBorder = mount(MtCell, { props: { title: 'A', border: false } })
    expect(noBorder.classes()).not.toContain('mt-cell--border')
  })

  it('renders default slot as value', () => {
    const wrapper = mount(MtCell, { props: { title: 'A' }, slots: { default: 'slot value' } })
    expect(wrapper.find('.mt-cell__value').text()).toContain('slot value')
  })
})

describe('MtCellGroup', () => {
  it('renders group title and cells', () => {
    const wrapper = mount(MtCellGroup, {
      props: { title: 'Group' },
      slots: { default: '<div class="fake-cell">cell</div>' },
    })
    expect(wrapper.text()).toContain('Group')
    expect(wrapper.find('.fake-cell').exists()).toBe(true)
  })

  it('applies inset modifier', () => {
    const wrapper = mount(MtCellGroup, { props: { inset: true } })
    expect(wrapper.classes()).toContain('mt-cell-group--inset')
  })
})
