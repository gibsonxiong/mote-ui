import { h, render } from 'vue'
import MtToastComponent from './toast.vue'
import type { MtToastApi, MtToastOptions, MtToastPosition, MtToastType } from './types'

interface ToastState {
  visible: boolean
  message: string
  type: MtToastType
  position: MtToastPosition
  overlay: boolean
}

const state: ToastState = {
  visible: false,
  message: '',
  type: 'text',
  position: 'middle',
  overlay: false,
}

let container: HTMLElement | null = null
let timer: ReturnType<typeof setTimeout> | undefined

function renderToast() {
  if (!container || !container.isConnected) {
    container = document.createElement('div')
    document.body.appendChild(container)
  }
  render(h(MtToastComponent, { ...state }), container)
}

export function showToast(options: MtToastOptions | string = {}): void {
  const opts = typeof options === 'string' ? { message: options } : options
  state.visible = true
  state.message = opts.message ?? ''
  state.type = opts.type ?? 'text'
  state.position = opts.position ?? 'middle'
  state.overlay = opts.overlay ?? false
  renderToast()

  if (timer) clearTimeout(timer)
  const duration = opts.duration ?? (state.type === 'loading' ? 0 : 2000)
  if (duration > 0) {
    timer = setTimeout(() => {
      clearToast()
    }, duration)
  }
}

export function clearToast(): void {
  if (timer) {
    clearTimeout(timer)
    timer = undefined
  }
  state.visible = false
  renderToast()
}

export const MtToast: MtToastApi = {
  show: showToast,
  text: (message) => showToast({ message }),
  success: (message) => showToast({ message, type: 'success' }),
  fail: (message) => showToast({ message, type: 'fail' }),
  loading: (message = '') => showToast({ message, type: 'loading', duration: 0 }),
  clear: clearToast,
}
