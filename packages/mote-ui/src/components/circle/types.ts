export type MtCircleStrokeLinecap = 'butt' | 'round' | 'square'

export interface MtCircleProps {
  /** Current progress rate (0-100), the v-model value */
  modelValue?: number
  /** Target progress rate (0-100) the ring animates toward */
  rate?: number
  /** Animation speed in percentage points per second; 0 disables animation */
  speed?: number
  /** Diameter of the ring in px */
  size?: number
  /** Stroke width of the ring */
  strokeWidth?: number
  /** Progress stroke color */
  color?: string
  /** Track (background) stroke color */
  layerColor?: string
  /** Fill color of the circle */
  fill?: string
  /** Whether progress grows clockwise */
  clockwise?: boolean
  /** Shape of the progress line cap */
  strokeLinecap?: MtCircleStrokeLinecap
  /** Text shown in the center; defaults to the percentage */
  text?: string
}