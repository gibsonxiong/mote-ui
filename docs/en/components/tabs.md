# Tabs

<script setup>
import { ref } from 'vue'

const active = ref('fruit')
const cardActive = ref(0)
</script>

Tabs for switching between content groups, with line and card styles.

## Basic Usage

`v-model` binds the active pane (`name` or index); the underline slides as you switch:

<PhonePreview>
  <MtTabs v-model="active">
    <MtTabPane name="fruit" title="Fruit">Fruit related content</MtTabPane>
    <MtTabPane name="vegetable" title="Vegetable">Vegetable related content</MtTabPane>
    <MtTabPane name="drink" title="Drink">Drink related content</MtTabPane>
  </MtTabs>
</PhonePreview>

```vue
<script setup>
const active = ref('fruit')
</script>

<template>
  <MtTabs v-model="active">
    <MtTabPane name="fruit" title="Fruit">Fruit related content</MtTabPane>
    <MtTabPane name="vegetable" title="Vegetable">Vegetable related content</MtTabPane>
    <MtTabPane name="drink" title="Drink">Drink related content</MtTabPane>
  </MtTabs>
</template>
```

## Card Style

`type="card"` renders a segmented-control style:

<PhonePreview>
  <MtTabs v-model="cardActive" type="card">
    <MtTabPane title="All">All content</MtTabPane>
    <MtTabPane title="Active">Active content</MtTabPane>
    <MtTabPane title="Done">Done content</MtTabPane>
  </MtTabs>
</PhonePreview>

```vue
<MtTabs v-model="active" type="card">...</MtTabs>
```

## Disabled Panes

<PhonePreview>
  <MtTabs :model-value="0">
    <MtTabPane title="Enabled">Normal pane</MtTabPane>
    <MtTabPane title="Disabled" disabled>Cannot switch here</MtTabPane>
  </MtTabs>
</PhonePreview>

```vue
<MtTabs>
  <MtTabPane title="Enabled">Normal pane</MtTabPane>
  <MtTabPane title="Disabled" disabled>Cannot switch here</MtTabPane>
</MtTabs>
```

## API

### Tabs Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Active pane (`name` or index) | `number \| string` | `0` |
| type | Header style | `'line' \| 'card'` | `'line'` |

### Tabs Events

| Event | Description | Parameters |
| --- | --- | --- |
| change | Emitted when the pane changes | `(value: number \| string)` |

### TabPane Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| name | Unique identifier; defaults to the index | `number \| string` | - |
| title | Header title text | `string` | - |
| disabled | Whether it is disabled | `boolean` | `false` |

### TabPane Slots

| Slot | Description |
| --- | --- |
| default | Pane content |
