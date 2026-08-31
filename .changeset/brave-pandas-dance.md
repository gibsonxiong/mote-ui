---
"mote-ui": minor
---

Add per-component subpath exports (`mote-ui/popup`, `mote-ui/button`, …) backed by a `preserveModules` build, so bundlers can tree-shake unused components and `@mote-ui/icons` when importing named exports from the main entry. Styles remain bundled in a single `dist/style.css`.
