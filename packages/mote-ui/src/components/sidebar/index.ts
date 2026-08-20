import { withInstall } from '../../utils/with-install'
import Sidebar from './sidebar.vue'
import SidebarItem from './sidebar-item.vue'

export const MtSidebar = withInstall(Sidebar, 'MtSidebar')
export const MtSidebarItem = withInstall(SidebarItem, 'MtSidebarItem')
export default MtSidebar

export * from './types'