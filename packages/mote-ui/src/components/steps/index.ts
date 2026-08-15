import { withInstall } from '../../utils/with-install'
import Steps from './steps.vue'
import Step from './step.vue'

export const MtSteps = withInstall(Steps, 'MtSteps')
export const MtStep = withInstall(Step, 'MtStep')
export default MtSteps

export * from './types'
