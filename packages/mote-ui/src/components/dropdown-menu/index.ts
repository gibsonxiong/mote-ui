import { withInstall } from '../../utils/with-install'
import DropdownMenu from './dropdown-menu.vue'
import DropdownItem from './dropdown-item.vue'

export const MtDropdownMenu = withInstall(DropdownMenu, 'MtDropdownMenu')
export const MtDropdownItem = withInstall(DropdownItem, 'MtDropdownItem')
export default MtDropdownMenu

export * from './types'