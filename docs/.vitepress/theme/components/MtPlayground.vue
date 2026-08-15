<script setup lang="ts">
import { computed, onMounted, shallowRef, watchEffect, type Component } from 'vue'
import { useData } from 'vitepress'

defineOptions({
  name: 'MtPlayground',
})

const MOTE_VERSION = '0.1.0'

// The closing tag is assembled via interpolation so the SFC parser
// does not terminate this script block early.
const scriptClose = '</' + 'script>'
const defaultAppVue = `<script setup>
import { ref } from 'vue'
import { showToast } from 'mote-ui'

const count = ref(0)
${scriptClose}

<template>
  <div style="padding: 16px; display: flex; flex-direction: column; gap: 12px">
    <MtButton type="primary" @click="count++">Clicked {{ count }} times</MtButton>
    <MtButton type="success" @click="showToast('Hello Mote UI')">Show toast</MtButton>
    <MtButton plain>Plain</MtButton>
  </div>
</template>
`

const { isDark } = useData()
const theme = computed(() => (isDark.value ? 'dark' : 'light'))

// @vue/repl has no SSR-safe ESM entry, so it is loaded client-side only.
const Repl = shallowRef<Component | null>(null)
const Monaco = shallowRef<unknown>(null)
const store = shallowRef<unknown>(null)

const previewOptions = {
  headHTML: `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mote-ui@${MOTE_VERSION}/dist/style.css">`,
  customCode: {
    importCode: `import MoteUI from 'mote-ui'`,
    useCode: `app.use(MoteUI)`,
  },
}

onMounted(async () => {
  const [repl, monaco] = await Promise.all([
    import('@vue/repl'),
    import('@vue/repl/monaco-editor'),
  ])
  Repl.value = repl.Repl
  Monaco.value = monaco.default

  const { importMap: builtinImportMap, vueVersion } = repl.useVueImportMap()
  const replStore = repl.useStore(
    { builtinImportMap, vueVersion },
    location.hash,
  )
  // Sandbox deps: esm.sh keeps `vue` external so the preview shares the REPL's Vue instance.
  replStore.setImportMap(
    {
      imports: {
        'mote-ui': `https://esm.sh/mote-ui@${MOTE_VERSION}?external=vue`,
        '@mote-ui/icons': `https://esm.sh/@mote-ui/icons@${MOTE_VERSION}?external=vue`,
      },
    },
    true,
  )
  if (!location.hash) {
    await replStore.setFiles({ 'App.vue': defaultAppVue }, 'App.vue')
  }
  store.value = replStore

  // Persist state to the URL hash for shareable links.
  watchEffect(() => history.replaceState({}, '', replStore.serialize()))
})
</script>

<template>
  <ClientOnly>
    <component
      :is="Repl"
      v-if="Repl"
      :store="store"
      :editor="Monaco"
      :theme="theme"
      :preview-options="previewOptions"
    />
    <div v-else class="mt-playground__loading">Loading editor…</div>
  </ClientOnly>
</template>

<style>
.mt-playground__loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  color: var(--vp-c-text-2);
}

.vue-repl {
  height: 70vh;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
}

/* Phone-shell feel for the preview pane (mobile-first library). */
.vue-repl .right {
  background:
    radial-gradient(circle at 50% 0, rgba(128, 128, 128, 0.08), transparent 60%);
}

.vue-repl .right iframe {
  max-width: 375px;
  margin: 0 auto;
  border-left: 1px solid var(--vp-c-divider);
  border-right: 1px solid var(--vp-c-divider);
}
</style>
