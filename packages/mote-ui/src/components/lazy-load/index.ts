import { withInstall } from '../../utils/with-install'
import LazyLoad from './lazy-load.vue'

export const MtLazyLoad = withInstall(LazyLoad, 'MtLazyLoad')
export default MtLazyLoad

export * from './types'