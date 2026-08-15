import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Steps from './steps.vue'
import Step from './step.vue'

function mountSteps(extraProps = '') {
  return mount({
    components: { Steps, Step },
    template: `
      <Steps ${extraProps}>
        <Step title="第一步" description="准备材料" />
        <Step title="第二步" description="开始制作" />
        <Step title="第三步" description="完成交付" />
      </Steps>
    `,
  })
}

describe('MtSteps', () => {
  it('renders all steps and marks the first one as process by default', async () => {
    const wrapper = mountSteps()
    await nextTick()
    const steps = wrapper.findAll('.mt-step')
    expect(steps).toHaveLength(3)
    expect(steps[0].classes()).toContain('mt-step--process')
    expect(steps[1].classes()).toContain('mt-step--waiting')
    expect(steps[2].classes()).toContain('mt-step--waiting')
    expect(steps[0].find('.mt-step__title').text()).toBe('第一步')
    expect(steps[0].find('.mt-step__description').text()).toBe('准备材料')
    expect(steps[0].find('.mt-step__circle').text()).toBe('1')
  })

  it('marks earlier steps as finished with a check icon', async () => {
    const wrapper = mountSteps(':active="2"')
    await nextTick()
    const steps = wrapper.findAll('.mt-step')
    expect(steps[0].classes()).toContain('mt-step--finished')
    expect(steps[1].classes()).toContain('mt-step--finished')
    expect(steps[2].classes()).toContain('mt-step--process')
    expect(steps[0].find('.mt-step__check .mt-icon').exists()).toBe(true)
    expect(steps[0].find('.mt-step__circle').exists()).toBe(false)
  })

  it('marks all steps as finished when active exceeds the count', async () => {
    const wrapper = mountSteps(':active="3"')
    await nextTick()
    wrapper.findAll('.mt-step').forEach((step) => {
      expect(step.classes()).toContain('mt-step--finished')
    })
  })

  it('applies the direction modifier', async () => {
    const wrapper = mountSteps('direction="vertical"')
    await nextTick()
    expect(wrapper.find('.mt-steps').classes()).toContain('mt-steps--vertical')
  })

  it('updates statuses when the active prop changes', async () => {
    const wrapper = mount({
      components: { Steps, Step },
      data: () => ({ active: 0 }),
      template: `
        <Steps :active="active">
          <Step title="第一步" />
          <Step title="第二步" />
        </Steps>
      `,
    })
    await nextTick()
    const [first, second] = wrapper.findAll('.mt-step')
    expect(first.classes()).toContain('mt-step--process')
    await wrapper.setData({ active: 1 })
    expect(first.classes()).toContain('mt-step--finished')
    expect(second.classes()).toContain('mt-step--process')
  })

  it('supports title and description slots', async () => {
    const wrapper = mount({
      components: { Steps, Step },
      template: `
        <Steps>
          <Step>
            <template #title>自定义标题</template>
            <template #description>自定义描述</template>
          </Step>
        </Steps>
      `,
    })
    await nextTick()
    expect(wrapper.find('.mt-step__title').text()).toBe('自定义标题')
    expect(wrapper.find('.mt-step__description').text()).toBe('自定义描述')
  })
})
