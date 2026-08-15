/** Snapshot of the remaining time exposed by the change event and slot. */
export interface MtCountDownCurrentTime {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
  /** Total remaining milliseconds */
  total: number
}

export interface MtCountDownProps {
  /** Total countdown duration (ms) */
  time?: number
  /** Format template, supports `DD` / `HH` / `mm` / `ss` / `SSS` tokens */
  format?: string
  /** Whether to start counting right after mount */
  autoStart?: boolean
}
