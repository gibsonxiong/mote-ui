import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Collapse from './collapse.vue'
import CollapseItem from './collapse-item.vue'

function mountCollapse(extraProps = '') {
  return mount({
    components: { Collapse, CollapseItem },
    template: `
      <Collapse ${extraProps}>
        <CollapseItem title="面板一" name="first">内容一</CollapseItem>
        <CollapseItem title="面板二" name="second">内容二</CollapseItem>
        <CollapseItem title="禁用" name="disabled" disabled>禁用内容</CollapseItem>
      </Collapse>
    `,
  })
}

describe('MtCollapse', () => {
  it('renders all items collapsed by default', async () => {
    const wrapper = mountCollapse()
    await nextTick()
    const items = wrapper.findAll('.mt-collapse-item')
    expect(items).toHaveLength(3)
    expect(items[0].find('.mt-collapse-item__header').text()).toContain('面板一')
    items.forEach((item) => {
      expect(item.classes()).not.toContain('mt-collapse-item--expanded')
      expect(item.find('.mt-collapse-item__header').attributes('aria-expanded')).toBe('false')
    })
    expect(items[0].find('.mt-collapse-item__body').text()).toBe('内容一')
  })

  it('expands panels according to modelValue', async () => {
    const wrapper = mount({
      components: { Collapse, CollapseItem },
      data: () => ({ names: ['second'] }),
      template: `
        <Collapse :model-value="names">
          <CollapseItem title="面板一" name="first">内容一</CollapseItem>
          <CollapseItem title="面板二" name="second">内容二</CollapseItem>
        </Collapse>
      `,
    })
    await nextTick()
    const items = wrapper.findAll('.mt-collapse-item')
    expect(items[0].classes()).not.toContain('mt-collapse-item--expanded')
    expect(items[1].classes()).toContain('mt-collapse-item--expanded')
    expect(items[1].find('.mt-collapse-item__header').attributes('aria-expanded')).toBe('true')
  })

  it('emits update:modelValue and change when toggling a panel', async () => {
    const onUpdate = vi.fn()
    const onChange = vi.fn()
    const wrapper = mount({
      components: { Collapse, CollapseItem },
      setup() {
        return { onUpdate, onChange }
      },
      template: `
        <Collapse :model-value="[]" @update:model-value="onUpdate" @change="onChange">
          <CollapseItem title="面板一" name="first">内容一</CollapseItem>
          <CollapseItem title="面板二" name="second">内容二</CollapseItem>
        </Collapse>
      `,
    })
    await nextTick()
    await wrapper.findAll('.mt-collapse-item__header')[0].trigger('click')
    expect(onUpdate).toHaveBeenCalledWith(['first'])
    expect(onChange).toHaveBeenCalledWith(['first'])
  })

  it('removes the name when collapsing an expanded panel', async () => {
    const onUpdate = vi.fn()
    const wrapper = mount({
      components: { Collapse, CollapseItem },
      setup() {
        return { onUpdate }
      },
      template: `
        <Collapse :model-value="['first', 'second']" @update:model-value="onUpdate">
          <CollapseItem title="面板一" name="first">内容一</CollapseItem>
          <CollapseItem title="面板二" name="second">内容二</CollapseItem>
        </Collapse>
      `,
    })
    await nextTick()
    await wrapper.findAll('.mt-collapse-item__header')[1].trigger('click')
    expect(onUpdate).toHaveBeenCalledWith(['first'])
  })

  it('keeps a single expanded panel in accordion mode', async () => {
    const onUpdate = vi.fn()
    const wrapper = mount({
      components: { Collapse, CollapseItem },
      setup() {
        return { onUpdate }
      },
      template: `
        <Collapse accordion :model-value="['first']" @update:model-value="onUpdate">
          <CollapseItem title="面板一" name="first">内容一</CollapseItem>
          <CollapseItem title="面板二" name="second">内容二</CollapseItem>
        </Collapse>
      `,
    })
    await nextTick()
    await wrapper.findAll('.mt-collapse-item__header')[1].trigger('click')
    expect(onUpdate).toHaveBeenCalledWith(['second'])
  })

  it('collapses the only panel when clicking it again in accordion mode', async () => {
    const onUpdate = vi.fn()
    const wrapper = mount({
      components: { Collapse, CollapseItem },
      setup() {
        return { onUpdate }
      },
      template: `
        <Collapse accordion :model-value="['first']" @update:model-value="onUpdate">
          <CollapseItem title="面板一" name="first">内容一</CollapseItem>
        </Collapse>
      `,
    })
    await nextTick()
    await wrapper.find('.mt-collapse-item__header').trigger('click')
    expect(onUpdate).toHaveBeenCalledWith([])
  })

  it('does not toggle a disabled item', async () => {
    const onUpdate = vi.fn()
    const wrapper = mount({
      components: { Collapse, CollapseItem },
      setup() {
        return { onUpdate }
      },
      template: `
        <Collapse :model-value="[]" @update:model-value="onUpdate">
          <CollapseItem title="禁用" name="disabled" disabled>禁用内容</CollapseItem>
        </Collapse>
      `,
    })
    await nextTick()
    await wrapper.find('.mt-collapse-item__header').trigger('click')
    expect(onUpdate).not.toHaveBeenCalled()
    expect(wrapper.find('.mt-collapse-item__header').attributes('aria-disabled')).toBe('true')
  })

  it('falls back to the item index when name is omitted', async () => {
    const onUpdate = vi.fn()
    const wrapper = mount({
      components: { Collapse, CollapseItem },
      setup() {
        return { onUpdate }
      },
      template: `
        <Collapse :model-value="[]" @update:model-value="onUpdate">
          <CollapseItem title="面板一">内容一</CollapseItem>
          <CollapseItem title="面板二">内容二</CollapseItem>
        </Collapse>
      `,
    })
    await nextTick()
    await wrapper.findAll('.mt-collapse-item__header')[1].trigger('click')
    expect(onUpdate).toHaveBeenCalledWith([1])
  })
})
