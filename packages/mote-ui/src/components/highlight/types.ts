import type { CSSProperties } from 'vue'

export interface MtHighlightProps {
  /** The full text to search; ignored when the default slot is provided */
  text?: string
  /** Keywords to highlight; a string is treated as a single keyword */
  keywords?: string | string[]
  /** Inline style applied to the highlighted snippets */
  highlightStyle?: CSSProperties
  /** Extra class applied to the highlighted snippets */
  highlightClass?: string
  /** Whether keyword matching is case-sensitive */
  caseSensitive?: boolean
}