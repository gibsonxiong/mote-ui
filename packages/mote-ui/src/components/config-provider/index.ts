import { withInstall } from '../../utils/with-install'
import ConfigProvider from './config-provider.vue'

export const MtConfigProvider = withInstall(ConfigProvider, 'MtConfigProvider')
export default MtConfigProvider

export * from './types'
