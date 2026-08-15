# 快速上手

## 安装

```bash
pnpm add mote-ui
# 或
npm install mote-ui
```

## 完整引入

```ts
import { createApp } from 'vue'
import MoteUI from 'mote-ui'
import 'mote-ui/dist/style.css'
import App from './App.vue'

createApp(App).use(MoteUI).mount('#app')
```

## 按需引入

```ts
import { MtButton } from 'mote-ui'
import 'mote-ui/dist/style.css'
```

现代构建工具会自动 tree-shake 未使用的组件。

## 支持范围

- iOS Safari 14+ / Android Chrome 90+
- **不支持 SSR（SPA only）**

## 主题定制

所有设计 token 以 CSS Variables 暴露，覆盖变量即可换肤：

```css
:root {
  --mt-color-primary: #6366f1;
}
```
