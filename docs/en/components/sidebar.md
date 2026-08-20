# Sidebar

<script setup>
import { ref } from 'vue'

const active = ref(0)
const namedActive = ref('tab2')
</script>

A vertically stacked sidebar navigation, commonly used for category switching on the left side of a page.

## Basic Usage

By default, the index is used as the identifier, and `v-model` binds the active item:

<PhonePreview>
  <MtSidebar v-model="active">
    <MtSidebarItem title="Tab 1" />
    <MtSidebarItem title="Tab 2" />
    <MtSidebarItem title="Tab 3" />
  </MtSidebar>
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <MtSidebar v-model="active">
    <MtSidebarItem title="Tab 1" />
    <MtSidebarItem title="Tab 2" />
    <MtSidebarItem title="Tab 3" />
  </MtSidebar>
</template>
```

## Badges and Dots

`badge` shows a number badge (`99+` when it exceeds `99`), and `dot` shows a small dot:

<PhonePreview>
  <MtSidebar :model-value="0">
    <MtSidebarItem title="Tab 1" />
    <MtSidebarItem title="Messages" :badge="8" />
    <MtSidebarItem title="Favorites" :badge="120" />
    <MtSidebarItem title="Activity" dot />
  </MtSidebar>
</PhonePreview>

```vue
<MtSidebar>
  <MtSidebarItem title="Messages" :badge="8" />
  <MtSidebarItem title="Favorites" :badge="120" />
  <MtSidebarItem title="Activity" dot />
</MtSidebar>
```

## Named Identifier

Use `name` for a string identifier:

<PhonePreview>
  <MtSidebar v-model="namedActive">
    <MtSidebarItem name="tab1" title="Tab 1" />
    <MtSidebarItem name="tab2" title="Tab 2" />
    <MtSidebarItem name="tab3" title="Tab 3" disabled />
  </MtSidebar>
</PhonePreview>

```vue
<MtSidebar v-model="active">
  <MtSidebarItem name="tab1" title="Tab 1" />
  <MtSidebarItem name="tab2" title="Tab 2" />
</MtSidebar>
```

## Interaction Notes

- When `v-model` is not bound, the first item is activated by default
- Items in `disabled` state cannot be tapped
- `change` is emitted when the active item changes, with `name` or the index as the parameter

## API

### Sidebar Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Active item (`name` or index) | `number \| string` | `0` |

### Sidebar Events

| Event | Description | Parameters |
| --- | --- | --- |
| change | Emitted when the active item changes | `(value: number \| string)` |

### SidebarItem Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| name | Unique identifier, defaults to the index | `number \| string` | - |
| title | Title text | `string` | - |
| badge | Badge content, shows `99+` when the number exceeds 99 | `number \| string` | - |
| dot | Whether to show a dot | `boolean` | `false` |
| disabled | Whether it is disabled | `boolean` | `false` |