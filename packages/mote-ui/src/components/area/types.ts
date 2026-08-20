/**
 * Area list in the classic three-map shape consumed by the Area component.
 * Each map keys the region code (e.g. `'330000'`) to its display name.
 */
export interface MtAreaList {
  province_list: Record<string, string>
  city_list: Record<string, string>
  county_list: Record<string, string>
}

/** Result passed to the `confirm` event. */
export interface MtAreaEvent {
  /** Code of the deepest selected region (county/city/province by columnsNum) */
  code: string
  province: string
  city: string
  county: string
}

export interface MtAreaProps {
  /** Selected region code */
  modelValue?: string
  /** Region data in the three-map format */
  areaList?: MtAreaList
  /** Number of picker columns rendered: 2 (province/city) or 3 (province/city/county) */
  columnsNum?: number
  /** Title shown in the picker toolbar */
  title?: string
  /** Confirm button text (falls back to locale) */
  confirmButtonText?: string
  /** Cancel button text (falls back to locale) */
  cancelButtonText?: string
  /** Height of one option row in px */
  optionHeight?: number
  /** Number of visible rows */
  visibleOptionNum?: number
}