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
import { MtOverlay } from './components/overlay'
import { MtDialog, confirmDialog, alertDialog } from './components/dialog'
import { MtActionSheet } from './components/action-sheet'
import { MtToast, showToast, clearToast } from './components/toast'
import { MtNotify, MtNotifyComponent, showNotify, closeNotify } from './components/notify'
import { MtNavBar } from './components/nav-bar'
import { MtTabBar, MtTabBarItem } from './components/tab-bar'
import { MtTabs, MtTabPane } from './components/tabs'
import { MtImage } from './components/image'
import { MtTag } from './components/tag'
import { MtBadge } from './components/badge'
import { MtEmpty } from './components/empty'
import { MtSkeleton } from './components/skeleton'
import { MtConfigProvider } from './components/config-provider'
import { MtStepper } from './components/stepper'
import { MtRate } from './components/rate'
import { MtSlider } from './components/slider'
import { MtSearch } from './components/search'
import { MtUploader } from './components/uploader'
import { MtDatetimePicker } from './components/datetime-picker'
import { MtCascader } from './components/cascader'
import { MtCalendar } from './components/calendar'
import { MtSwipe } from './components/swipe'
import { MtSwipeCell } from './components/swipe-cell'
import { MtList } from './components/list'
import { MtPullRefresh } from './components/pull-refresh'
import { MtBackTop } from './components/back-top'
import { MtLoading } from './components/loading'
import { MtProgress } from './components/progress'
import { MtCountDown } from './components/count-down'
import { MtNoticeBar } from './components/notice-bar'
import { MtCollapse, MtCollapseItem } from './components/collapse'
import { MtSteps, MtStep } from './components/steps'
import { MtPopover } from './components/popover'
import { MtImagePreview } from './components/image-preview'
import { MtNumberKeyboard } from './components/number-keyboard'
import { MtPasswordInput } from './components/password-input'
import { MtSignature } from './components/signature'
import { MtSticky } from './components/sticky'
import { MtShareSheet } from './components/share-sheet'
import { MtDropdownMenu, MtDropdownItem } from './components/dropdown-menu'
import { MtTreeSelect } from './components/tree-select'
import { MtArea } from './components/area'
import { MtSidebar, MtSidebarItem } from './components/sidebar'
import { MtIndexBar, MtIndexAnchor } from './components/index-bar'
import { MtPagination } from './components/pagination'
import { MtCircle } from './components/circle'
import { MtLazyLoad } from './components/lazy-load'
import { MtHighlight } from './components/highlight'
import { MtFloatingBubble } from './components/floating-bubble'

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
  MtOverlay,
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
  MtStepper,
  MtRate,
  MtSlider,
  MtSearch,
  MtUploader,
  MtDatetimePicker,
  MtCascader,
  MtCalendar,
  MtSwipe,
  MtSwipeCell,
  MtList,
  MtPullRefresh,
  MtBackTop,
  MtLoading,
  MtProgress,
  MtCountDown,
  MtNoticeBar,
  MtCollapse,
  MtCollapseItem,
  MtSteps,
  MtStep,
  MtPopover,
  MtImagePreview,
  MtNumberKeyboard,
  MtPasswordInput,
  MtSignature,
  MtSticky,
  MtNotifyComponent,
  MtShareSheet,
  MtDropdownMenu,
  MtDropdownItem,
  MtTreeSelect,
  MtArea,
  MtSidebar,
  MtSidebarItem,
  MtIndexBar,
  MtIndexAnchor,
  MtPagination,
  MtCircle,
  MtLazyLoad,
  MtHighlight,
  MtFloatingBubble,
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
  MtOverlay,
  MtDialog,
  MtActionSheet,
  MtToast,
  showToast,
  clearToast,
  confirmDialog,
  alertDialog,
  MtNotify,
  MtNotifyComponent,
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
  MtStepper,
  MtRate,
  MtSlider,
  MtSearch,
  MtUploader,
  MtDatetimePicker,
  MtCascader,
  MtCalendar,
  MtSwipe,
  MtSwipeCell,
  MtList,
  MtPullRefresh,
  MtBackTop,
  MtLoading,
  MtProgress,
  MtCountDown,
  MtNoticeBar,
  MtCollapse,
  MtCollapseItem,
  MtSteps,
  MtStep,
  MtPopover,
  MtImagePreview,
  MtNumberKeyboard,
  MtPasswordInput,
  MtSignature,
  MtSticky,
  MtShareSheet,
  MtDropdownMenu,
  MtDropdownItem,
  MtTreeSelect,
  MtArea,
  MtSidebar,
  MtSidebarItem,
  MtIndexBar,
  MtIndexAnchor,
  MtPagination,
  MtCircle,
  MtLazyLoad,
  MtHighlight,
  MtFloatingBubble,
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
export type { MtOverlayProps } from './components/overlay'
export type { MtDialogProps, MtDialogOptions } from './components/dialog'
export type { MtActionSheetProps, MtActionSheetAction } from './components/action-sheet'
export type { MtToastOptions, MtToastApi, MtToastType, MtToastPosition } from './components/toast'
export type { MtNotifyOptions, MtNotifyApi, MtNotifyType, MtNotifyProps } from './components/notify'
export type { MtNavBarProps } from './components/nav-bar'
export type { MtTabBarProps, MtTabBarItemProps, MtTabBarValue } from './components/tab-bar'
export type { MtTabsProps, MtTabPaneProps, MtTabsValue, MtTabsType } from './components/tabs'
export type { MtImageProps, MtImageFit } from './components/image'
export type { MtTagProps, MtTagType, MtTagSize, MtTagEffect } from './components/tag'
export type { MtBadgeProps } from './components/badge'
export type { MtEmptyProps } from './components/empty'
export type { MtSkeletonProps } from './components/skeleton'
export type { MtConfigProviderProps } from './components/config-provider'
export type { MtStepperProps } from './components/stepper'
export type { MtRateProps } from './components/rate'
export type { MtSliderProps } from './components/slider'
export type { MtSearchProps } from './components/search'
export type {
  MtUploaderProps,
  MtUploaderFile,
  MtUploaderFileStatus,
} from './components/uploader'
export type {
  MtDatetimePickerProps,
  MtDatetimePickerType,
  MtDatetimePickerColumnType,
} from './components/datetime-picker'
export type {
  MtCascaderProps,
  MtCascaderOption,
  MtCascaderFieldNames,
  MtCascaderValue,
} from './components/cascader'
export type {
  MtCalendarProps,
  MtCalendarType,
  MtCalendarValue,
} from './components/calendar'
export type { MtSwipeProps } from './components/swipe'
export type { MtSwipeCellProps, MtSwipeCellPosition } from './components/swipe-cell'
export type { MtListProps } from './components/list'
export type { MtPullRefreshProps, MtPullRefreshStatus } from './components/pull-refresh'
export type { MtBackTopProps } from './components/back-top'
export type { MtLoadingProps, MtLoadingType } from './components/loading'
export type { MtProgressProps, MtProgressStatus } from './components/progress'
export type { MtCountDownProps, MtCountDownCurrentTime } from './components/count-down'
export type { MtNoticeBarProps } from './components/notice-bar'
export type {
  MtCollapseProps,
  MtCollapseItemProps,
  MtCollapseValue,
} from './components/collapse'
export type { MtStepsProps, MtStepProps, MtStepsDirection } from './components/steps'
export type {
  MtPopoverProps,
  MtPopoverAction,
  MtPopoverPlacement,
} from './components/popover'
export type { MtImagePreviewProps } from './components/image-preview'
export type { MtNumberKeyboardProps } from './components/number-keyboard'
export type { MtPasswordInputProps } from './components/password-input'
export type {
  MtSignatureProps,
  MtSignatureSubmitContent,
  MtSignatureInstance,
} from './components/signature'
export type { MtStickyProps } from './components/sticky'
export type { MtShareSheetProps, MtShareSheetOption } from './components/share-sheet'
export type {
  MtDropdownMenuProps,
  MtDropdownItemProps,
  MtDropdownOption,
  MtDropdownValue,
} from './components/dropdown-menu'
export type {
  MtTreeSelectProps,
  MtTreeSelectItem,
  MtTreeSelectChild,
  MtTreeSelectId,
} from './components/tree-select'
export type { MtAreaProps, MtAreaList, MtAreaEvent } from './components/area'
export type {
  MtSidebarProps,
  MtSidebarItemProps,
  MtSidebarValue,
} from './components/sidebar'
export type {
  MtIndexBarProps,
  MtIndexAnchorProps,
  MtIndexBarIndex,
  MtIndexBarContext,
  MtIndexBarInstance,
} from './components/index-bar'
export type { MtPaginationProps, MtPaginationMode } from './components/pagination'
export type { MtCircleProps, MtCircleStrokeLinecap } from './components/circle'
export type { MtLazyLoadProps } from './components/lazy-load'
export type { MtHighlightProps } from './components/highlight'
export type {
  MtFloatingBubbleProps,
  MtFloatingBubbleAxis,
  MtFloatingBubbleMagnetic,
  MtFloatingBubbleOffset,
} from './components/floating-bubble'
export type { MtLocaleMessages } from './locale'

export default { install }
