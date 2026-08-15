import { withInstall } from '../../utils/with-install'
import Checkbox from './checkbox.vue'
import CheckboxGroup from './checkbox-group.vue'

export const MtCheckbox = withInstall(Checkbox, 'MtCheckbox')
export const MtCheckboxGroup = withInstall(CheckboxGroup, 'MtCheckboxGroup')

export * from './types'
