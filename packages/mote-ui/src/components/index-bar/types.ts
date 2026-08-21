import type { InjectionKey } from 'vue'

export type MtIndexBarIndex = string | number

export interface MtIndexBarProps {
  /** Index character list; defaults to A-Z */
  indexList?: MtIndexBarIndex[]
  /** z-index of the sidebar and sticky headers */
  zIndex?: number
  /** Whether the anchor header sticks while scrolling */
  sticky?: boolean
  /** Sticky header offset from the top */
  stickyOffsetTop?: number
  /** Highlight color of the active index */
  highlightColor?: string
}

export interface MtIndexAnchorProps {
  /** Index character of the anchor */
  index?: MtIndexBarIndex
}

export interface MtIndexBarContext {
  indexList: MtIndexBarIndex[]
  activeIndex: MtIndexBarIndex | undefined
  zIndex: number
  sticky: boolean
  stickyOffsetTop: number
  highlightColor: string | undefined
  register: (index: MtIndexBarIndex, el: HTMLElement) => void
  unregister: (index: MtIndexBarIndex) => void
  scrollTo: (index: MtIndexBarIndex) => void
}

export interface MtIndexBarInstance {
  scrollTo: (index: MtIndexBarIndex) => void
}

export const indexBarKey: InjectionKey<MtIndexBarContext> = Symbol('MtIndexBar')