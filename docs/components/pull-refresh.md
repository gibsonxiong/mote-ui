# PullRefresh 下拉刷新

<script setup>
import { ref } from 'vue'

const refreshing = ref(false)
const refreshCount = ref(0)

function onRefresh() {
  setTimeout(() => {
    refreshCount.value += 1
    refreshing.value = false
  }, 1000)
}
</script>

在列表顶部下拉触发刷新，通常与 List 无限滚动组合使用。

## 基础用法

通过 `v-model:loading` 绑定刷新状态，下拉超过头部高度释放后触发 `refresh`：

<PhonePreview>
  <MtPullRefresh v-model:loading="refreshing" @refresh="onRefresh">
    <div style="padding: 16px; text-align: center; color: var(--mt-text-color-secondary)">
      下拉试试（已刷新 {{ refreshCount }} 次）
    </div>
  </MtPullRefresh>
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const loading = ref(false)

async function onRefresh() {
  await reloadFirstPage()
  loading.value = false
}
<\/script>

<template>
  <MtPullRefresh v-model:loading="loading" @refresh="onRefresh">
    <!-- 列表内容 -->
  </MtPullRefresh>
</template>
```

## 禁用

`disabled` 禁用下拉刷新：

<PhonePreview>
  <MtPullRefresh v-model:loading="refreshing" disabled>
    <div style="padding: 16px; text-align: center; color: var(--mt-text-color-secondary)">
      禁用下拉刷新
    </div>
  </MtPullRefresh>
</PhonePreview>

```vue
<MtPullRefresh v-model:loading="loading" disabled @refresh="onRefresh">
  <!-- 列表内容 -->
</MtPullRefresh>
```

## 自定义成功文案

`success-text` 自定义成功提示，`success-duration` 控制展示时长（设为 `0` 关闭）：

<PhonePreview>
  <MtPullRefresh v-model:loading="refreshing" success-text="刷新成功啦" @refresh="onRefresh">
    <div style="padding: 16px; text-align: center; color: var(--mt-text-color-secondary)">
      下拉试试
    </div>
  </MtPullRefresh>
</PhonePreview>

```vue
<MtPullRefresh
  v-model:loading="loading"
  success-text="刷新成功啦"
  :success-duration="1000"
  @refresh="onRefresh"
>
  <!-- 列表内容 -->
</MtPullRefresh>
```

## 交互说明

- 仅在容器滚动到顶部时下拉才会生效
- 下拉距离超过 `head-height` 时提示「释放即可刷新」，释放后进入加载态
- 加载结束后短暂展示成功提示再收起，可用 `success-duration` 调整
- `head` 插槽可自定义整个提示区，通过插槽 prop `status` 区分状态
- 常与 `MtList` 组合：`MtPullRefresh` 包裹 `MtList` 实现下拉刷新 + 上拉加载

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loading / v-model:loading | 是否正在刷新 | `boolean` | `false` |
| head-height | 触发刷新的下拉距离（px） | `number` | `50` |
| success-duration | 成功提示展示时长（ms），非正数不展示 | `number` | `500` |
| success-text | 自定义成功文案 | `string` | 语言包 |
| disabled | 是否禁用下拉 | `boolean` | `false` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| refresh | 释放触发刷新时调用 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 内容区 |
| head | 自定义提示区，插槽 prop：`status`（`pulling` / `loosing` / `loading` / `success`） |
