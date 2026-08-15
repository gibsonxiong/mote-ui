import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import TabBar from './tab-bar.vue'
import TabBarItem from './tab-bar-item.vue'

function mountTabBar(modelValue?: number | string) {
  return mount({
    components: { TabBar, TabBarItem },
    setup() {
      return { modelValue }
    },
    template: `
      <TabBar :model-value="modelValue">
        <TabBarItem title="首页" />
        <TabBarItem title="我的" name="mine" />
        <TabBarItem title="禁用" disabled />
      </TabBar>
    `,
  })
}

describe('MtTabBar', () => {
  it('activates the first item by default', () => {
    const wrapper = mountTabBar()
    const items = wrapper.findAll('.mt-tab-bar-item')
    expect(items[0].classes()).toContain('mt-tab-bar-item--active')
    expect(items[1].classes()).not.toContain('mt-tab-bar-item--active')
  })

  it('activates the item matched by modelValue (name or index)', () => {
    const byName = mountTabBar('mine')
    expect(byName.findAll('.mt-tab-bar-item')[1].classes()).toContain('mt-tab-bar-item--active')

    const byIndex = mountTabBar(2)
    expect(byIndex.findAll('.mt-tab-bar-item')[2].classes()).toContain('mt-tab-bar-item--active')
  })

  it('emits update:modelValue and change on click', async () => {
    const onUpdate = vi.fn()
    const onChange = vi.fn()
    const wrapper = mount({
      components: { TabBar, TabBarItem },
      setup() {
        return { onUpdate, onChange }
      },
      template: `
        <TabBar @update:model-value="onUpdate" @change="onChange">
          <TabBarItem title="首页" />
          <TabBarItem title="我的" name="mine" />
        </TabBar>
      `,
    })
    await wrapper.findAll('.mt-tab-bar-item')[1].trigger('click')
    expect(onUpdate).toHaveBeenCalledWith('mine')
    expect(onChange).toHaveBeenCalledWith('mine')
  })

  it('does not select a disabled item', async () => {
    const onChange = vi.fn()
    const wrapper = mount({
      components: { TabBar, TabBarItem },
      setup() {
        return { onChange }
      },
      template: `
        <TabBar @change="onChange">
          <TabBarItem title="首页" />
          <TabBarItem title="禁用" disabled />
        </TabBar>
      `,
    })
    await wrapper.findAll('.mt-tab-bar-item')[1].trigger('click')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('renders badge text capped at 99+ and dot', () => {
    const wrapper = mount({
      components: { TabBar, TabBarItem },
      template: `
        <TabBar>
          <TabBarItem title="消息" :badge="120" />
          <TabBarItem title="动态" dot />
        </TabBar>
      `,
    })
    expect(wrapper.find('.mt-tab-bar-item__badge').text()).toBe('99+')
    expect(wrapper.find('.mt-tab-bar-item__dot').exists()).toBe(true)
  })

  it('renders fixed class and placeholder', () => {
    const wrapper = mount(TabBar, { props: { fixed: true, placeholder: true } })
    expect(wrapper.find('.mt-tab-bar').classes()).toContain('mt-tab-bar--fixed')
    expect(wrapper.find('.mt-tab-bar__placeholder').exists()).toBe(true)
  })

  it('updates active state when v-model changes', async () => {
    const active = ref<number | string>(0)
    const wrapper = mount({
      components: { TabBar, TabBarItem },
      setup() {
        return { active }
      },
      template: `
        <TabBar v-model="active">
          <TabBarItem title="首页" />
          <TabBarItem title="我的" name="mine" />
        </TabBar>
      `,
    })
    active.value = 'mine'
    await wrapper.vm.$nextTick()
    const items = wrapper.findAll('.mt-tab-bar-item')
    expect(items[0].classes()).not.toContain('mt-tab-bar-item--active')
    expect(items[1].classes()).toContain('mt-tab-bar-item--active')
  })
})
