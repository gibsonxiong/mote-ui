<script setup lang="ts">
import { watchEffect } from 'vue'
import { useData } from 'vitepress'

defineOptions({
  name: 'ThemeSync',
})

// Sync VitePress dark mode with Mote UI's data-theme attribute
const { isDark } = useData()

watchEffect(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = isDark.value ? 'dark' : 'light'
  }
})
</script>

<template>
  <span hidden />
</template>
