export type MtSwipeCellPosition = 'none' | 'left' | 'right'

export interface MtSwipeCellProps {
  /** Bound value: which side is opened */
  modelValue?: MtSwipeCellPosition
  disabled?: boolean
}
