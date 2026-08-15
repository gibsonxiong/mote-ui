import { describe, it, expect, afterEach } from 'vitest'
import { MtToast, showToast, clearToast } from './toast'

// Vue captures the native requestAnimationFrame at module load, so fake
// timers cannot drive test-mode transitions; use real timers with short
// durations instead.
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

describe('MtToast', () => {
  afterEach(() => {
    clearToast()
    document.body.innerHTML = ''
  })

  it('shows a text toast', () => {
    showToast('hello')
    expect(document.body.textContent).toContain('hello')
    expect(document.body.querySelector('.mt-toast')).toBeTruthy()
  })

  it('auto closes after the given duration', async () => {
    showToast({ message: 'bye', duration: 50 })
    await wait(400)
    expect(document.body.querySelector('.mt-toast')).toBeNull()
  })

  it('keeps the toast when duration is 0', async () => {
    showToast({ message: 'stay', duration: 0 })
    await wait(100)
    expect(document.body.querySelector('.mt-toast')).toBeTruthy()
  })

  it('renders icon variants with icon class', () => {
    MtToast.success('done')
    expect(document.body.querySelector('.mt-toast--with-icon')).toBeTruthy()
  })

  it('loading persists until cleared', async () => {
    MtToast.loading('wait')
    await wait(100)
    expect(document.body.querySelector('.mt-toast')).toBeTruthy()
    clearToast()
    await wait(400)
    expect(document.body.querySelector('.mt-toast')).toBeNull()
  })

  it('supports positions', () => {
    showToast({ message: 'top', position: 'top' })
    expect(document.body.querySelector('.mt-toast--top')).toBeTruthy()
  })
})
