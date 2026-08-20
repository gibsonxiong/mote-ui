export interface MtSignatureSubmitContent {
  /** The drawing canvas (null when the environment lacks canvas support) */
  canvas: HTMLCanvasElement | null
  /** Data URL of the signature image */
  image: string
}

export interface MtSignatureInstance {
  /** Resizes the canvas to fill its container */
  resize: () => void
  /** Clears the canvas */
  clear: () => void
  /** Exports the signature and emits `submit` */
  submit: () => void
}

export interface MtSignatureProps {
  /** Image type used by `toDataURL` */
  type?: 'png' | 'jpg'
  /** Pen color */
  penColor?: string
  /** Pen line width in pixels */
  lineWidth?: number
  /** Canvas background color */
  backgroundColor?: string
  /** Hint text for touch-enabled devices */
  tips?: string
  /** Clear button text (falls back to the `signature.clear` locale) */
  clearButtonText?: string
  /** Confirm button text (falls back to the `common.confirm` locale) */
  confirmButtonText?: string
}