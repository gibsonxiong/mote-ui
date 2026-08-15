import { describe, it, expect, afterEach } from 'vitest'
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
})
