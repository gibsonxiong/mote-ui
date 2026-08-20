# TreeSelect

<script setup>
import { ref } from 'vue'

const activeId = ref(1)
const mainActiveIndex = ref(0)

const items = [
  {
    text: 'Zhejiang',
    children: [
      { id: 1, text: 'Hangzhou' },
      { id: 2, text: 'Ningbo' },
      { id: 3, text: 'Wenzhou' },
    ],
  },
  {
    text: 'Jiangsu',
    children: [
      { id: 4, text: 'Nanjing' },
      { id: 5, text: 'Suzhou' },
      { id: 6, text: 'Wuxi' },
    ],
  },
  {
    text: 'Fujian',
    badge: 3,
    children: [
      { id: 7, text: 'Fuzhou' },
      { id: 8, text: 'Xiamen' },
    ],
  },
]
</script>

A category selector with navigation on the left and content on the right, commonly used for product categories, region categories and similar scenarios.

## Basic Usage

Use `v-model:active-id` to bind the selected content item, and `v-model:main-active-index` to bind the active index of the left navigation:

<PhonePreview>
  <MtTreeSelect
    :items="items"
    v-model:active-id="activeId"
    v-model:main-active-index="mainActiveIndex"
  />
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const activeId = ref(1)
const mainActiveIndex = ref(0)

const items = [
  {
    text: 'Zhejiang',
    children: [
      { id: 1, text: 'Hangzhou' },
      { id: 2, text: 'Ningbo' },
    ],
  },
  {
    text: 'Jiangsu',
    children: [
      { id: 4, text: 'Nanjing' },
      { id: 5, text: 'Suzhou' },
    ],
  },
]
</script>

<template>
  <MtTreeSelect
    :items="items"
    v-model:active-id="activeId"
    v-model:main-active-index="mainActiveIndex"
  />
</template>
```

## Badges and Dots

Navigation items support the `badge` number and the `dot` indicator, and `max` limits the badge display:

<PhonePreview>
  <MtTreeSelect :items="items" :active-id="1" :main-active-index="0" :max="2" />
</PhonePreview>

```vue
<MtTreeSelect :items="items" :active-id="1" :main-active-index="0" :max="2" />
```

## Interaction Notes

- Tapping a left navigation item emits `click-nav` with the item index; tapping a content item emits `click-item`
- Navigation or content items in `disabled` state do not respond to taps
- When `main-active-index` is not provided, the first navigation item is activated by default

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| items | Tree data; left navigation items contain nested content | `MtTreeSelectItem[]` | `[]` |
| activeId / v-model:active-id | Selected content item id | `MtTreeSelectId` | - |
| mainActiveIndex / v-model:main-active-index | Active index of the left navigation | `number` | `0` |
| height | Height; numbers are treated as px | `number \| string` | `300` |
| max | Show `${max}+` when the badge exceeds this value | `number` | - |

### Item Structure (navigation item)

| Field | Description | Type |
| --- | --- | --- |
| text | Navigation item text | `string` |
| badge | Number badge | `number \| string` |
| dot | Whether to show a dot | `boolean` |
| disabled | Whether it is disabled | `boolean` |
| children | Corresponding content items | `MtTreeSelectChild[]` |

### Child Structure (content item)

| Field | Description | Type |
| --- | --- | --- |
| id | Unique identifier | `MtTreeSelectId` |
| text | Display text | `string` |
| disabled | Whether it is disabled | `boolean` |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| click-item | Emitted when a content item is tapped | `(item: MtTreeSelectChild)` |
| click-nav | Emitted when a navigation item is tapped | `(index: number)` |