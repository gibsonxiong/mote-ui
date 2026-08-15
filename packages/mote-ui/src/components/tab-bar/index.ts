import { withInstall } from '../../utils/with-install'
import TabBar from './tab-bar.vue'
import TabBarItem from './tab-bar-item.vue'

export const MtTabBar = withInstall(TabBar, 'MtTabBar')
export const MtTabBarItem = withInstall(TabBarItem, 'MtTabBarItem')
export default MtTabBar

export * from './types'
