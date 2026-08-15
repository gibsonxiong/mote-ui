import { withInstall } from '../../utils/with-install'
import Uploader from './uploader.vue'

export const MtUploader = withInstall(Uploader, 'MtUploader')
export default MtUploader

export * from './types'
