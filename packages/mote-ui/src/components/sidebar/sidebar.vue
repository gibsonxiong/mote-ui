<script setup lang="ts">
import { computed, provide, reactive, ref, toRefs, watch } from 'vue'
import type { MtSidebarContext, MtSidebarProps, MtSidebarValue } from './types'
import { sidebarKey } from './types'

defineOptions({
  name: 'MtSidebar',
})

const props = withDefaults(defineProps<MtSidebarProps>(), {
  modelValue: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: MtSidebarValue]
  change: [value: MtSidebarValue]
}>()

const items: object[] = []

const internalActive = ref<MtSidebarValue | undefined>(undefined)

watch(
  () => props.modelValue,
  (value) => {
    internalActive.value = value
  },
  { immediate: true },
)

const currentActive = computed(() => internalActive.value ?? 0)

const register = (item: object) => {
  items.push(item)
  return items.length - 1
}

const unregister = (item: object) => {
  const index = items.indexOf(item)
  if (index > -1) items.splice(index, 1)
}

const select = (value: MtSidebarValue) => {
  if (value !== currentActive.value) {
    internalActive.value = value
    emit('update:modelValue', value)
    emit('change', value)
  }
}

provide(
  sidebarKey,
  reactive({
    ...toRefs(props),
    modelValue: currentActive,
    register,
    unregister,
    select,
  }) as unknown as MtSidebarContext,
)
</script>

<template>
  <div class="mt-sidebar" role="navigation">
    <slot />
  </div>
</template>

<style lang="scss">
.mt-sidebar {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 80px;
  background: var(--mt-fill-color-light);
  user-select: none;
}
</style>