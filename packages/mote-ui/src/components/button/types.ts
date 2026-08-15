export interface MtButtonProps {
  /** Button style variant, aligned with Element Plus naming */
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
  /** Button size */
  size?: 'small' | 'normal' | 'large'
  /** Plain style: white background with colored text/border */
  plain?: boolean
  /** Fully rounded corners */
  round?: boolean
  /** Fill the width of the parent container */
  block?: boolean
  disabled?: boolean
  loading?: boolean
}
