# Area 省市区选择

<script setup>
import { ref } from 'vue'

const value = ref('')
const show = ref(false)

const areaList = {
  province_list: {
    330000: '浙江省',
    320000: '江苏省',
  },
  city_list: {
    330100: '杭州市',
    330200: '宁波市',
    320100: '南京市',
    320200: '苏州市',
  },
  county_list: {
    330101: '上城区',
    330102: '拱墅区',
    330201: '海曙区',
    330202: '江北区',
    320101: '玄武区',
    320102: '秦淮区',
    320201: '姑苏区',
    320202: '虎丘区',
  },
}
</script>

省市区选择器，基于 `MtPicker` 的级联列实现，通过 `area-list` 传入地区数据。

## 基础用法

<PhonePreview>
  <MtArea v-model="value" :area-list="areaList" title="选择地区" />
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const value = ref('')

const areaList = {
  province_list: { 330000: '浙江省', 320000: '江苏省' },
  city_list: { 330100: '杭州市', 330200: '宁波市' },
  county_list: { 330101: '上城区', 330102: '拱墅区' },
}
</script>

<template>
  <MtArea v-model="value" :area-list="areaList" title="选择地区" />
</template>
```

## 两列模式

`columns-num` 设为 `2` 时仅显示省 / 市两级：

<PhonePreview>
  <MtArea v-model="value" :area-list="areaList" :columns-num="2" title="选择省市" />
</PhonePreview>

```vue
<MtArea v-model="value" :area-list="areaList" :columns-num="2" />
```

## 配合弹层

选择器本身不含弹层，配合 `MtPopup` 底部弹出：

<PhonePreview>
  <div style="display: flex; align-items: center; gap: 8px">
    <MtButton @click="show = true">选择地区</MtButton>
    <span>已选编码：{{ value || '未选择' }}</span>
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
<MtButton @click="show = true">选择地区</MtButton>
<MtPopup v-model="show" position="bottom" round>
  <MtArea
    v-model="value"
    :area-list="areaList"
    @confirm="show = false"
    @cancel="show = false"
  />
</MtPopup>
```

## 确认事件

点击确认后触发 `confirm`，参数为 `{ code, province, city, county }`：

```js
function onConfirm(detail) {
  // detail.code 为最深一级的地区编码
  // detail.province / detail.city / detail.county 为各级名称
  value.value = detail.code
}
```

## 交互说明

- 地区数据使用经典三表结构：`province_list` / `city_list` / `county_list`，各表以地区编码为键、名称为值
- 通过编码前缀自动级联：省级取前两位、地级取前四位匹配下级数据
- 标题、确认 / 取消按钮文案默认走国际化配置，可用 `title` / `confirm-button-text` / `cancel-button-text` 覆盖
- 设置 `v-model` 后可回显已选地区，点击确认更新选中值

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 选中的地区编码 | `string` | - |
| area-list | 地区数据（三表结构） | `MtAreaList` | `{}` |
| columns-num | 显示列数：`2`（省 / 市）或 `3`（省 / 市 / 区） | `number` | `3` |
| title | 标题，默认取语言包 `area.title` | `string` | - |
| confirm-button-text | 确认按钮文案 | `string` | - |
| cancel-button-text | 取消按钮文案 | `string` | - |
| option-height | 单行高度（px） | `number` | `44` |
| visible-option-num | 可见行数 | `number` | `6` |

### AreaList 数据结构

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| province_list | 省份列表，编码 → 名称 | `Record<string, string>` |
| city_list | 城市列表，编码 → 名称 | `Record<string, string>` |
| county_list | 区县列表，编码 → 名称 | `Record<string, string>` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| confirm | 点击确认 | `(detail: MtAreaEvent)` |
| cancel | 点击取消 | - |

### MtAreaEvent 结构

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| code | 最深一级的地区编码 | `string` |
| province | 省份名称 | `string` |
| city | 城市名称 | `string` |
| county | 区县名称 | `string` |