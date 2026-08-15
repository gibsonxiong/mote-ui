export type MtTagType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export type MtTagSize = 'small' | 'default' | 'large'

export type MtTagEffect = 'light' | 'dark' | 'plain'

export interface MtTagProps {
  type?: MtTagType
  size?: MtTagSize
  /** Visual style: light background, solid background, or outlined */
  effect?: MtTagEffect
  closable?: boolean
  round?: boolean
}
