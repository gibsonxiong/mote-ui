import { withInstall } from '../../utils/with-install'
import ImagePreview from './image-preview.vue'

export const MtImagePreview = withInstall(ImagePreview, 'MtImagePreview')
export default MtImagePreview

export * from './types'
