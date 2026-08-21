import { withInstall } from '../../utils/with-install'
import IndexBar from './index-bar.vue'
import IndexAnchor from './index-anchor.vue'

export const MtIndexBar = withInstall(IndexBar, 'MtIndexBar')
export const MtIndexAnchor = withInstall(IndexAnchor, 'MtIndexAnchor')
export default MtIndexBar

export * from './types'