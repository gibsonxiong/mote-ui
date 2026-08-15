export interface MtCellProps {
  /** Left-side title */
  title?: string
  /** Right-side value */
  value?: string | number
  /** Small description text under the title */
  label?: string
  /** Left icon name (built-in icon registry) */
  icon?: string
  /** Show an arrow on the right and make the cell clickable */
  isLink?: boolean
  /** Arrow direction when isLink is true */
  arrowDirection?: 'left' | 'right' | 'up' | 'down'
  /** Vertically center content (useful for multi-line values) */
  center?: boolean
  /** Show the bottom hairline border */
  border?: boolean
  /** Required mark before the title (form scenario) */
  required?: boolean
}

export interface MtCellGroupProps {
  /** Group title displayed above the cells */
  title?: string
  /** Rounded inset card style */
  inset?: boolean
  /** Show outer hairline borders */
  border?: boolean
}
