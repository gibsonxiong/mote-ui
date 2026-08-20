import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Area from './area.vue'
import type { MtAreaList } from './types'

const areaList: MtAreaList = {
  province_list: {
    '330000': '浙江省',
    '320000': '江苏省',
  },
  city_list: {
    '330100': '杭州市',
    '330200': '宁波市',
    '320100': '南京市',
  },
  county_list: {
    '330106': '西湖区',
    '330108': '滨江区',
    '320102': '玄武区',
  },
}

describe('MtArea', () => {
  it('renders three columns from the area list', () => {
    const wrapper = mount(Area, { props: { areaList } })
    expect(wrapper.findAll('.mt-picker-column')).toHaveLength(3)
  })

  it('renders two columns when columnsNum is 2', () => {
    const wrapper = mount(Area, { props: { areaList, columnsNum: 2 } })
    expect(wrapper.findAll('.mt-picker-column')).toHaveLength(2)
  })

  it('uses the locale title by default', () => {
    const wrapper = mount(Area, { props: { areaList } })
    expect(wrapper.find('.mt-picker__title').text()).toBe('选择省市区')
  })

  it('restores the selected path from modelValue', () => {
    const wrapper = mount(Area, { props: { areaList, modelValue: '330106' } })
    const selected = wrapper.findAll('.mt-picker-column__option.is-selected')
    expect(selected.map((node) => node.text())).toEqual(['浙江省', '杭州市', '西湖区'])
  })

  it('emits confirm with the full region detail', async () => {
    const wrapper = mount(Area, { props: { areaList, modelValue: '330106' } })
    await wrapper.find('.mt-picker__confirm').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['330106'])
    expect(wrapper.emitted('confirm')?.[0]?.[0]).toEqual({
      code: '330106',
      province: '浙江省',
      city: '杭州市',
      county: '西湖区',
    })
  })

  it('emits cancel', async () => {
    const wrapper = mount(Area, { props: { areaList } })
    await wrapper.find('.mt-picker__cancel').trigger('click')
    expect(wrapper.emitted('cancel')).toHaveLength(1)
  })
})