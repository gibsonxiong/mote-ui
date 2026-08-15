# 暗色模式

Mote UI 基于 CSS Variables 主题化：所有组件样式均引用 `--mt-*` 语义化 token。暗色模式通过在文档根元素上设置 `data-theme="dark"` 启用，无需引入额外样式文件。

## 启用与切换

```ts
// 启用暗色模式
document.documentElement.dataset.theme = 'dark'

// 切回亮色模式
document.documentElement.dataset.theme = 'light'
```

## 跟随系统偏好

```ts
const media = window.matchMedia('(prefers-color-scheme: dark)')

const sync = () => {
  document.documentElement.dataset.theme = media.matches ? 'dark' : 'light'
}

sync()
media.addEventListener('change', sync)
```

## 覆写说明

暗色模式下被覆写的 token（色板对齐 Element Plus 暗色主题）：

| Token | 亮色 | 暗色 |
| --- | --- | --- |
| `--mt-text-color-primary` | `#303133` | `#e5eaf3` |
| `--mt-bg-color` | `#ffffff` | `#141414` |
| `--mt-bg-color-page` | `#f2f3f5` | `#0a0a0a` |
| `--mt-bg-color-overlay` | `#ffffff` | `#1d1e1f` |
| `--mt-border-color` | `#dcdfe6` | `#4c4d4f` |
| `--mt-fill-color-light` | `#f5f7fa` | `#262727` |

品牌色（`--mt-color-primary` 等）在两种主题下保持一致，无需覆写。

::: tip
若自定义组件也使用了 `--mt-*` token，则自动获得暗色模式支持。
:::
