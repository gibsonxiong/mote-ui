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
const active = ref(0)
</script>

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

## 命名与图标插槽

通过 `name` 使用字符串标识；`icon` 插槽可放入任意图标内容：

<PhonePreview>
  <MtTabBar v-model="namedActive">
    <MtTabBarItem name="home" title="首页">
      <template #icon>🏠</template>
    </MtTabBarItem>
    <MtTabBarItem name="search" title="发现">
      <template #icon>🔍</template>
    </MtTabBarItem>
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
</MtTabBar>
```

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
