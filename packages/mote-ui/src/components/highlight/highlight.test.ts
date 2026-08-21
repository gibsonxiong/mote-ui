import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Highlight from './highlight.vue'

describe('MtHighlight', () => {
  it('wraps a matched keyword in a mark element', () => {
    const wrapper = mount(Highlight, { props: { text: 'Hello Mote World', keywords: 'mote' } })
    const marks = wrapper.findAll('mark.mt-highlight__mark')
    expect(marks).toHaveLength(1)
    expect(marks[0].text()).toBe('Mote')
  })

  it('highlights every occurrence of multiple keywords', () => {
    const wrapper = mount(Highlight, {
      props: { text: 'apple and banana and apple', keywords: ['apple', 'banana'] },
    })
    const marks = wrapper.findAll('mark.mt-highlight__mark')
    expect(marks.map((item) => item.text())).toEqual(['apple', 'banana', 'apple'])
  })

  it('is case-insensitive by default and case-sensitive when requested', () => {
    const insensitive = mount(Highlight, { props: { text: 'Mote mote', keywords: 'mote' } })
    expect(insensitive.findAll('mark').map((item) => item.text())).toEqual(['Mote', 'mote'])

    const sensitive = mount(Highlight, {
      props: { text: 'Mote mote', keywords: 'mote', caseSensitive: true },
    })
    expect(sensitive.findAll('mark').map((item) => item.text())).toEqual(['mote'])
  })

  it('applies a custom class and style to the highlighted snippets', () => {
    const wrapper = mount(Highlight, {
      props: {
        text: 'hi there',
        keywords: 'hi',
        highlightClass: 'custom',
        highlightStyle: { color: 'rgb(255, 0, 0)' },
      },
    })
    const mark = wrapper.find('mark')
    expect(mark.classes()).toContain('custom')
    expect(mark.attributes('style')).toContain('color: rgb(255, 0, 0)')
  })

  it('renders the default slot instead of the highlighted text', () => {
    const wrapper = mount(Highlight, {
      props: { text: 'ignored', keywords: 'x' },
      slots: { default: '<span class="slot">raw</span>' },
    })
    expect(wrapper.find('.slot').text()).toBe('raw')
    expect(wrapper.find('mark').exists()).toBe(false)
  })
})