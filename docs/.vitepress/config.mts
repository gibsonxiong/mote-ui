import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'

const pkg = (p: string) => fileURLToPath(new URL(p, import.meta.url))

const zhSidebar = [
  {
    text: '指南',
    items: [
      { text: '快速上手', link: '/guide/quick-start' },
      { text: '暗色模式', link: '/guide/dark-mode' },
      { text: '国际化', link: '/guide/i18n' },
    ],
  },
  {
    text: '基础组件',
    items: [
      { text: 'Button 按钮', link: '/components/button' },
      { text: 'Icon 图标', link: '/components/icon' },
      { text: 'Cell 单元格', link: '/components/cell' },
      { text: 'Grid 宫格', link: '/components/grid' },
      { text: 'Divider 分割线', link: '/components/divider' },
    ],
  },
  {
    text: '表单组件',
    items: [
      { text: 'Field 输入框', link: '/components/field' },
      { text: 'Form 表单', link: '/components/form' },
      { text: 'Switch 开关', link: '/components/switch' },
      { text: 'Checkbox 复选框', link: '/components/checkbox' },
      { text: 'Radio 单选框', link: '/components/radio' },
      { text: 'Picker 选择器', link: '/components/picker' },
    ],
  },
  {
    text: '反馈组件',
    items: [
      { text: 'Popup 弹出层', link: '/components/popup' },
      { text: 'Toast 轻提示', link: '/components/toast' },
      { text: 'Dialog 对话框', link: '/components/dialog' },
      { text: 'ActionSheet 动作面板', link: '/components/action-sheet' },
      { text: 'Notify 消息通知', link: '/components/notify' },
    ],
  },
  {
    text: '导航组件',
    items: [
      { text: 'NavBar 导航栏', link: '/components/nav-bar' },
      { text: 'TabBar 标签栏', link: '/components/tab-bar' },
      { text: 'Tabs 选项卡', link: '/components/tabs' },
    ],
  },
  {
    text: '展示组件',
    items: [
      { text: 'Image 图片', link: '/components/image' },
      { text: 'Tag 标签', link: '/components/tag' },
      { text: 'Badge 徽标', link: '/components/badge' },
      { text: 'Empty 空状态', link: '/components/empty' },
      { text: 'Skeleton 骨架屏', link: '/components/skeleton' },
    ],
  },
]

const enSidebar = [
  {
    text: 'Guide',
    items: [
      { text: 'Quick Start', link: '/en/guide/quick-start' },
      { text: 'Dark Mode', link: '/en/guide/dark-mode' },
      { text: 'Internationalization', link: '/en/guide/i18n' },
    ],
  },
  {
    text: 'Basic',
    items: [
      { text: 'Button', link: '/en/components/button' },
      { text: 'Icon', link: '/en/components/icon' },
      { text: 'Cell', link: '/en/components/cell' },
      { text: 'Grid', link: '/en/components/grid' },
      { text: 'Divider', link: '/en/components/divider' },
    ],
  },
  {
    text: 'Form',
    items: [
      { text: 'Field', link: '/en/components/field' },
      { text: 'Form', link: '/en/components/form' },
      { text: 'Switch', link: '/en/components/switch' },
      { text: 'Checkbox', link: '/en/components/checkbox' },
      { text: 'Radio', link: '/en/components/radio' },
      { text: 'Picker', link: '/en/components/picker' },
    ],
  },
  {
    text: 'Feedback',
    items: [
      { text: 'Popup', link: '/en/components/popup' },
      { text: 'Toast', link: '/en/components/toast' },
      { text: 'Dialog', link: '/en/components/dialog' },
      { text: 'ActionSheet', link: '/en/components/action-sheet' },
      { text: 'Notify', link: '/en/components/notify' },
    ],
  },
  {
    text: 'Navigation',
    items: [
      { text: 'NavBar', link: '/en/components/nav-bar' },
      { text: 'TabBar', link: '/en/components/tab-bar' },
      { text: 'Tabs', link: '/en/components/tabs' },
    ],
  },
  {
    text: 'Display',
    items: [
      { text: 'Image', link: '/en/components/image' },
      { text: 'Tag', link: '/en/components/tag' },
      { text: 'Badge', link: '/en/components/badge' },
      { text: 'Empty', link: '/en/components/empty' },
      { text: 'Skeleton', link: '/en/components/skeleton' },
    ],
  },
]

export default defineConfig({
  title: 'Mote UI',
  // Deployed to GitHub Pages at https://<owner>.github.io/mote-ui/
  base: '/mote-ui/',
  themeConfig: {
    socialLinks: [{ icon: 'github', link: 'https://github.com/gibsonxiong/mote-ui' }],
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      description: '移动端 Vue 3 组件库 · 借鉴 Element Plus 设计 token',
      themeConfig: {
        nav: [
          { text: '指南', link: '/guide/quick-start' },
          { text: '组件', link: '/components/button' },
          { text: 'Playground', link: '/playground' },
        ],
        sidebar: zhSidebar,
        outline: { label: '本页目录' },
        lastUpdated: { text: '最后更新' },
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      description: 'Mobile Vue 3 component library inspired by Element Plus design tokens',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/guide/quick-start' },
          { text: 'Components', link: '/en/components/button' },
          { text: 'Playground', link: '/en/playground' },
        ],
        sidebar: enSidebar,
        outline: { label: 'On this page' },
        lastUpdated: { text: 'Last updated' },
        docFooter: { prev: 'Previous page', next: 'Next page' },
        darkModeSwitchLabel: 'Appearance',
      },
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ['@vue/repl'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    resolve: {
      alias: [
        {
          find: /^mote-ui\/styles$/,
          replacement: pkg('../../packages/mote-ui/src/styles/index.scss'),
        },
        {
          find: /^mote-ui\/styles\/(.*)/,
          replacement: pkg('../../packages/mote-ui/src/styles') + '/$1',
        },
        { find: 'mote-ui', replacement: pkg('../../packages/mote-ui/src/index.ts') },
        {
          find: '@mote-ui/icons',
          replacement: pkg('../../packages/mote-ui-icons/src/index.ts'),
        },
      ],
    },
  },
})
