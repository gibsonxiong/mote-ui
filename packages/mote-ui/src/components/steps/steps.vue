<script setup lang="ts">
import { provide, reactive, toRef } from 'vue'
import type { MtStepContext, MtStepsContext, MtStepsProps } from './types'
import { stepsKey } from './types'

defineOptions({
  name: 'MtSteps',
})

const props = withDefaults(defineProps<MtStepsProps>(), {
  active: 0,
  direction: 'horizontal',
})

const steps = reactive<MtStepContext[]>([])

const register = (step: MtStepContext) => {
  steps.push(step)
  return steps.length - 1
}

const unregister = (step: MtStepContext) => {
  const index = steps.indexOf(step)
  if (index > -1) {
    steps.splice(index, 1)
  }
}

provide(
  stepsKey,
  reactive({
    active: toRef(props, 'active'),
    direction: toRef(props, 'direction'),
    register,
    unregister,
  }) as unknown as MtStepsContext,
)
</script>

<template>
  <div class="mt-steps" :class="`mt-steps--${direction}`">
    <slot />
  </div>
</template>

<style lang="scss">
.mt-steps {
  display: flex;
  padding: 10px 0;
  background: var(--mt-bg-color);

  &--vertical {
    flex-direction: column;
    padding: 10px 0;
  }
}
</style>
