# Tabs 选项卡

<script setup>
import { ref } from 'vue'

const active = ref('fruit')
const cardActive = ref(0)
</script>

内容分组切换的选项卡，支持线条与卡片两种风格。

## 基础用法

`v-model` 绑定当前激活的面板（`name` 或索引），下方线条随切换滑动：

<PhonePreview>
  <MtTabs v-model="active">
    <MtTabPane name="fruit" title="水果">水果相关的内容</MtTabPane>
    <MtTabPane name="vegetable" title="蔬菜">蔬菜相关的内容</MtTabPane>
    <MtTabPane name="drink" title="饮品">饮品相关的内容</MtTabPane>
  </MtTabs>
</PhonePreview>

```vue
<script setup>
const active = ref('fruit')
</script>

<template>
  <MtTabs v-model="active">
    <MtTabPane name="fruit" title="水果">水果相关的内容</MtTabPane>
    <MtTabPane name="vegetable" title="蔬菜">蔬菜相关的内容</MtTabPane>
    <MtTabPane name="drink" title="饮品">饮品相关的内容</MtTabPane>
  </MtTabs>
</template>
```

## 卡片风格

`type="card"` 渲染为分段控件风格：

<PhonePreview>
  <MtTabs v-model="cardActive" type="card">
    <MtTabPane title="全部">全部内容</MtTabPane>
    <MtTabPane title="进行中">进行中的内容</MtTabPane>
    <MtTabPane title="已完成">已完成的内容</MtTabPane>
  </MtTabs>
</PhonePreview>

```vue
<MtTabs v-model="active" type="card">...</MtTabs>
```

## 禁用面板

<PhonePreview>
  <MtTabs :model-value="0">
    <MtTabPane title="可用">正常面板</MtTabPane>
    <MtTabPane title="禁用" disabled>不可切换到这里</MtTabPane>
  </MtTabs>
</PhonePreview>

```vue
<MtTabs>
  <MtTabPane title="可用">正常面板</MtTabPane>
  <MtTabPane title="禁用" disabled>不可切换到这里</MtTabPane>
</MtTabs>
```

## API

### Tabs Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 当前激活面板（`name` 或索引） | `number \| string` | `0` |
| type | 头部风格 | `'line' \| 'card'` | `'line'` |

### Tabs Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 切换面板 | `(value: number \| string)` |

### TabPane Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 唯一标识，默认为索引 | `number \| string` | - |
| title | 头部标题文字 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |

### TabPane Slots

| 名称 | 说明 |
| --- | --- |
| default | 面板内容 |
