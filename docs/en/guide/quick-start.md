# Quick Start

## Installation

```bash
pnpm add mote-ui
# or
npm install mote-ui
```

## Full Import

```ts
import { createApp } from 'vue'
import MoteUI from 'mote-ui'
import 'mote-ui/dist/style.css'
import App from './App.vue'

createApp(App).use(MoteUI).mount('#app')
```

## On-demand Import

```ts
import { MtButton } from 'mote-ui'
import 'mote-ui/dist/style.css'
```

Modern bundlers will automatically tree-shake unused components.

## Browser Support

- iOS Safari 14+ / Android Chrome 90+
- **SSR is not supported (SPA only)**

## Theming

All design tokens are exposed as CSS Variables — override them to reskin:

```css
:root {
  --mt-color-primary: #6366f1;
}
```
