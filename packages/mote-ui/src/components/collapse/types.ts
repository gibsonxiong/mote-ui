import type { InjectionKey } from 'vue'

export type MtCollapseValue = number | string

export interface MtCollapseProps {
  /** Names of the expanded panels */
  modelValue?: MtCollapseValue[]
  /** Only one panel can stay expanded at a time */
  accordion?: boolean
}

export interface MtCollapseItemProps {
  /** Unique identifier; defaults to the item index */
  name?: MtCollapseValue
  title?: string
  disabled?: boolean
}

export interface MtCollapseItemContext {
  name: MtCollapseValue
}

export interface MtCollapseContext {
  isExpanded: (name: MtCollapseValue) => boolean
  toggle: (name: MtCollapseValue) => void
  register: (item: MtCollapseItemContext) => number
  unregister: (item: MtCollapseItemContext) => void
}

export const collapseKey: InjectionKey<MtCollapseContext> = Symbol('MtCollapse')
