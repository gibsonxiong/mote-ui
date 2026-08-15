import { computed, inject, ref, type ComputedRef, type InjectionKey } from 'vue'
import zhCN from './lang/zh-CN'
import type { MtLocaleMessages } from './types'

export const mtLocaleKey: InjectionKey<ComputedRef<MtLocaleMessages | undefined>> =
  Symbol('mt-locale')

const globalLocale = ref<MtLocaleMessages>(zhCN)

/**
 * Replaces the global locale. Imperative APIs (confirmDialog, alertDialog, ...)
 * and components rendered outside a ConfigProvider always read the global
 * locale.
 */
export function setLocale(locale: MtLocaleMessages): void {
  globalLocale.value = locale
}

/** Returns the current global locale messages. */
export function getLocale(): MtLocaleMessages {
  return globalLocale.value
}

function resolve(messages: MtLocaleMessages, path: string): string {
  const value = path
    .split('.')
    .reduce<unknown>(
      (acc, key) => (acc as Record<string, unknown> | undefined)?.[key],
      messages,
    )
  return typeof value === 'string' ? value : ''
}

/** Looks up a message path against the current global locale. */
export function translate(path: string): string {
  return resolve(globalLocale.value, path)
}

/** Replaces `{key}` placeholders in a message template with values. */
export function format(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  )
}

/**
 * Component-level locale access. Reads the locale injected by the nearest
 * ConfigProvider, falling back to the global locale.
 */
export function useLocale() {
  const injected = inject(mtLocaleKey, null)
  const locale = computed<MtLocaleMessages>(() => injected?.value ?? globalLocale.value)
  const t = (path: string): string => resolve(locale.value, path)
  return { locale, t }
}

export { zhCN }
export { default as enUS } from './lang/en-US'
export type { MtLocaleMessages } from './types'
