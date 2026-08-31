---
"mote-ui": minor
---

Rewrite the Popover component: the panel now Teleports to `body`, flips direction automatically near viewport edges (with `clamp` fallback) and repositions on scroll/resize. Add `align`, `offset`, `close-on-select`, `overlay`, `close-on-click-overlay`, `teleport` and `duration` props. Align events with the four-phase `open`/`opened`/`close`/`closed` lifecycle (breaking: the previous `open`/`close` events are replaced) and add full accessibility (ARIA roles, `aria-expanded`/`aria-haspopup`, keyboard navigation and focus management).
