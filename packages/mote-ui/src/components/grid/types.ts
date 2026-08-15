import type { InjectionKey } from 'vue'

export interface MtGridProps {
  /** Number of columns */
  columnNum?: number
  /** Force each item into a square */
  square?: boolean
  /** Show hairline borders between items */
  border?: boolean
  /** Center item content */
  center?: boolean
}

export interface MtGridItemProps {
  /** Built-in icon name shown above the text */
  icon?: string
  /** Text shown under the icon */
  text?: string
}

export interface MtGridContext {
  square: boolean
  border: boolean
  center: boolean
}

export const gridContextKey: InjectionKey<MtGridContext> = Symbol('mt-grid')
