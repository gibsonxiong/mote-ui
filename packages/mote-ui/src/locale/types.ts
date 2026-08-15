/** Locale message definitions for all built-in component texts. */
export interface MtLocaleMessages {
  /** Locale identifier, e.g. `'zh-CN'` or `'en-US'` */
  name: string
  common: {
    confirm: string
    cancel: string
    loading: string
  }
  empty: {
    description: string
  }
  image: {
    error: string
  }
  form: {
    required: string
    pattern: string
    email: string
    /** Supports `{min}` / `{max}` placeholders */
    range: string
    /** Supports `{min}` placeholder */
    min: string
    /** Supports `{max}` placeholder */
    max: string
    typeMismatch: string
    validateFailed: string
  }
  search: {
    placeholder: string
  }
  cascader: {
    placeholder: string
  }
  calendar: {
    title: string
    confirm: string
    start: string
    end: string
    startEnd: string
    weekdays: [string, string, string, string, string, string, string]
    /** Supports `{year}` / `{month}` placeholders */
    monthTitle: string
  }
  uploader: {
    upload: string
    /** Supports `{max}` placeholder for the formatted max size */
    sizeExceed: string
    failed: string
  }
  list: {
    loading: string
    finished: string
    error: string
  }
  pullRefresh: {
    pulling: string
    loosing: string
    loading: string
    success: string
  }
}
