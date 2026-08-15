import type { InjectionKey } from 'vue'

export type MtStepsDirection = 'horizontal' | 'vertical'

export interface MtStepsProps {
  /** Index of the current step (0-based) */
  active?: number
  direction?: MtStepsDirection
}

export interface MtStepProps {
  title?: string
  description?: string
}

export interface MtStepContext {
  title: string | undefined
  description: string | undefined
}

export interface MtStepsContext {
  active: number
  direction: MtStepsDirection
  register: (step: MtStepContext) => number
  unregister: (step: MtStepContext) => void
}

export const stepsKey: InjectionKey<MtStepsContext> = Symbol('MtSteps')
