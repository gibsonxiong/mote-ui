# Sidebar 侧边导航

<script setup>
import { ref } from 'vue'

const active = ref(0)
const namedActive = ref('tab2')
</script>

垂直排列的侧边导航，常用于页面左侧的分类切换。

## 基础用法

默认以索引作为标识，`v-model` 绑定当前激活项：

<PhonePreview>
  <MtSidebar v-model="active">
    <MtSidebarItem title="标签一" />
    <MtSidebarItem title="标签二" />
    <MtSidebarItem title="标签三" />
  </MtSidebar>
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <MtSidebar v-model="active">
    <MtSidebarItem title="标签一" />
    <MtSidebarItem title="标签二" />
    <MtSidebarItem title="标签三" />
  </MtSidebar>
</template>
```

## 徽标与圆点

`badge` 显示数字徽标（超过 `99` 显示为 `99+`），`dot` 显示小红点：

<PhonePreview>
  <MtSidebar :model-value="0">
    <MtSidebarItem title="标签一" />
    <MtSidebarItem title="消息" :badge="8" />
    <MtSidebarItem title="收藏" :badge="120" />
    <MtSidebarItem title="动态" dot />
  </MtSidebar>
</PhonePreview>

```vue
<MtSidebar>
  <MtSidebarItem title="消息" :badge="8" />
  <MtSidebarItem title="收藏" :badge="120" />
  <MtSidebarItem title="动态" dot />
</MtSidebar>
```

## 命名标识

通过 `name` 使用字符串标识：

<PhonePreview>
  <MtSidebar v-model="namedActive">
    <MtSidebarItem name="tab1" title="标签一" />
    <MtSidebarItem name="tab2" title="标签二" />
    <MtSidebarItem name="tab3" title="标签三" disabled />
  </MtSidebar>
</PhonePreview>

```vue
<MtSidebar v-model="active">
  <MtSidebarItem name="tab1" title="标签一" />
  <MtSidebarItem name="tab2" title="标签二" />
</MtSidebar>
```

## 交互说明

- 未绑定 `v-model` 时默认激活第一项
- `disabled` 的项不可点击
- `change` 在切换到不同项时触发，参数为 `name` 或索引

## API

### Sidebar Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 当前激活项（`name` 或索引） | `number \| string` | `0` |

### Sidebar Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 切换激活项 | `(value: number \| string)` |

### SidebarItem Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 唯一标识，默认为索引 | `number \| string` | - |
| title | 标题文字 | `string` | - |
| badge | 徽标内容，数字超过 99 显示 `99+` | `number \| string` | - |
| dot | 显示小红点 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |