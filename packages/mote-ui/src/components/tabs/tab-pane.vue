<script setup lang="ts">
import { computed, inject, onBeforeUnmount, reactive, ref, toRef } from 'vue'
import type { MtTabPaneContext, MtTabPaneProps, MtTabsValue } from './types'
import { tabsKey } from './types'

defineOptions({
  name: 'MtTabPane',
})

const props = withDefaults(defineProps<MtTabPaneProps>(), {
  name: undefined,
  title: undefined,
  disabled: false,
})

const tabs = inject(tabsKey, null)

const index = ref(-1)

const pane = reactive({
  name: computed<MtTabsValue>(() => props.name ?? index.value),
  title: toRef(props, 'title'),
  disabled: toRef(props, 'disabled'),
}) as unknown as MtTabPaneContext

if (tabs) {
  index.value = tabs.register(pane)
}

onBeforeUnmount(() => {
  tabs?.unregister(pane)
})

const active = computed(() => (tabs ? tabs.isActive(pane.name) : false))
</script>

<template>
  <div v-show="active" class="mt-tab-pane" role="tabpanel">
    <slot />
  </div>
</template>
