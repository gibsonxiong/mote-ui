import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import MtUploader from './uploader.vue'

function setInputFiles(wrapper: ReturnType<typeof mount>, files: File[]) {
  const input = wrapper.find('input[type="file"]').element as HTMLInputElement
  Object.defineProperty(input, 'files', { value: files, configurable: true })
}

// FileReader fires `load` as a macrotask, which flushPromises alone cannot await.
async function waitForFileRead() {
  await new Promise((resolve) => setTimeout(resolve, 20))
  await flushPromises()
}

describe('MtUploader', () => {
  it('renders the trigger with localized text', () => {
    const wrapper = mount(MtUploader)
    expect(wrapper.find('.mt-uploader__trigger').exists()).toBe(true)
    expect(wrapper.find('.mt-uploader__trigger-text').text()).toBe('上传文件')
  })

  it('hides the trigger when disabled', () => {
    const wrapper = mount(MtUploader, { props: { disabled: true } })
    expect(wrapper.find('.mt-uploader__trigger').exists()).toBe(false)
  })

  it('hides the trigger once max-count is reached', () => {
    const wrapper = mount(MtUploader, {
      props: { modelValue: [{ url: 'a.png', status: 'done' }], maxCount: 1 },
    })
    expect(wrapper.find('.mt-uploader__trigger').exists()).toBe(false)
  })

  it('reads selected image files into the list', async () => {
    const wrapper = mount(MtUploader)
    setInputFiles(wrapper, [new File(['mote'], 'logo.png', { type: 'image/png' })])
    await wrapper.find('input[type="file"]').trigger('change')
    await waitForFileRead()
    const emitted = wrapper.emitted('update:modelValue')?.[0]?.[0] as Array<{
      url?: string
      status?: string
    }>
    expect(emitted).toHaveLength(1)
    expect(emitted[0].url).toMatch(/^data:/)
    expect(emitted[0].status).toBe('done')
  })

  it('keeps non-image files as name entries', async () => {
    const wrapper = mount(MtUploader, { props: { accept: '*' } })
    setInputFiles(wrapper, [new File(['mote'], 'notes.txt', { type: 'text/plain' })])
    await wrapper.find('input[type="file"]').trigger('change')
    await flushPromises()
    const emitted = wrapper.emitted('update:modelValue')?.[0]?.[0] as Array<{
      url?: string
      name?: string
    }>
    expect(emitted[0].url).toBeUndefined()
    expect(emitted[0].name).toBe('notes.txt')
    expect(wrapper.emitted('oversize')).toBeUndefined()
  })

  it('emits oversize and skips files above max-size', async () => {
    const wrapper = mount(MtUploader, { props: { maxSize: 4 } })
    setInputFiles(wrapper, [new File(['0123456789'], 'big.png', { type: 'image/png' })])
    await wrapper.find('input[type="file"]').trigger('change')
    await flushPromises()
    expect(wrapper.emitted('oversize')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('caps the selection at max-count', async () => {
    const wrapper = mount(MtUploader, { props: { multiple: true, maxCount: 1 } })
    setInputFiles(wrapper, [
      new File(['a'], 'a.png', { type: 'image/png' }),
      new File(['b'], 'b.png', { type: 'image/png' }),
    ])
    await wrapper.find('input[type="file"]').trigger('change')
    await waitForFileRead()
    const emitted = wrapper.emitted('update:modelValue')?.[0]?.[0] as unknown[]
    expect(emitted).toHaveLength(1)
  })

  it('cancels when before-read returns false', async () => {
    const wrapper = mount(MtUploader, { props: { beforeRead: () => false } })
    setInputFiles(wrapper, [new File(['mote'], 'logo.png', { type: 'image/png' })])
    await wrapper.find('input[type="file"]').trigger('change')
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('marks files as failed when after-read rejects', async () => {
    const wrapper = mount(MtUploader, {
      props: { afterRead: () => Promise.reject(new Error('boom')) },
    })
    setInputFiles(wrapper, [new File(['mote'], 'logo.png', { type: 'image/png' })])
    await wrapper.find('input[type="file"]').trigger('change')
    await waitForFileRead()
    const updates = wrapper.emitted('update:modelValue')
    const last = updates?.[updates.length - 1]?.[0] as Array<{ status?: string; message?: string }>
    expect(last[0].status).toBe('failed')
    expect(last[0].message).toBe('上传失败')
  })

  it('deletes a preview item', async () => {
    const wrapper = mount(MtUploader, {
      props: { modelValue: [{ url: 'a.png', status: 'done' }, { url: 'b.png', status: 'done' }] },
    })
    await wrapper.findAll('.mt-uploader__delete')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[{ url: 'a.png', status: 'done' }]])
    expect(wrapper.emitted('delete')?.[0]).toEqual([{ url: 'b.png', status: 'done' }, 1])
  })

  it('hides delete buttons in readonly mode', () => {
    const wrapper = mount(MtUploader, {
      props: { modelValue: [{ url: 'a.png', status: 'done' }], readonly: true },
    })
    expect(wrapper.find('.mt-uploader__delete').exists()).toBe(false)
  })
})
