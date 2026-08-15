import { withInstall } from '../../utils/with-install'
import Tabs from './tabs.vue'
import TabPane from './tab-pane.vue'

export const MtTabs = withInstall(Tabs, 'MtTabs')
export const MtTabPane = withInstall(TabPane, 'MtTabPane')
export default MtTabs

export * from './types'
