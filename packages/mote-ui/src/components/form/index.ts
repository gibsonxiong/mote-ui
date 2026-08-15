import { withInstall } from '../../utils/with-install'
import Form from './form.vue'
import FormItem from './form-item.vue'

export const MtForm = withInstall(Form, 'MtForm')
export const MtFormItem = withInstall(FormItem, 'MtFormItem')

export * from './types'
export { validateRules } from './validator'
