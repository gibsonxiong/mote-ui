export type MtPaginationMode = 'multi' | 'simple'

export interface MtPaginationProps {
  /** Current page number */
  modelValue?: number
  /** Pagination mode */
  mode?: MtPaginationMode
  /** Text of the previous button; renders an arrow icon when empty */
  prevText?: string
  /** Text of the next button; renders an arrow icon when empty */
  nextText?: string
  /** Total page count; derived from totalItems/itemsPerPage when omitted */
  pageCount?: number
  /** Total number of items */
  totalItems?: number
  /** Items per page */
  itemsPerPage?: number
  /** Number of page buttons to display */
  showPageSize?: number
  /** Force the leading and trailing ellipses to always render */
  forceEllipses?: boolean
}