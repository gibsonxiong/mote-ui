import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MtNotifyComponent from './notify.vue'
import { MtNotify, showNotify, closeNotify } from './notify'

// Vue captures the native requestAnimationFrame at module load, so fake
// timers cannot drive test-mode transitions; use real timers with short
// durations instead.
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

describe('MtNotify', () => {
  afterEach(() => {
    closeNotify()
    document.body.innerHTML = ''
  })

  it('shows a danger notify by default', () => {
    showNotify('出错了')
    const el = document.body.querySelector('.mt-notify')
    expect(el).toBeTruthy()
    expect(el?.classList.contains('mt-notify--danger')).toBe(true)
    expect(document.body.textContent).toContain('出错了')
  })

  it('auto closes after the given duration', async () => {
    showNotify({ message: 'bye', duration: 50 })
    await wait(400)
    expect(document.body.querySelector('.mt-notify')).toBeNull()
  })

  it('renders typed variants', () => {
    MtNotify.success('保存成功')
    expect(document.body.querySelector('.mt-notify--success')).toBeTruthy()
  })

  it('keeps the notify when duration is 0 until closed', async () => {
    showNotify({ message: 'stay', type: 'warning', duration: 0 })
    await wait(100)
    expect(document.body.querySelector('.mt-notify')).toBeTruthy()
    closeNotify()
    await wait(400)
    expect(document.body.querySelector('.mt-notify')).toBeNull()
  })

  it('renders through v-model in component form', async () => {
    const wrapper = mount(MtNotifyComponent, {
      props: { modelValue: true, message: '组件形式', type: 'success' },
    })
    expect(wrapper.find('.mt-notify--success').text()).toBe('组件形式')
    await wrapper.setProps({ modelValue: false })
    await wait(400)
    expect(wrapper.find('.mt-notify').exists()).toBe(false)
  })

  it('defaults to z-index 3000', () => {
    showNotify('默认层级')
    const el = document.body.querySelector('.mt-notify') as HTMLElement
    expect(el.getAttribute('style')).toContain('z-index: 3000')
  })

  it('applies a custom z-index', () => {
    showNotify({ message: '自定义层级', zIndex: 9999 })
    const el = document.body.querySelector('.mt-notify') as HTMLElement
    expect(el.getAttribute('style')).toContain('z-index: 9999')
  })
})
