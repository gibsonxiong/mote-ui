import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, nextTick } from 'vue'
import Tabs from './tabs.vue'
import TabPane from './tab-pane.vue'

function mountTabs(extraProps = '') {
  return mount({
    components: { Tabs, TabPane },
    template: `
      <Tabs ${extraProps}>
        <TabPane title="水果">水果内容</TabPane>
        <TabPane title="蔬菜" name="vegetable">蔬菜内容</TabPane>
        <TabPane title="禁用" disabled>禁用内容</TabPane>
      </Tabs>
    `,
  })
}

describe('MtTabs', () => {
  it('renders pane titles in the nav', async () => {
    const wrapper = mountTabs()
    await nextTick()
    const items = wrapper.findAll('.mt-tabs__item')
    expect(items).toHaveLength(3)
    expect(items[0].text()).toBe('水果')
    expect(items[1].text()).toBe('蔬菜')
  })

  it('shows the first pane by default and hides others', () => {
    const wrapper = mountTabs()
    const panes = wrapper.findAll('.mt-tab-pane')
    expect(panes[0].attributes('style') ?? '').not.toContain('display: none')
    expect(panes[1].attributes('style')).toContain('display: none')
    expect(panes[0].text()).toBe('水果内容')
  })

  it('switches pane on click and emits update:modelValue and change', async () => {
    const onUpdate = vi.fn()
    const onChange = vi.fn()
    const wrapper = mount({
      components: { Tabs, TabPane },
      setup() {
        return { onUpdate, onChange }
      },
      template: `
        <Tabs @update:model-value="onUpdate" @change="onChange">
          <TabPane title="水果">水果内容</TabPane>
          <TabPane title="蔬菜" name="vegetable">蔬菜内容</TabPane>
        </Tabs>
      `,
    })
    await nextTick()
    await wrapper.findAll('.mt-tabs__item')[1].trigger('click')
    expect(onUpdate).toHaveBeenCalledWith('vegetable')
    expect(onChange).toHaveBeenCalledWith('vegetable')
  })

  it('does not select a disabled pane', async () => {
    const onChange = vi.fn()
    const wrapper = mount({
      components: { Tabs, TabPane },
      setup() {
        return { onChange }
      },
      template: `
        <Tabs @change="onChange">
          <TabPane title="水果">水果内容</TabPane>
          <TabPane title="禁用" disabled>禁用内容</TabPane>
        </Tabs>
      `,
    })
    await nextTick()
    const disabledItem = wrapper.findAll('.mt-tabs__item')[1]
    expect(disabledItem.classes()).toContain('mt-tabs__item--disabled')
    await disabledItem.trigger('click')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('activates the pane matched by v-model', async () => {
    const active = ref<number | string>(0)
    const wrapper = mount({
      components: { Tabs, TabPane },
      setup() {
        return { active }
      },
      template: `
        <Tabs v-model="active">
          <TabPane title="水果">水果内容</TabPane>
          <TabPane title="蔬菜" name="vegetable">蔬菜内容</TabPane>
        </Tabs>
      `,
    })
    active.value = 'vegetable'
    await wrapper.vm.$nextTick()
    const panes = wrapper.findAll('.mt-tab-pane')
    expect(panes[0].attributes('style')).toContain('display: none')
    expect(panes[1].attributes('style') ?? '').not.toContain('display: none')
    expect(wrapper.findAll('.mt-tabs__item')[1].classes()).toContain('mt-tabs__item--active')
  })

  it('positions the line indicator under the active item', async () => {
    const wrapper = mountTabs()
    await nextTick()
    const line = wrapper.find('.mt-tabs__line')
    expect(line.attributes('style')).toContain('width: 33.3333')
    expect(line.attributes('style')).toContain('translateX(0%)')

    await wrapper.findAll('.mt-tabs__item')[1].trigger('click')
    expect(line.attributes('style')).toContain('translateX(100%)')
  })

  it('supports card type without the line indicator', async () => {
    const wrapper = mountTabs('type="card"')
    await nextTick()
    expect(wrapper.find('.mt-tabs').classes()).toContain('mt-tabs--card')
    expect(wrapper.find('.mt-tabs__line').exists()).toBe(false)
  })
})
