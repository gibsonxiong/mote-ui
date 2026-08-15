import type { InjectionKey } from 'vue'

export type MtTabsValue = number | string

export type MtTabsType = 'line' | 'card'

export interface MtTabsProps {
  /** Value of the active pane (pane `name` or its index) */
  modelValue?: MtTabsValue
  /** Style of the tab header */
  type?: MtTabsType
}

export interface MtTabPaneProps {
  /** Unique identifier; defaults to the pane index */
  name?: MtTabsValue
  title?: string
  disabled?: boolean
}

export interface MtTabPaneContext {
  name: MtTabsValue
  title?: string
  disabled: boolean
}

export interface MtTabsContext {
  currentName: MtTabsValue | undefined
  isActive: (name: MtTabsValue) => boolean
  register: (pane: MtTabPaneContext) => number
  unregister: (pane: MtTabPaneContext) => void
  select: (value: MtTabsValue) => void
}

export const tabsKey: InjectionKey<MtTabsContext> = Symbol('MtTabs')
