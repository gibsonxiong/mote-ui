# Area

<script setup>
import { ref } from 'vue'

const value = ref('')
const show = ref(false)

const areaList = {
  province_list: {
    330000: 'Zhejiang',
    320000: 'Jiangsu',
  },
  city_list: {
    330100: 'Hangzhou',
    330200: 'Ningbo',
    320100: 'Nanjing',
    320200: 'Suzhou',
  },
  county_list: {
    330101: 'Shangcheng',
    330102: 'Gongshu',
    330201: 'Haishu',
    330202: 'Jiangbei',
    320101: 'Xuanwu',
    320102: 'Qinhuai',
    320201: 'Gusu',
    320202: 'Huqiu',
  },
}
</script>

A region selector built on the cascading columns of `MtPicker`. Pass region data via `area-list`.

## Basic Usage

<PhonePreview>
  <MtArea v-model="value" :area-list="areaList" title="Select region" />
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const value = ref('')

const areaList = {
  province_list: { 330000: 'Zhejiang', 320000: 'Jiangsu' },
  city_list: { 330100: 'Hangzhou', 330200: 'Ningbo' },
  county_list: { 330101: 'Shangcheng', 330102: 'Gongshu' },
}
</script>

<template>
  <MtArea v-model="value" :area-list="areaList" title="Select region" />
</template>
```

## Two-column Mode

Set `columns-num` to `2` to show only the province / city levels:

<PhonePreview>
  <MtArea v-model="value" :area-list="areaList" :columns-num="2" title="Select province and city" />
</PhonePreview>

```vue
<MtArea v-model="value" :area-list="areaList" :columns-num="2" />
```

## With Popup

The selector itself does not include a popup; wrap it with `MtPopup` for a bottom sheet:

<PhonePreview>
  <div style="display: flex; align-items: center; gap: 8px">
    <MtButton @click="show = true">Select region</MtButton>
    <span>Selected code: {{ value || 'None' }}</span>
  </div>
  <MtPopup v-model="show" position="bottom" round>
    <MtArea
      v-model="value"
      :area-list="areaList"
      @confirm="show = false"
      @cancel="show = false"
    />
  </MtPopup>
</PhonePreview>

```vue
<MtButton @click="show = true">Select region</MtButton>
<MtPopup v-model="show" position="bottom" round>
  <MtArea
    v-model="value"
    :area-list="areaList"
    @confirm="show = false"
    @cancel="show = false"
  />
</MtPopup>
```

## Confirm Event

Confirming emits `confirm` with `{ code, province, city, county }`:

```js
function onConfirm(detail) {
  // detail.code is the deepest region code
  // detail.province / detail.city / detail.county are the level names
  value.value = detail.code
}
```

## Interaction Notes

- Region data uses the classic three-table structure: `province_list` / `city_list` / `county_list`, each keyed by region code with the name as the value
- Levels cascade automatically by code prefix: province matches the first two digits, city matches the first four digits
- The title and confirm / cancel button text follow i18n configuration by default, and can be overridden via `title` / `confirm-button-text` / `cancel-button-text`
- Setting `v-model` displays the selected region, and confirming updates the selected value

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Selected region code | `string` | - |
| area-list | Region data (three-table structure) | `MtAreaList` | `{}` |
| columns-num | Column count: `2` (province / city) or `3` (province / city / district) | `number` | `3` |
| title | Title, defaults to the locale `area.title` | `string` | - |
| confirm-button-text | Confirm button text | `string` | - |
| cancel-button-text | Cancel button text | `string` | - |
| option-height | Row height (px) | `number` | `44` |
| visible-option-num | Number of visible rows | `number` | `6` |

### AreaList Structure

| Field | Description | Type |
| --- | --- | --- |
| province_list | Province list, code → name | `Record<string, string>` |
| city_list | City list, code → name | `Record<string, string>` |
| county_list | District list, code → name | `Record<string, string>` |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| confirm | Emitted when confirm is tapped | `(detail: MtAreaEvent)` |
| cancel | Emitted when cancel is tapped | - |

### MtAreaEvent Structure

| Field | Description | Type |
| --- | --- | --- |
| code | Deepest region code | `string` |
| province | Province name | `string` |
| city | City name | `string` |
| county | District name | `string` |