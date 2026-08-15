import type { MtLocaleMessages } from '../../locale'

export interface MtConfigProviderProps {
  /**
   * Locale messages applied to all descendant components. Also synced to the
   * global locale so imperative APIs (confirmDialog, alertDialog, ...) follow
   * the latest configured locale.
   */
  locale?: MtLocaleMessages
}
