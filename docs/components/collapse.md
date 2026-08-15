# Collapse 折叠面板

将一组内容收纳进可折叠的面板中，`v-model` 为展开面板的 `name` 数组。

<script setup>
import { ref } from 'vue'

const activeNames = ref(['first'])
const accordionName = ref(['first'])
</script>

## 基础用法

可同时展开多个面板：

<PhonePreview>
  <MtCollapse v-model="activeNames">
    <MtCollapseItem title="标题一" name="first">内容一</MtCollapseItem>
    <MtCollapseItem title="标题二" name="second">内容二</MtCollapseItem>
    <MtCollapseItem title="标题三" name="third">内容三</MtCollapseItem>
  </MtCollapse>
</PhonePreview>

```vue
<script setup>
const activeNames = ref(['first'])
</script>

<template>
  <MtCollapse v-model="activeNames">
    <MtCollapseItem title="标题一" name="first">内容一</MtCollapseItem>
    <MtCollapseItem title="标题二" name="second">内容二</MtCollapseItem>
    <MtCollapseItem title="标题三" name="third">内容三</MtCollapseItem>
  </MtCollapse>
</template>
```

## 手风琴模式

`accordion` 开启后同一时间只能展开一个面板：

<PhonePreview>
  <MtCollapse v-model="accordionName" accordion>
    <MtCollapseItem title="标题一" name="first">内容一</MtCollapseItem>
    <MtCollapseItem title="标题二" name="second">内容二</MtCollapseItem>
  </MtCollapse>
</PhonePreview>

```vue
<MtCollapse v-model="accordionName" accordion>
  <MtCollapseItem title="标题一" name="first">内容一</MtCollapseItem>
  <MtCollapseItem title="标题二" name="second">内容二</MtCollapseItem>
</MtCollapse>
```

## 禁用状态

<PhonePreview>
  <MtCollapse>
    <MtCollapseItem title="可展开" name="first">内容一</MtCollapseItem>
    <MtCollapseItem title="已禁用" name="second" disabled>内容二</MtCollapseItem>
  </MtCollapse>
</PhonePreview>

```vue
<MtCollapse>
  <MtCollapseItem title="可展开" name="first">内容一</MtCollapseItem>
  <MtCollapseItem title="已禁用" name="second" disabled>内容二</MtCollapseItem>
</MtCollapse>
```

## API

### MtCollapse Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 展开面板的 `name` 数组 | `MtCollapseValue[]` | `[]` |
| accordion | 是否开启手风琴模式 | `boolean` | `false` |

### MtCollapse Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 展开状态变化时触发 | `(names: MtCollapseValue[])` |

### MtCollapseItem Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 唯一标识，默认为面板索引 | `number \| string` | - |
| title | 面板标题 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |

### MtCollapseItem Slots

| 名称 | 说明 |
| --- | --- |
| default | 面板内容 |
| title | 自定义标题 |

### 类型定义

`MtCollapseValue = number | string`
