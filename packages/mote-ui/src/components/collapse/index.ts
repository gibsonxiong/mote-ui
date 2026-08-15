import { withInstall } from '../../utils/with-install'
import Collapse from './collapse.vue'
import CollapseItem from './collapse-item.vue'

export const MtCollapse = withInstall(Collapse, 'MtCollapse')
export const MtCollapseItem = withInstall(CollapseItem, 'MtCollapseItem')
export default MtCollapse

export * from './types'
