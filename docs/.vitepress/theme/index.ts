import type { Theme } from 'vitepress'
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import MoteUI from 'mote-ui'
import 'mote-ui/styles/index.scss'
import PhonePreview from './components/PhonePreview.vue'
import ThemeSync from './components/ThemeSync.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(ThemeSync),
    }),
  enhanceApp({ app }) {
    app.use(MoteUI)
    app.component('PhonePreview', PhonePreview)
  },
} satisfies Theme
