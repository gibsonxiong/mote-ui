import { MtToast as MtToastApi, showToast as showToastFn, clearToast as clearToastFn } from './toast'

export const MtToast = MtToastApi
export const showToast = showToastFn
export const clearToast = clearToastFn

export * from './types'
