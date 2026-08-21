<script setup lang="ts">
import { watchEffect } from 'vue'
import { useData } from 'vitepress'
import { setLocale, zhCN, enUS } from 'mote-ui'

defineOptions({
  name: 'LocaleSync',
})

// Keep Mote UI's global locale in sync with the VitePress page language so
// built-in component texts (Dialog/Picker buttons, etc.) match the docs page.
const { lang } = useData()

watchEffect(() => {
  setLocale(lang.value === 'en-US' ? enUS : zhCN)
})
</script>

<template>
  <span hidden />
</template>
