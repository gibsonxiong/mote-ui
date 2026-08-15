import { withInstall } from '../../utils/with-install'
import CountDown from './count-down.vue'

export const MtCountDown = withInstall(CountDown, 'MtCountDown')
export default MtCountDown

export * from './types'
