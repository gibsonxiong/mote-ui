# Steps 步骤条

用于展示操作流程的当前进度，`active` 为当前步骤索引（从 0 开始）。

<script setup>
import { ref } from 'vue'

const active = ref(1)

function next() {
  active.value = (active.value + 1) % 4
}
</script>

## 基础用法

`active` 之前的步骤显示为已完成（带对勾），当前步骤高亮：

<PhonePreview>
  <MtSteps :active="1">
    <MtStep title="下单" description="提交订单" />
    <MtStep title="付款" description="完成支付" />
    <MtStep title="发货" description="商家发货" />
    <MtStep title="收货" description="确认收货" />
  </MtSteps>
</PhonePreview>

```vue
<MtSteps :active="1">
  <MtStep title="下单" description="提交订单" />
  <MtStep title="付款" description="完成支付" />
  <MtStep title="发货" description="商家发货" />
  <MtStep title="收货" description="确认收货" />
</MtSteps>
```

## 动态切换

<PhonePreview>
  <MtSteps :active="active">
    <MtStep title="下单" />
    <MtStep title="付款" />
    <MtStep title="发货" />
  </MtSteps>
  <div style="margin-top: 12px">
    <MtButton size="small" @click="next">下一步</MtButton>
  </div>
</PhonePreview>

```vue
<script setup>
const active = ref(0)

function next() {
  active.value = (active.value + 1) % 4
}
</script>

<template>
  <MtSteps :active="active">
    <MtStep title="下单" />
    <MtStep title="付款" />
    <MtStep title="发货" />
  </MtSteps>
  <MtButton size="small" @click="next">下一步</MtButton>
</template>
```

## 垂直方向

<PhonePreview>
  <MtSteps :active="1" direction="vertical">
    <MtStep title="下单" description="2026-08-01 10:00 提交订单" />
    <MtStep title="付款" description="2026-08-01 10:05 完成支付" />
    <MtStep title="发货" description="等待商家发货" />
  </MtSteps>
</PhonePreview>

```vue
<MtSteps :active="1" direction="vertical">
  <MtStep title="下单" description="2026-08-01 10:00 提交订单" />
  <MtStep title="付款" description="2026-08-01 10:05 完成支付" />
  <MtStep title="发货" description="等待商家发货" />
</MtSteps>
```

## API

### MtSteps Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| active | 当前步骤索引（从 0 开始） | `number` | `0` |
| direction | 展示方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |

### MtStep Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 步骤标题 | `string` | - |
| description | 步骤描述 | `string` | - |

### MtStep Slots

| 名称 | 说明 |
| --- | --- |
| title | 自定义标题 |
| description | 自定义描述 |
