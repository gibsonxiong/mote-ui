import type { App, Plugin } from 'vue'
// Bundled into dist/style.css so npm consumers get design tokens + base
// styles together with component styles.
import './styles/index.scss'
import { MtButton } from './components/button'
import { MtIcon } from './components/icon'
import { MtCell, MtCellGroup } from './components/cell'
import { MtGrid, MtGridItem } from './components/grid'
import { MtDivider } from './components/divider'
import { MtSwitch } from './components/switch'
import { MtCheckbox, MtCheckboxGroup } from './components/checkbox'
import { MtRadio, MtRadioGroup } from './components/radio'
import { MtField } from './components/field'
import { MtForm, MtFormItem } from './components/form'
import { MtPicker } from './components/picker'
import { MtPopup } from './components/popup'
import { MtDialog, confirmDialog, alertDialog } from './components/dialog'
import { MtActionSheet } from './components/action-sheet'
import { MtToast, showToast, clearToast } from './components/toast'
import { MtNotify, showNotify, closeNotify } from './components/notify'
import { MtNavBar } from './components/nav-bar'
import { MtTabBar, MtTabBarItem } from './components/tab-bar'
import { MtTabs, MtTabPane } from './components/tabs'
import { MtImage } from './components/image'
import { MtTag } from './components/tag'
import { MtBadge } from './components/badge'
import { MtEmpty } from './components/empty'
import { MtSkeleton } from './components/skeleton'
import { MtConfigProvider } from './components/config-provider'

const components: Plugin[] = [
  MtButton,
  MtIcon,
  MtCell,
  MtCellGroup,
  MtGrid,
  MtGridItem,
  MtDivider,
  MtSwitch,
  MtCheckbox,
  MtCheckboxGroup,
  MtRadio,
  MtRadioGroup,
  MtField,
  MtForm,
  MtFormItem,
  MtPicker,
  MtPopup,
  MtDialog,
  MtActionSheet,
  MtNavBar,
  MtTabBar,
  MtTabBarItem,
  MtTabs,
  MtTabPane,
  MtImage,
  MtTag,
  MtBadge,
  MtEmpty,
  MtSkeleton,
  MtConfigProvider,
]

export { setLocale, useLocale, zhCN, enUS } from './locale'

const install = (app: App) => {
  components.forEach((component) => {
    app.use(component)
  })
}

export {
  MtButton,
  MtIcon,
  MtCell,
  MtCellGroup,
  MtGrid,
  MtGridItem,
  MtDivider,
  MtSwitch,
  MtCheckbox,
  MtCheckboxGroup,
  MtRadio,
  MtRadioGroup,
  MtField,
  MtForm,
  MtFormItem,
  MtPicker,
  MtPopup,
  MtDialog,
  MtActionSheet,
  MtToast,
  showToast,
  clearToast,
  confirmDialog,
  alertDialog,
  MtNotify,
  showNotify,
  closeNotify,
  MtNavBar,
  MtTabBar,
  MtTabBarItem,
  MtTabs,
  MtTabPane,
  MtImage,
  MtTag,
  MtBadge,
  MtEmpty,
  MtSkeleton,
  MtConfigProvider,
}
export type { MtButtonProps } from './components/button'
export type { MtIconProps, MtIconName } from './components/icon'
export type { MtCellProps, MtCellGroupProps } from './components/cell'
export type { MtGridProps, MtGridItemProps } from './components/grid'
export type { MtDividerProps } from './components/divider'
export type { MtSwitchProps, MtSwitchValue } from './components/switch'
export type {
  MtCheckboxProps,
  MtCheckboxGroupProps,
  MtCheckboxValue,
} from './components/checkbox'
export type { MtRadioProps, MtRadioGroupProps, MtRadioValue } from './components/radio'
export type { MtFieldProps } from './components/field'
export type {
  MtFormProps,
  MtFormItemProps,
  MtFormItemRule,
  MtFormRules,
  MtValidator,
} from './components/form'
export type {
  MtPickerProps,
  MtPickerOption,
  MtPickerColumn,
  MtPickerColumns,
  MtPickerValue,
} from './components/picker'
export type { MtPopupProps } from './components/popup'
export type { MtDialogProps, MtDialogOptions } from './components/dialog'
export type { MtActionSheetProps, MtActionSheetAction } from './components/action-sheet'
export type { MtToastOptions, MtToastApi, MtToastType, MtToastPosition } from './components/toast'
export type { MtNotifyOptions, MtNotifyApi, MtNotifyType } from './components/notify'
export type { MtNavBarProps } from './components/nav-bar'
export type { MtTabBarProps, MtTabBarItemProps, MtTabBarValue } from './components/tab-bar'
export type { MtTabsProps, MtTabPaneProps, MtTabsValue, MtTabsType } from './components/tabs'
export type { MtImageProps, MtImageFit } from './components/image'
export type { MtTagProps, MtTagType, MtTagSize, MtTagEffect } from './components/tag'
export type { MtBadgeProps } from './components/badge'
export type { MtEmptyProps } from './components/empty'
export type { MtSkeletonProps } from './components/skeleton'
export type { MtConfigProviderProps } from './components/config-provider'
export type { MtLocaleMessages } from './locale'

export default { install }
