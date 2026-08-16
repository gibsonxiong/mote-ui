# TabBar 标签栏

<script setup>
import { ref } from 'vue'
import { showToast } from 'mote-ui'

const active = ref(0)
const namedActive = ref('home')
</script>

页面底部的标签栏，用于在多个视图之间切换。

## 基础用法

默认以索引作为标识，`v-model` 绑定当前激活项：

<PhonePreview>
  <MtTabBar v-model="active" @change="(value) => showToast(`切换到第 ${value} 项`)">
    <MtTabBarItem title="首页" />
    <MtTabBarItem title="发现" />
    <MtTabBarItem title="消息" />
    <MtTabBarItem title="我的" />
  </MtTabBar>
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const active = ref(0)
<\/script>

<template>
  <MtTabBar v-model="active">
    <MtTabBarItem title="首页" />
    <MtTabBarItem title="发现" />
    <MtTabBarItem title="消息" />
    <MtTabBarItem title="我的" />
  </MtTabBar>
</template>
```

## 徽标与圆点

`badge` 显示数字徽标（超过 `99` 显示为 `99+`），`dot` 显示小红点：

<PhonePreview>
  <MtTabBar :model-value="0">
    <MtTabBarItem title="首页" />
    <MtTabBarItem title="消息" :badge="8" />
    <MtTabBarItem title="收藏" :badge="120" />
    <MtTabBarItem title="动态" dot />
  </MtTabBar>
</PhonePreview>

```vue
<MtTabBar>
  <MtTabBarItem title="消息" :badge="8" />
  <MtTabBarItem title="收藏" :badge="120" />
  <MtTabBarItem title="动态" dot />
</MtTabBar>
```

## 命名与图标

通过 `name` 使用字符串标识；`icon` 使用内置图标名，或通过插槽放任意内容：

<PhonePreview>
  <MtTabBar v-model="namedActive">
    <MtTabBarItem name="home" title="首页">
      <template #icon>🏠</template>
    </MtTabBarItem>
    <MtTabBarItem name="search" title="发现" icon="arrow-up" />
    <MtTabBarItem name="mine" title="我的">
      <template #icon>👤</template>
    </MtTabBarItem>
  </MtTabBar>
</PhonePreview>

```vue
<MtTabBar v-model="active">
  <MtTabBarItem name="home" title="首页">
    <template #icon>🏠</template>
  </MtTabBarItem>
  <MtTabBarItem name="search" title="发现" icon="arrow-up" />
</MtTabBar>
```

## 禁用项

`disabled` 的项不可点击：

<PhonePreview>
  <MtTabBar :model-value="0">
    <MtTabBarItem title="首页" />
    <MtTabBarItem title="发现" />
    <MtTabBarItem title="消息" disabled />
  </MtTabBar>
</PhonePreview>

```vue
<MtTabBar>
  <MtTabBarItem title="首页" />
  <MtTabBarItem title="发现" />
  <MtTabBarItem title="消息" disabled />
</MtTabBar>
```

## 交互说明

- 未绑定 `v-model` 时默认激活第一项
- `fixed` 固定到页面底部，配合 `placeholder` 渲染等高的占位元素避免遮挡内容
- `safe-area-inset-bottom` 适配底部安全区（全面屏手势条）
- `change` 在切换到不同项时触发，参数为 `name` 或索引

## API

### TabBar Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 当前激活项（`name` 或索引） | `number \| string` | `0` |
| fixed | 固定在页面底部 | `boolean` | `false` |
| placeholder | fixed 时渲染占位元素 | `boolean` | `false` |
| border | 显示顶部边框 | `boolean` | `true` |
| safe-area-inset-bottom | 底部安全区适配 | `boolean` | `false` |
| z-index | 自定义层级 | `number` | - |

### TabBar Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 切换激活项 | `(value: number \| string)` |

### TabBarItem Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 唯一标识，默认为索引 | `number \| string` | - |
| title | 标题文字 | `string` | - |
| icon | 内置图标名 | `string` | - |
| badge | 徽标内容，数字超过 99 显示 `99+` | `number \| string` | - |
| dot | 显示小红点 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |

### TabBarItem Slots

| 名称 | 说明 |
| --- | --- |
| icon | 自定义图标 |
| title | 自定义标题 |
