export function padZero(value: number): string {
  return String(value).padStart(2, '0')
}

/** Days in a month; month is 1-based. */
export function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

export function range(start: number, end: number): number[] {
  const result: number[] = []
  for (let value = start; value <= end; value++) result.push(value)
  return result
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
