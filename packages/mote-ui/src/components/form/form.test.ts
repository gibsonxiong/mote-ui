import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { defineComponent, h, reactive } from 'vue'
import MtForm from './form.vue'
import MtFormItem from './form-item.vue'
import MtField from '../field/field.vue'
import { validateRules } from './validator'

interface MtFormVm {
  validate: () => Promise<boolean>
  validateField: (prop: string) => Promise<boolean>
  resetFields: () => void
  clearValidate: () => void
}

function getFormVm(wrapper: { findComponent: (c: unknown) => { vm: unknown } }): MtFormVm {
  return wrapper.findComponent(MtForm).vm as MtFormVm
}

function mountForm(model: Record<string, unknown>, rules: Record<string, unknown>) {
  return mount(
    defineComponent({
      setup() {
        const state = reactive(model)
        return () =>
          h(
            MtForm,
            { model: state, rules: rules as never },
            () =>
              h(
                MtFormItem,
                { prop: 'name', label: '姓名' },
                () =>
                  h(MtField, {
                    modelValue: state.name as string,
                    'onUpdate:modelValue': (v: string) => (state.name = v),
                  }),
              ),
          )
      },
    }),
  )
}

describe('MtForm validation', () => {
  it('rejects when a required field is empty', async () => {
    const wrapper = mountForm({ name: '' }, { name: { required: true, message: '请输入姓名' } })
    await flushPromises()
    const form = getFormVm(wrapper)
    let rejected: Record<string, string> | null = null
    await form.validate().catch((errors: Record<string, string>) => {
      rejected = errors
    })
    await flushPromises()
    expect(rejected).toEqual({ name: '请输入姓名' })
    expect(wrapper.find('.mt-form-item__error').text()).toBe('请输入姓名')
  })

  it('resolves when rules pass', async () => {
    const wrapper = mountForm({ name: 'mote' }, { name: { required: true } })
    await flushPromises()
    const form = getFormVm(wrapper)
    await expect(form.validate()).resolves.toBe(true)
  })

  it('validates min length', async () => {
    const wrapper = mountForm(
      { name: 'ab' },
      { name: { min: 3, message: '太短了' } },
    )
    await flushPromises()
    const form = getFormVm(wrapper)
    let rejected: Record<string, string> | null = null
    await form.validate().catch((errors: Record<string, string>) => {
      rejected = errors
    })
    expect(rejected).toEqual({ name: '太短了' })
  })

  it('resetFields restores the initial value', async () => {
    const wrapper = mountForm({ name: 'initial' }, { name: { required: true } })
    await flushPromises()
    const form = getFormVm(wrapper)
    await wrapper.find('input').setValue('changed')
    await flushPromises()
    form.resetFields()
    await flushPromises()
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('initial')
  })

  it('supports custom async validators', async () => {
    await expect(
      validateRules(
        [
          {
            validator: async () => {
              throw new Error('自定义错误')
            },
          },
        ],
        'anything',
      ),
    ).rejects.toThrow('自定义错误')
  })

  it('respects trigger filtering', async () => {
    await expect(
      validateRules([{ required: true, trigger: 'blur', message: '必填' }], '', 'change'),
    ).resolves.toBeUndefined()
    await expect(
      validateRules([{ required: true, trigger: 'blur', message: '必填' }], '', 'blur'),
    ).rejects.toThrow('必填')
  })
})
