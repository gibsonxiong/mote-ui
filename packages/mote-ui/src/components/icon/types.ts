export type MtIconName =
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up'
  | 'arrow-down'
  | 'close'
  | 'success'
  | 'loading'

export interface MtIconProps {
  /** Built-in icon name; also accepts any string for extensibility. Leave empty to render slot content */
  name?: MtIconName | (string & {})
  size?: string | number
  color?: string
  /** Rotate animation (loading icon spins by default) */
  spin?: boolean
}
