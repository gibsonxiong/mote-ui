import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import IndexBar from './index-bar.vue'
import IndexAnchor from './index-anchor.vue'

function mountIndexBar() {
  return mount({
    components: { IndexBar, IndexAnchor },
    template: `
      <IndexBar>
        <IndexAnchor index="A">Apple</IndexAnchor>
        <IndexAnchor index="B">Banana</IndexAnchor>
      </IndexBar>
    `,
  })
}

describe('MtIndexBar', () => {
  it('renders the A-Z index list by default', () => {
    const wrapper = mount(IndexBar)
    const indexes = wrapper.findAll('.mt-index-bar__index')
    expect(indexes).toHaveLength(26)
    expect(indexes[0].text()).toBe('A')
    expect(indexes[25].text()).toBe('Z')
  })

  it('renders a custom index list', () => {
    const wrapper = mount(IndexBar, { props: { indexList: ['1', '2', '3'] } })
    const indexes = wrapper.findAll('.mt-index-bar__index')
    expect(indexes.map((i) => i.text())).toEqual(['1', '2', '3'])
  })

  it('renders anchors with their index and content', () => {
    const wrapper = mountIndexBar()
    const anchors = wrapper.findAll('.mt-index-anchor')
    expect(anchors).toHaveLength(2)
    expect(anchors[0].find('.mt-index-anchor__sticky').text()).toBe('A')
    expect(anchors[0].find('.mt-index-anchor__content').text()).toBe('Apple')
  })

  it('emits select and change when an index is clicked', async () => {
    const onSelect = vi.fn()
    const onChange = vi.fn()
    const wrapper = mount({
      components: { IndexBar, IndexAnchor },
      setup() {
        return { onSelect, onChange }
      },
      template: `
        <IndexBar @select="onSelect" @change="onChange">
          <IndexAnchor index="A" />
          <IndexAnchor index="B" />
        </IndexBar>
      `,
    })
    await wrapper.findAll('.mt-index-bar__index')[1].trigger('click')
    expect(onSelect).toHaveBeenCalledWith('B')
    expect(onChange).toHaveBeenCalledWith('B')
  })

  it('highlights the active index with the custom color', async () => {
    const wrapper = mount(IndexBar, {
      props: { indexList: ['A', 'B'], highlightColor: 'rgb(255, 0, 0)' },
    })
    await wrapper.findAll('.mt-index-bar__index')[0].trigger('click')
    const active = wrapper.find('.mt-index-bar__index--active')
    expect(active.exists()).toBe(true)
    expect((active.element as HTMLElement).style.color).toBe('rgb(255, 0, 0)')
  })

  it('exposes scrollTo', () => {
    const wrapper = mount(IndexBar)
    expect(typeof wrapper.vm.scrollTo).toBe('function')
  })
})