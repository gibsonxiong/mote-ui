# Popover

A floating menu that pops up next to a trigger element, useful for grouping secondary actions. The panel is mounted to body via Teleport and automatically flips direction to stay within the viewport when near an edge.

<script setup>
import { ref } from 'vue'
import { showToast } from 'mote-ui'

const showBasic = ref(false)
const showIcon = ref(false)

const actions = [
  { text: 'Option One' },
  { text: 'Option Two' },
  { text: 'Option Three' },
]

const iconActions = [
  { text: 'Favorite', icon: 'success' },
  { text: 'Forward', icon: 'arrow-right' },
  { text: 'Delete', icon: 'close', disabled: true },
]

function handleSelect(action) {
  showToast(action.text)
}
</script>

## Basic Usage

`actions` defines the menu items; selecting one emits `select` and closes the popover:

<PhonePreview>
  <div style="display: flex; justify-content: center; padding: 40px 0">
    <MtPopover v-model="showBasic" :actions="actions" @select="handleSelect">
      <template #reference>
        <MtButton size="small">Open Menu</MtButton>
      </template>
    </MtPopover>
  </div>
</PhonePreview>

```vue
<script setup>
const show = ref(false)
const actions = [{ text: 'Option One' }, { text: 'Option Two' }, { text: 'Option Three' }]

function handleSelect(action) {
  showToast(action.text)
}
</script>

<template>
  <MtPopover v-model="show" :actions="actions" @select="handleSelect">
    <template #reference>
      <MtButton size="small">Open Menu</MtButton>
    </template>
  </MtPopover>
</template>
```

## Icons and Disabled Actions

<PhonePreview>
  <div style="display: flex; justify-content: center; padding: 40px 0">
    <MtPopover v-model="showIcon" :actions="iconActions" @select="handleSelect">
      <template #reference>
        <MtButton size="small">More Actions</MtButton>
      </template>
    </MtPopover>
  </div>
</PhonePreview>

```vue
const actions = [
  { text: 'Favorite', icon: 'success' },
  { text: 'Forward', icon: 'arrow-right' },
  { text: 'Delete', icon: 'close', disabled: true },
]
```

## Placement and Alignment

`placement` supports `top` / `bottom` (default) / `left` / `right`, and flips automatically when space is insufficient. `align` controls cross-axis alignment (`start` / `center` / `end`):

```vue
<!-- Right-aligned: panel's right edge aligns with the trigger's right edge -->
<MtPopover placement="bottom" align="end" :actions="actions" />

<!-- Left-aligned -->
<MtPopover placement="bottom" align="start" :actions="actions" />
```

## Keep Open for Multi-select

By default the panel closes after selecting an action; set `:close-on-select="false"` to keep it open (useful for multi-select scenarios):

```vue
<MtPopover v-model="show" :actions="actions" :close-on-select="false" @select="handleSelect" />
```

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| v-model | Whether the popover is shown | `boolean` | `false` |
| placement | Direction of the floating panel, auto-flips when space is insufficient | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` |
| align | Cross-axis alignment | `'start' \| 'center' \| 'end'` | `'center'` |
| actions | Menu actions | `MtPopoverAction[]` | `[]` |
| offset | Gap between the panel and the trigger (px) | `number` | `8` |
| close-on-select | Whether to close after selecting an action | `boolean` | `true` |
| overlay | Whether to show a page overlay | `boolean` | `false` |
| close-on-click-overlay | Whether clicking the overlay closes it | `boolean` | `true` |
| teleport | Teleport target | `string` | `'body'` |
| z-index | Custom z-index; auto-allocated when omitted | `number` | - |
| duration | Transition duration (ms) | `number` | `200` |

### Events

| Name | Description | Arguments |
| --- | --- | --- |
| open | Emitted when the panel starts opening (before transition) | - |
| opened | Emitted when the panel has finished opening (after transition) | - |
| close | Emitted when the panel starts closing (before transition) | - |
| closed | Emitted when the panel has finished closing (after transition) | - |
| select | Emitted when an action is clicked | `(action: MtPopoverAction, index: number)` |
| click-overlay | Emitted when the overlay is clicked | `(event: MouseEvent)` |

### Slots

| Name | Description |
| --- | --- |
| reference | Trigger element |
| default | Custom panel content, takes precedence over `actions` |

### MtPopoverAction

| Field | Description | Type |
| --- | --- | --- |
| text | Action label | `string` |
| icon | Icon name | `MtIconName` |
| disabled | Whether the action is disabled | `boolean` |
