import { withInstall } from '../../utils/with-install'
import Notify from './notify.vue'

export const MtNotifyComponent = withInstall(Notify, 'MtNotifyComponent')
export { MtNotify, showNotify, closeNotify } from './notify'
export default MtNotifyComponent

export * from './types'
