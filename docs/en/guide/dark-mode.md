# Dark Mode

Mote UI is themed with CSS Variables: every component style references semantic `--mt-*` tokens. Dark mode is enabled by setting `data-theme="dark"` on the document root element — no extra stylesheet required.

## Enabling and Toggling

```ts
// Enable dark mode
document.documentElement.dataset.theme = 'dark'

// Switch back to light mode
document.documentElement.dataset.theme = 'light'
```

## Following System Preference

```ts
const media = window.matchMedia('(prefers-color-scheme: dark)')

const sync = () => {
  document.documentElement.dataset.theme = media.matches ? 'dark' : 'light'
}

sync()
media.addEventListener('change', sync)
```

## Override Details

Tokens overridden in dark mode (palette aligned with the Element Plus dark theme):

| Token | Light | Dark |
| --- | --- | --- |
| `--mt-text-color-primary` | `#303133` | `#e5eaf3` |
| `--mt-bg-color` | `#ffffff` | `#141414` |
| `--mt-bg-color-page` | `#f2f3f5` | `#0a0a0a` |
| `--mt-bg-color-overlay` | `#ffffff` | `#1d1e1f` |
| `--mt-border-color` | `#dcdfe6` | `#4c4d4f` |
| `--mt-fill-color-light` | `#f5f7fa` | `#262727` |

Brand colors (`--mt-color-primary`, etc.) stay consistent across both themes and need no overrides.

::: tip
If your own components use `--mt-*` tokens too, they get dark mode support for free.
:::
