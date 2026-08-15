import { h, render } from 'vue'
import MtNotifyComponent from './notify.vue'
import type { MtNotifyApi, MtNotifyOptions, MtNotifyType } from './types'

interface NotifyState {
  visible: boolean
  message: string
  type: MtNotifyType
}

const state: NotifyState = {
  visible: false,
  message: '',
  type: 'danger',
}

let container: HTMLElement | null = null
let timer: ReturnType<typeof setTimeout> | undefined

function renderNotify() {
  if (!container || !container.isConnected) {
    container = document.createElement('div')
    document.body.appendChild(container)
  }
  render(h(MtNotifyComponent, { ...state }), container)
}

export function showNotify(options: MtNotifyOptions | string = {}): void {
  const opts = typeof options === 'string' ? { message: options } : options
  state.visible = true
  state.message = opts.message ?? ''
  state.type = opts.type ?? 'danger'
  renderNotify()

  if (timer) clearTimeout(timer)
  const duration = opts.duration ?? 3000
  if (duration > 0) {
    timer = setTimeout(() => {
      closeNotify()
    }, duration)
  }
}

export function closeNotify(): void {
  if (timer) {
    clearTimeout(timer)
    timer = undefined
  }
  state.visible = false
  renderNotify()
}

export const MtNotify: MtNotifyApi = {
  show: showNotify,
  primary: (message) => showNotify({ message, type: 'primary' }),
  success: (message) => showNotify({ message, type: 'success' }),
  warning: (message) => showNotify({ message, type: 'warning' }),
  danger: (message) => showNotify({ message, type: 'danger' }),
  close: closeNotify,
}
