import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import MtImagePreview from './image-preview.vue'
import MtSwipe from '../swipe/swipe.vue'

const images = ['https://example.com/a.jpg', 'https://example.com/b.jpg', 'https://example.com/c.jpg']

describe('MtImagePreview', () => {
  it('renders nothing while show is false', () => {
    const wrapper = mount(MtImagePreview, { props: { images } })
    expect(wrapper.find('.mt-image-preview').exists()).toBe(false)
  })

  it('renders all images and the index indicator', () => {
    const wrapper = mount(MtImagePreview, { props: { show: true, images } })
    const slides = wrapper.findAll('.mt-image-preview__slide')
    expect(slides).toHaveLength(3)
    expect((slides[0].find('img').element as HTMLImageElement).src).toBe(images[0])
    expect(wrapper.find('.mt-image-preview__index').text()).toBe('1 / 3')
  })

  it('starts at startPosition', () => {
    const wrapper = mount(MtImagePreview, {
      props: { show: true, images, startPosition: 2 },
    })
    expect(wrapper.find('.mt-image-preview__index').text()).toBe('3 / 3')
    expect(wrapper.findComponent(MtSwipe).props('modelValue')).toBe(2)
  })

  it('updates the index when the swipe changes', async () => {
    const wrapper = mount(MtImagePreview, { props: { show: true, images } })
    wrapper.findComponent(MtSwipe).vm.$emit('update:modelValue', 1)
    await nextTick()
    expect(wrapper.find('.mt-image-preview__index').text()).toBe('2 / 3')
    expect(wrapper.emitted('change')?.[0]).toEqual([1])
  })

  it('closes when tapping the overlay', async () => {
    const wrapper = mount(MtImagePreview, { props: { show: true, images } })
    await wrapper.find('.mt-image-preview').trigger('click')
    expect(wrapper.emitted('update:show')?.[0]).toEqual([false])
    expect(wrapper.emitted('close')?.[0]).toEqual([0])
  })

  it('keeps open when closeOnOverlay is false', async () => {
    const wrapper = mount(MtImagePreview, {
      props: { show: true, images, closeOnOverlay: false },
    })
    await wrapper.find('.mt-image-preview').trigger('click')
    expect(wrapper.emitted('update:show')).toBeUndefined()
  })

  it('closes from the close button without triggering the overlay handler', async () => {
    const wrapper = mount(MtImagePreview, {
      props: { show: true, images, closeable: true },
    })
    await wrapper.find('.mt-image-preview__close').trigger('click')
    // click.stop prevents a duplicated close from the overlay listener
    expect(wrapper.emitted('update:show')).toHaveLength(1)
    expect(wrapper.emitted('update:show')?.[0]).toEqual([false])
  })

  it('resets to startPosition when reopened', async () => {
    const wrapper = mount(MtImagePreview, {
      props: { show: true, images, startPosition: 1 },
    })
    wrapper.findComponent(MtSwipe).vm.$emit('update:modelValue', 2)
    await nextTick()
    await wrapper.setProps({ show: false })
    await wrapper.setProps({ show: true })
    expect(wrapper.find('.mt-image-preview__index').text()).toBe('2 / 3')
  })

  it('hides the index indicator when showIndex is false', () => {
    const wrapper = mount(MtImagePreview, {
      props: { show: true, images, showIndex: false },
    })
    expect(wrapper.find('.mt-image-preview__index').exists()).toBe(false)
  })
})
