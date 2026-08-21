# Pagination

<script setup>
import { ref } from 'vue'

const page = ref(1)
</script>

Breaks down large datasets into pages.

## Basic Usage

Bind the current page with `v-model`; `total-items` and `items-per-page` are used to derive the total page count:

<PhonePreview>
  <MtPagination v-model="page" :total-items="60" :items-per-page="10" />
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const page = ref(1)
</script>

<template>
  <MtPagination v-model="page" :total-items="60" :items-per-page="10" />
</template>
```

## Fixed Page Count

Specify the total page count directly with `page-count`:

<PhonePreview>
  <MtPagination v-model="page" :page-count="8" />
</PhonePreview>

```vue
<MtPagination v-model="page" :page-count="8" />
```

## Simple Mode

`mode="simple"` shows only the current page and total page count:

<PhonePreview>
  <MtPagination v-model="page" mode="simple" :total-items="60" :items-per-page="10" />
</PhonePreview>

```vue
<MtPagination v-model="page" mode="simple" :total-items="60" :items-per-page="10" />
```

## Custom Button Text

`prev-text` / `next-text` customize the previous and next button text; an arrow icon renders when empty:

<PhonePreview>
  <MtPagination v-model="page" :total-items="60" prev-text="Prev" next-text="Next" />
</PhonePreview>

```vue
<MtPagination v-model="page" :total-items="60" prev-text="Prev" next-text="Next" />
```

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Current page number | `number` | `1` |
| mode | Pagination mode | `'multi' \| 'simple'` | `'multi'` |
| prev-text | Previous button text; renders an arrow when empty | `string` | - |
| next-text | Next button text; renders an arrow when empty | `string` | - |
| page-count | Total page count; derived from total-items/items-per-page when omitted | `number` | - |
| total-items | Total number of items | `number` | `0` |
| items-per-page | Items per page | `number` | `10` |
| show-page-size | Number of page buttons to display | `number` | `5` |
| force-ellipses | Force the leading and trailing ellipses to always render | `boolean` | `false` |

### Events

| Name | Description | Arguments |
| --- | --- | --- |
| update:modelValue | Emitted when the page changes | `(value: number)` |
| change | Emitted when the page changes | `(value: number)` |