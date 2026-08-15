import type { MtPickerColumn, MtPickerColumns, MtPickerOption, MtPickerValue } from './types'

/** Normalizes a raw option entry (string/number or object) into MtPickerOption */
export function normalizeOption(option: MtPickerOption | MtPickerValue): MtPickerOption {
  if (typeof option === 'string' || typeof option === 'number') {
    return { text: String(option), value: option }
  }
  return option
}

function isCascade(columns: MtPickerColumns): columns is MtPickerColumn {
  if (!Array.isArray(columns) || columns.length === 0) return false
  const first = columns[0]
  if (typeof first === 'string' || typeof first === 'number') return false
  // A multi-column layout has arrays as its entries; cascade has plain options
  return !Array.isArray(first)
}

export function isMultiColumn(columns: MtPickerColumns): columns is MtPickerColumn[] {
  return Array.isArray(columns) && columns.length > 0 && Array.isArray(columns[0])
}

/**
 * Resolves the columns to render from any supported input shape.
 * For cascade columns the downstream columns depend on the selected index path.
 */
export function resolveColumns(
  columns: MtPickerColumns,
  selectedIndexes: number[],
): MtPickerOption[][] {
  if (isCascade(columns)) {
    const result: MtPickerOption[][] = []
    let level: MtPickerOption[] | undefined = columns.map(normalizeOption)
    for (let depth = 0; level && level.length > 0; depth++) {
      result.push(level)
      const index = Math.min(selectedIndexes[depth] ?? 0, level.length - 1)
      level = level[index]?.children?.map(normalizeOption)
    }
    return result
  }

  if (isMultiColumn(columns)) {
    return columns.map((column) => column.map(normalizeOption))
  }

  return [(columns as MtPickerColumn).map(normalizeOption)]
}

/** Whether the input columns describe a cascade (single source) structure */
export function isCascadeColumns(columns: MtPickerColumns): boolean {
  return isCascade(columns)
}
