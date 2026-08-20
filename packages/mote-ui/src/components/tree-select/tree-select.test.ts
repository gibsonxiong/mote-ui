import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TreeSelect from './tree-select.vue'
import type { MtTreeSelectItem } from './types'

const items: MtTreeSelectItem[] = [
  {
    text: '浙江',
    children: [
      { id: 'hz', text: '杭州' },
      { id: 'nb', text: '宁波' },
    ],
  },
  {
    text: '江苏',
    children: [{ id: 'nj', text: '南京' }],
  },
]

describe('MtTreeSelect', () => {
  it('renders nav items and the active children', () => {
    const wrapper = mount(TreeSelect, { props: { items } })
    expect(wrapper.findAll('.mt-tree-select__nav-item')).toHaveLength(2)
    expect(wrapper.findAll('.mt-tree-select__item')).toHaveLength(2)
    expect(wrapper.find('.mt-tree-select__item').text()).toBe('杭州')
  })

  it('emits update:mainActiveIndex and click-nav on nav click', async () => {
    const wrapper = mount(TreeSelect, { props: { items } })
    await wrapper.findAll('.mt-tree-select__nav-item')[1].trigger('click')
    expect(wrapper.emitted('update:mainActiveIndex')?.[0]).toEqual([1])
    expect(wrapper.emitted('click-nav')?.[0]).toEqual([1])
    expect(wrapper.findAll('.mt-tree-select__item')).toHaveLength(1)
    expect(wrapper.find('.mt-tree-select__item').text()).toBe('南京')
  })

  it('emits update:activeId and click-item on item click', async () => {
    const wrapper = mount(TreeSelect, { props: { items } })
    await wrapper.findAll('.mt-tree-select__item')[1].trigger('click')
    expect(wrapper.emitted('update:activeId')?.[0]).toEqual(['nb'])
    expect(wrapper.emitted('click-item')?.[0][0]).toMatchObject({ id: 'nb', text: '宁波' })
  })

  it('marks the active item and nav index', () => {
    const wrapper = mount(TreeSelect, {
      props: { items, activeId: 'hz', mainActiveIndex: 0 },
    })
    expect(wrapper.find('.mt-tree-select__item').classes()).toContain('is-active')
    expect(wrapper.findAll('.mt-tree-select__nav-item')[0].classes()).toContain('is-active')
  })

  it('does not emit for disabled nav or disabled items', async () => {
    const disabledItems: MtTreeSelectItem[] = [
      { text: 'A', disabled: true, children: [{ id: 1, text: 'A1' }] },
      { text: 'B', children: [{ id: 2, text: 'B1', disabled: true }] },
    ]
    const wrapper = mount(TreeSelect, { props: { items: disabledItems, mainActiveIndex: 1 } })
    await wrapper.findAll('.mt-tree-select__nav-item')[0].trigger('click')
    expect(wrapper.emitted('update:mainActiveIndex')).toBeUndefined()
    await wrapper.find('.mt-tree-select__item').trigger('click')
    expect(wrapper.emitted('update:activeId')).toBeUndefined()
  })

  it('renders badge with max clamp', () => {
    const badgeItems: MtTreeSelectItem[] = [
      { text: 'A', badge: 120, children: [] },
      { text: 'B', dot: true, children: [] },
    ]
    const wrapper = mount(TreeSelect, { props: { items: badgeItems, max: 99 } })
    const badges = wrapper.findAll('.mt-tree-select__nav-badge')
    expect(badges).toHaveLength(1)
    expect(badges[0].text()).toBe('99+')
    expect(wrapper.findAll('.mt-tree-select__nav-dot')).toHaveLength(1)
  })
})