<script setup lang="ts">
import { computed, provide, reactive, toRefs } from 'vue'
import { gridContextKey } from './types'
import type { MtGridContext, MtGridProps } from './types'

defineOptions({
  name: 'MtGrid',
})

const props = withDefaults(defineProps<MtGridProps>(), {
  columnNum: 4,
  square: false,
  border: true,
  center: true,
})

provide(gridContextKey, reactive({ ...toRefs(props) }) as unknown as MtGridContext)

const classes = computed(() => ['mt-grid', { 'mt-grid--border': props.border }])
const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${props.columnNum}, 1fr)`,
}))
</script>

<template>
  <div :class="classes" :style="gridStyle">
    <slot />
  </div>
</template>

<style lang="scss">
.mt-grid {
  display: grid;
  width: 100%;
  background-color: var(--mt-bg-color);

  // Classic table-grid hairlines: container owns top/left,
  // items own right/bottom, so any row/column count draws cleanly.
  &--border {
    border-top: 1px solid var(--mt-border-color-lighter);
    border-left: 1px solid var(--mt-border-color-lighter);
  }
}
</style>
