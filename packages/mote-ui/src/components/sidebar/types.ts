import type { InjectionKey } from 'vue'

export type MtSidebarValue = number | string

export interface MtSidebarProps {
  /** Value of the active item (item `name` or its index) */
  modelValue?: MtSidebarValue
}

export interface MtSidebarItemProps {
  /** Unique identifier; defaults to the item index */
  name?: MtSidebarValue
  /** Display text */
  title?: string
  /** Badge value; numbers above 99 render as `99+` */
  badge?: number | string
  /** Show a red dot instead of a badge */
  dot?: boolean
  disabled?: boolean
}

export interface MtSidebarContext {
  modelValue?: MtSidebarValue
  register: (item: object) => number
  unregister: (item: object) => void
  select: (value: MtSidebarValue) => void
}

export const sidebarKey: InjectionKey<MtSidebarContext> = Symbol('MtSidebar')