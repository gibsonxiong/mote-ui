export interface MtLazyLoadProps {
  /** Root viewport element for intersection detection; defaults to the browser viewport */
  root?: HTMLElement | string
  /** Margin around the root, passed to IntersectionObserver */
  rootMargin?: string
  /** Intersection ratio threshold */
  threshold?: number | number[]
  /** Disable lazy behavior and render the content immediately */
  disabled?: boolean
}