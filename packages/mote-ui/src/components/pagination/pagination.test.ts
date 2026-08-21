import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from './pagination.vue'

describe('MtPagination', () => {
  it('derives the page count from totalItems and itemsPerPage', () => {
    const wrapper = mount(Pagination, {
      props: { totalItems: 50, itemsPerPage: 10 },
    })
    const pages = wrapper.findAll('.mt-pagination__item:not(.mt-pagination__prev):not(.mt-pagination__next)')
    expect(pages).toHaveLength(5)
  })

  it('prefers an explicit pageCount', () => {
    const wrapper = mount(Pagination, {
      props: { pageCount: 3, totalItems: 50, itemsPerPage: 10 },
    })
    const pages = wrapper.findAll('.mt-pagination__item:not(.mt-pagination__prev):not(.mt-pagination__next)')
    expect(pages).toHaveLength(3)
  })

  it('emits update:modelValue and change when a page is clicked', async () => {
    const onUpdate = vi.fn()
    const onChange = vi.fn()
    const wrapper = mount(Pagination, {
      props: { pageCount: 5, modelValue: 1, 'onUpdate:modelValue': onUpdate, onChange },
    })
    const pages = wrapper.findAll('.mt-pagination__item:not(.mt-pagination__prev):not(.mt-pagination__next)')
    await pages[2].trigger('click')
    expect(onUpdate).toHaveBeenCalledWith(3)
    expect(onChange).toHaveBeenCalledWith(3)
  })

  it('disables prev on the first page and next on the last page', async () => {
    const first = mount(Pagination, { props: { pageCount: 3, modelValue: 1 } })
    expect(first.find('.mt-pagination__prev').attributes('disabled')).toBeDefined()
    expect(first.find('.mt-pagination__next').attributes('disabled')).toBeUndefined()

    const last = mount(Pagination, { props: { pageCount: 3, modelValue: 3 } })
    expect(last.find('.mt-pagination__next').attributes('disabled')).toBeDefined()
    expect(last.find('.mt-pagination__prev').attributes('disabled')).toBeUndefined()
  })

  it('renders current/total in simple mode', () => {
    const wrapper = mount(Pagination, {
      props: { mode: 'simple', pageCount: 8, modelValue: 3 },
    })
    expect(wrapper.find('.mt-pagination__page--current').text()).toBe('3')
    expect(wrapper.find('.mt-pagination__separator').exists()).toBe(true)
  })

  it('renders ellipses for a long page list', () => {
    const wrapper = mount(Pagination, {
      props: { pageCount: 20, modelValue: 10 },
    })
    expect(wrapper.findAll('.mt-pagination__ellipsis').length).toBeGreaterThan(0)
  })

  it('renders the custom prev/next text', () => {
    const wrapper = mount(Pagination, {
      props: { pageCount: 3, prevText: '上一页', nextText: '下一页' },
    })
    expect(wrapper.find('.mt-pagination__prev').text()).toBe('上一页')
    expect(wrapper.find('.mt-pagination__next').text()).toBe('下一页')
  })
})