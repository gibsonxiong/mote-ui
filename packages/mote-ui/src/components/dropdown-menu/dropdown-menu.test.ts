import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import DropdownMenu from './dropdown-menu.vue'
import DropdownItem from './dropdown-item.vue'
import type { MtDropdownOption } from './types'

const options: MtDropdownOption[] = [
  { text: '全部商品', value: 'all' },
  { text: '新款商品', value: 'new' },
  { text: '活动商品', value: 'activity' },
]

describe('MtDropdownMenu / MtDropdownItem', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    document.body.style.overflow = ''
  })

  it('renders item titles and opens options on click', async () => {
    const wrapper = mount(DropdownMenu, {
      slots: {
        default: () => [
          h(DropdownItem, { title: '排序', options }),
          h(DropdownItem, { title: '筛选', options }),
        ],
      },
    })
    const titles = wrapper.findAll('.mt-dropdown-item__title')
    expect(titles).toHaveLength(2)
    await titles[0].trigger('click')
    expect(document.querySelectorAll('.mt-dropdown-item__option')).toHaveLength(3)
    wrapper.unmount()
  })

  it('selects an option, emits value and closes', async () => {
    const wrapper = mount(DropdownMenu, {
      slots: {
        default: () => [h(DropdownItem, { title: '排序', options })],
      },
    })
    await wrapper.find('.mt-dropdown-item__title').trigger('click')
    const optionButtons = document.querySelectorAll('.mt-dropdown-item__option')
    ;(optionButtons[1] as HTMLElement).click()
    const item = wrapper.findComponent(DropdownItem)
    expect(item.emitted('change')?.[0]).toEqual(['new'])
    expect(item.emitted('update:modelValue')?.[0]).toEqual(['new'])
    await wrapper.vm.$nextTick()
    expect(document.querySelectorAll('.mt-dropdown-item__option')).toHaveLength(0)
    wrapper.unmount()
  })

  it('shows the selected option text as title', () => {
    const wrapper = mount(DropdownMenu, {
      slots: {
        default: () => [h(DropdownItem, { title: '排序', modelValue: 'new', options })],
      },
    })
    expect(wrapper.find('.mt-dropdown-item__title-text').text()).toBe('新款商品')
    wrapper.unmount()
  })

  it('toggles open state and closes when overlay clicked', async () => {
    const wrapper = mount(DropdownMenu, {
      slots: {
        default: () => [
          h(DropdownItem, { title: '排序', options }),
          h(DropdownItem, { title: '筛选', options }),
        ],
      },
    })
    const titles = wrapper.findAll('.mt-dropdown-item__title')
    await titles[0].trigger('click')
    expect(document.querySelectorAll('.mt-dropdown-item__option')).toHaveLength(3)
    // Opening the second item closes the first.
    await titles[1].trigger('click')
    expect(document.querySelectorAll('.mt-dropdown-item__option')).toHaveLength(3)
    // Clicking the second again closes it.
    await titles[1].trigger('click')
    expect(document.querySelectorAll('.mt-dropdown-item__option')).toHaveLength(0)
    wrapper.unmount()
  })

  it('does not open a disabled item', async () => {
    const wrapper = mount(DropdownMenu, {
      slots: {
        default: () => [h(DropdownItem, { title: '排序', disabled: true, options })],
      },
    })
    await wrapper.find('.mt-dropdown-item__title').trigger('click')
    expect(document.querySelectorAll('.mt-dropdown-item__option')).toHaveLength(0)
    wrapper.unmount()
  })
})