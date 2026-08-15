# Popover

A floating menu that pops up next to a trigger element, useful for grouping secondary actions.

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

## Placement

`placement` supports `top` / `bottom` (default) / `left` / `right`:

```vue
<MtPopover placement="top" :actions="actions" />
```

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| v-model | Whether the popover is shown | `boolean` | `false` |
| placement | Direction of the floating panel | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` |
| actions | Menu actions | `MtPopoverAction[]` | `[]` |

### Events

| Name | Description | Arguments |
| --- | --- | --- |
| open | Emitted when the panel opens | - |
| close | Emitted when the panel closes | - |
| select | Emitted when an action is clicked | `(action: MtPopoverAction, index: number)` |

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
