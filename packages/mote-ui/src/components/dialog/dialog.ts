import { h, render } from 'vue'
import MtDialogComponent from './dialog.vue'
import type { MtDialogOptions } from './types'

let container: HTMLElement | null = null

function renderDialog(props: Record<string, unknown>) {
  if (!container || !container.isConnected) {
    container = document.createElement('div')
    document.body.appendChild(container)
  }
  render(h(MtDialogComponent, props), container)
}

function openDialog(
  options: MtDialogOptions & { showCancelButton: boolean },
): Promise<'confirm' | 'cancel'> {
  return new Promise((resolve) => {
    const close = () => renderDialog({ ...options, modelValue: false })
    renderDialog({
      ...options,
      modelValue: true,
      onConfirm: () => {
        close()
        resolve('confirm')
      },
      onCancel: () => {
        close()
        resolve('cancel')
      },
    })
  })
}

/**
 * Confirm dialog. Resolves when confirmed, rejects with `'cancel'` when
 * canceled (also rejected when the dialog is closed without confirmation).
 */
export function confirmDialog(options: MtDialogOptions | string = {}): Promise<void> {
  const opts = typeof options === 'string' ? { message: options } : options
  return openDialog({ showCancelButton: true, ...opts }).then((action) => {
    if (action === 'cancel') throw action
  })
}

/** Alert dialog (single confirm button). Always resolves. */
export function alertDialog(options: MtDialogOptions | string = {}): Promise<void> {
  const opts = typeof options === 'string' ? { message: options } : options
  return openDialog({ ...opts, showCancelButton: false }).then(() => {})
}
