import { withInstall } from '../../utils/with-install'
import Radio from './radio.vue'
import RadioGroup from './radio-group.vue'

export const MtRadio = withInstall(Radio, 'MtRadio')
export const MtRadioGroup = withInstall(RadioGroup, 'MtRadioGroup')

export * from './types'
