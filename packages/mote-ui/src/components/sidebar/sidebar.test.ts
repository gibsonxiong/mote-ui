import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import Sidebar from './sidebar.vue'
import SidebarItem from './sidebar-item.vue'

function mountSidebar(modelValue?: number | string) {
  return mount({
    components: { Sidebar, SidebarItem },
    setup() {
      return { modelValue }
    },
    template: `
      <Sidebar :model-value="modelValue">
        <SidebarItem title="标签一" />
        <SidebarItem title="标签二" name="tab2" />
        <SidebarItem title="禁用" disabled />
      </Sidebar>
    `,
  })
}

describe('MtSidebar', () => {
  it('activates the first item by default', () => {
    const wrapper = mountSidebar()
    const items = wrapper.findAll('.mt-sidebar-item')
    expect(items[0].classes()).toContain('mt-sidebar-item--active')
    expect(items[1].classes()).not.toContain('mt-sidebar-item--active')
  })

  it('activates the item matched by modelValue (name or index)', () => {
    const byName = mountSidebar('tab2')
    expect(byName.findAll('.mt-sidebar-item')[1].classes()).toContain('mt-sidebar-item--active')

    const byIndex = mountSidebar(2)
    expect(byIndex.findAll('.mt-sidebar-item')[2].classes()).toContain('mt-sidebar-item--active')
  })

  it('emits update:modelValue and change on click', async () => {
    const onUpdate = vi.fn()
    const onChange = vi.fn()
    const wrapper = mount({
      components: { Sidebar, SidebarItem },
      setup() {
        return { onUpdate, onChange }
      },
      template: `
        <Sidebar @update:model-value="onUpdate" @change="onChange">
          <SidebarItem title="标签一" />
          <SidebarItem title="标签二" name="tab2" />
        </Sidebar>
      `,
    })
    await wrapper.findAll('.mt-sidebar-item')[1].trigger('click')
    expect(onUpdate).toHaveBeenCalledWith('tab2')
    expect(onChange).toHaveBeenCalledWith('tab2')
  })

  it('does not select a disabled item', async () => {
    const onChange = vi.fn()
    const wrapper = mount({
      components: { Sidebar, SidebarItem },
      setup() {
        return { onChange }
      },
      template: `
        <Sidebar @change="onChange">
          <SidebarItem title="标签一" />
          <SidebarItem title="禁用" disabled />
        </Sidebar>
      `,
    })
    await wrapper.findAll('.mt-sidebar-item')[1].trigger('click')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('renders badge text capped at 99+ and dot', () => {
    const wrapper = mount({
      components: { Sidebar, SidebarItem },
      template: `
        <Sidebar>
          <SidebarItem title="消息" :badge="120" />
          <SidebarItem title="动态" dot />
        </Sidebar>
      `,
    })
    expect(wrapper.find('.mt-sidebar-item__badge').text()).toBe('99+')
    expect(wrapper.find('.mt-sidebar-item__dot').exists()).toBe(true)
  })

  it('updates active state when v-model changes', async () => {
    const active = ref<number | string>(0)
    const wrapper = mount({
      components: { Sidebar, SidebarItem },
      setup() {
        return { active }
      },
      template: `
        <Sidebar v-model="active">
          <SidebarItem title="标签一" />
          <SidebarItem title="标签二" name="tab2" />
        </Sidebar>
      `,
    })
    active.value = 'tab2'
    await wrapper.vm.$nextTick()
    const items = wrapper.findAll('.mt-sidebar-item')
    expect(items[0].classes()).not.toContain('mt-sidebar-item--active')
    expect(items[1].classes()).toContain('mt-sidebar-item--active')
  })
})