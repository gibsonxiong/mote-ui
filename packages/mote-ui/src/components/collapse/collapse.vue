<script setup lang="ts">
import { provide, reactive, ref, watch } from 'vue'
import type {
  MtCollapseContext,
  MtCollapseItemContext,
  MtCollapseProps,
  MtCollapseValue,
} from './types'
import { collapseKey } from './types'

defineOptions({
  name: 'MtCollapse',
})

const props = withDefaults(defineProps<MtCollapseProps>(), {
  modelValue: () => [],
  accordion: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: MtCollapseValue[]]
  change: [value: MtCollapseValue[]]
}>()

const items = reactive<MtCollapseItemContext[]>([])

const register = (item: MtCollapseItemContext) => {
  items.push(item)
  return items.length - 1
}

const unregister = (item: MtCollapseItemContext) => {
  const index = items.indexOf(item)
  if (index > -1) {
    items.splice(index, 1)
  }
}

// Internal state so the collapse works without v-model (uncontrolled),
// while still syncing with the bound value when controlled.
const internalExpanded = ref<MtCollapseValue[]>([])

watch(
  () => props.modelValue,
  (value) => {
    internalExpanded.value = value ?? []
  },
  { immediate: true },
)

const isExpanded = (name: MtCollapseValue) => internalExpanded.value.includes(name)

function toggle(name: MtCollapseValue) {
  const expanded = isExpanded(name)
  const next = props.accordion
    ? expanded
      ? []
      : [name]
    : expanded
      ? internalExpanded.value.filter((value) => value !== name)
      : [...internalExpanded.value, name]
  internalExpanded.value = next
  emit('update:modelValue', next)
  emit('change', next)
}

provide(
  collapseKey,
  reactive({
    isExpanded,
    toggle,
    register,
    unregister,
  }) as unknown as MtCollapseContext,
)
</script>

<template>
  <div class="mt-collapse">
    <slot />
  </div>
</template>

<style lang="scss">
.mt-collapse {
  background: var(--mt-bg-color);
  border-top: 1px solid var(--mt-border-color-lighter);
  border-bottom: 1px solid var(--mt-border-color-lighter);
}
</style>
