export type MtImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'

export interface MtImageProps {
  /** Image source url */
  src?: string
  /** Alt text */
  alt?: string
  /** CSS object-fit mode */
  fit?: MtImageFit
  /** Whether the image fills its container (height defaults to 100%) */
  block?: boolean
  /** Width; accepts px number or any CSS size string */
  width?: number | string
  /** Height; accepts px number or any CSS size string */
  height?: number | string
  /** Border radius */
  radius?: number | string
  /** Round the image into a circle */
  round?: boolean
  /** Defer loading until the image scrolls into the viewport */
  lazyLoad?: boolean
  /** Show the built-in loading placeholder */
  showLoading?: boolean
  /** Show the built-in error placeholder */
  showError?: boolean
}
