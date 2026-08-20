export type MtTreeSelectId = string | number

export interface MtTreeSelectChild {
  /** Unique id of the content item */
  id: MtTreeSelectId
  /** Display text */
  text: string
  disabled?: boolean
}

export interface MtTreeSelectItem {
  /** Display text of the nav item */
  text: string
  /** Badge value shown on the nav item */
  badge?: string | number
  /** Render a dot instead of a text badge */
  dot?: boolean
  disabled?: boolean
  /** Content items shown when this nav item is active */
  children?: MtTreeSelectChild[]
}

export interface MtTreeSelectProps {
  /** Tree data: left nav items with nested content */
  items?: MtTreeSelectItem[]
  /** Selected content item id */
  activeId?: MtTreeSelectId
  /** Index of the active nav item */
  mainActiveIndex?: number
  /** Height of the selector; number is treated as px */
  height?: number | string
  /** When set, badge values above it are shown as `${max}+` */
  max?: number
}