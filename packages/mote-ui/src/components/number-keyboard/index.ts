import { withInstall } from '../../utils/with-install'
import NumberKeyboard from './number-keyboard.vue'

export const MtNumberKeyboard = withInstall(NumberKeyboard, 'MtNumberKeyboard')
export default MtNumberKeyboard

export * from './types'