<script setup lang="ts">
import { computed, provide, watch } from 'vue'
import { mtLocaleKey, setLocale } from '../../locale'
import type { MtConfigProviderProps } from './types'

defineOptions({
  name: 'MtConfigProvider',
})

const props = defineProps<MtConfigProviderProps>()

const locale = computed(() => props.locale)

provide(mtLocaleKey, locale)

// Keep the global locale in sync so imperative APIs follow this provider
watch(
  locale,
  (value) => {
    if (value) setLocale(value)
  },
  { immediate: true },
)
</script>

<template>
  <slot />
</template>
