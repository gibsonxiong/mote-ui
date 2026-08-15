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
}
