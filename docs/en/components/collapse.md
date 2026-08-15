# Collapse

Groups content into collapsible panels. `v-model` is the array of expanded panel `name`s.

<script setup>
import { ref } from 'vue'

const activeNames = ref(['first'])
const accordionName = ref(['first'])
</script>

## Basic Usage

Multiple panels can stay expanded at once:

<PhonePreview>
  <MtCollapse v-model="activeNames">
    <MtCollapseItem title="Title One" name="first">Content one</MtCollapseItem>
    <MtCollapseItem title="Title Two" name="second">Content two</MtCollapseItem>
    <MtCollapseItem title="Title Three" name="third">Content three</MtCollapseItem>
  </MtCollapse>
</PhonePreview>

```vue
<script setup>
const activeNames = ref(['first'])
</script>

<template>
  <MtCollapse v-model="activeNames">
    <MtCollapseItem title="Title One" name="first">Content one</MtCollapseItem>
    <MtCollapseItem title="Title Two" name="second">Content two</MtCollapseItem>
    <MtCollapseItem title="Title Three" name="third">Content three</MtCollapseItem>
  </MtCollapse>
</template>
```

## Accordion

`accordion` allows only one expanded panel at a time:

<PhonePreview>
  <MtCollapse v-model="accordionName" accordion>
    <MtCollapseItem title="Title One" name="first">Content one</MtCollapseItem>
    <MtCollapseItem title="Title Two" name="second">Content two</MtCollapseItem>
  </MtCollapse>
</PhonePreview>

```vue
<MtCollapse v-model="accordionName" accordion>
  <MtCollapseItem title="Title One" name="first">Content one</MtCollapseItem>
  <MtCollapseItem title="Title Two" name="second">Content two</MtCollapseItem>
</MtCollapse>
```

## Disabled

<PhonePreview>
  <MtCollapse>
    <MtCollapseItem title="Expandable" name="first">Content one</MtCollapseItem>
    <MtCollapseItem title="Disabled" name="second" disabled>Content two</MtCollapseItem>
  </MtCollapse>
</PhonePreview>

```vue
<MtCollapse>
  <MtCollapseItem title="Expandable" name="first">Content one</MtCollapseItem>
  <MtCollapseItem title="Disabled" name="second" disabled>Content two</MtCollapseItem>
</MtCollapse>
```

## API

### MtCollapse Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| v-model | Names of the expanded panels | `MtCollapseValue[]` | `[]` |
| accordion | Allow only one expanded panel | `boolean` | `false` |

### MtCollapse Events

| Name | Description | Arguments |
| --- | --- | --- |
| change | Emitted when the expanded panels change | `(names: MtCollapseValue[])` |

### MtCollapseItem Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| name | Unique identifier; defaults to the item index | `number \| string` | - |
| title | Panel title | `string` | - |
| disabled | Whether the panel is disabled | `boolean` | `false` |

### MtCollapseItem Slots

| Name | Description |
| --- | --- |
| default | Panel content |
| title | Custom title |

### Types

`MtCollapseValue = number | string`
