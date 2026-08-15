import { withInstall } from '../../utils/with-install'
import Dialog from './dialog.vue'

export const MtDialog = withInstall(Dialog, 'MtDialog')
export default MtDialog

export { confirmDialog, alertDialog } from './dialog'
export * from './types'
