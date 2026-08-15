export type MtCascaderValue = string | number

export interface MtCascaderOption {
  value?: MtCascaderValue
  label?: string
  children?: MtCascaderOption[]
  disabled?: boolean
  /** Allows custom field names via the `props` mapping */
  [key: string]: unknown
}

/** Field name mapping, aligned with Element Plus's Cascader `props` option */
export interface MtCascaderFieldNames {
  value?: string
  label?: string
  children?: string
  disabled?: string
}

export interface MtCascaderProps {
  /** Bound value: the full path of selected values from root to leaf */
  modelValue?: MtCascaderValue[]
  /** Cascading option data */
  options?: MtCascaderOption[]
  /** Field name mapping for custom option structures */
  props?: MtCascaderFieldNames
  /** Title shown above the tabs */
  title?: string
  /** Placeholder text of the pending tab */
  placeholder?: string
  disabled?: boolean
}
