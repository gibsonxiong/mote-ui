import type { InjectionKey } from 'vue'

export type MtDropdownValue = string | number

export interface MtDropdownOption {
  text: string
  value: MtDropdownValue
  /** Built-in icon name rendered via MtIcon */
  icon?: string
  disabled?: boolean
}

export interface MtDropdownMenuProps {
  /** Highlight color for active state */
  activeColor?: string
  /** Close the open dropdown when the overlay is clicked */
  closeOnClickOverlay?: boolean
  /** Overlay / dropdown transition duration in ms */
  duration?: number
  /** Show the dark overlay behind the dropdown */
  overlay?: boolean
  /** Direction the dropdown expands */
  direction?: 'down' | 'up'
  /** Base z-index (overlay uses it, dropdown uses zIndex + 1) */
  zIndex?: number
}

export interface MtDropdownItemProps {
  /** Value of the selected option */
  modelValue?: MtDropdownValue
  /** Title shown when no option is selected */
  title?: string
  options?: MtDropdownOption[]
  disabled?: boolean
}

export interface MtDropdownMenuContext {
  activeColor?: string
  closeOnClickOverlay: boolean
  duration: number
  overlay: boolean
  direction: 'down' | 'up'
  zIndex?: number
  /** Index of the currently open item, or -1 when all are closed */
  activeIndex: number
  register: (item: object) => number
  unregister: (item: object) => void
  toggle: (index: number) => void
  close: () => void
}

export const dropdownMenuKey: InjectionKey<MtDropdownMenuContext> = Symbol('MtDropdownMenu')