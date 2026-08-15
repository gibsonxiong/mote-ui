import { withInstall } from '../../utils/with-install'
import Picker from './picker.vue'

export const MtPicker = withInstall(Picker, 'MtPicker')
export default MtPicker

export * from './types'
export { resolveColumns, normalizeOption } from './columns'
