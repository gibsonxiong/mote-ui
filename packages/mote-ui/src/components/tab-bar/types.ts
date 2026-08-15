import type { InjectionKey } from 'vue'
import type { MtIconName } from '../icon/types'

export type MtTabBarValue = number | string

export interface MtTabBarProps {
  /** Value of the active item (item `name` or its index) */
  modelValue?: MtTabBarValue
  /** Fixed to the bottom of the page */
  fixed?: boolean
  /** Render a placeholder to occupy height when fixed */
  placeholder?: boolean
  /** Show top border */
  border?: boolean
  /** Inset safe area at the bottom (for home-indicator devices) */
  safeAreaInsetBottom?: boolean
  zIndex?: number
}

export interface MtTabBarItemProps {
  /** Unique identifier; defaults to the item index */
  name?: MtTabBarValue
  title?: string
  /** Built-in icon name */
  icon?: MtIconName | (string & {})
  /** Badge value; numbers above 99 render as `99+` */
  badge?: number | string
  /** Show a red dot instead of a badge */
  dot?: boolean
  disabled?: boolean
}

export interface MtTabBarContext {
  modelValue?: MtTabBarValue
  register: (item: object) => number
  unregister: (item: object) => void
  select: (value: MtTabBarValue) => void
}

export const tabBarKey: InjectionKey<MtTabBarContext> = Symbol('MtTabBar')
