# List 列表

<script setup>
import { ref } from 'vue'

const items = ref([])
const loading = ref(false)
const finished = ref(false)
let page = 0

function onLoad() {
  setTimeout(() => {
    page += 1
    for (let index = 0; index < 6; index += 1) {
      items.value.push(`第 ${page} 页 · 第 ${index + 1} 条`)
    }
    loading.value = false
    if (page >= 3) finished.value = true
  }, 500)
}

const errorItems = ref(['项目 1', '项目 2', '项目 3'])
const hasError = ref(true)

function onErrorLoad() {
  hasError.value = false
  errorItems.value.push('项目 4', '项目 5')
}
</script>

滚动加载列表。底部哨兵进入视口附近时自动触发 `load`，直到内容撑满或标记加载完成。

## 基础用法

通过 `v-model:loading` 与 `load` 事件分页拉取数据，全部加载完后设置 `finished`：

<PhonePreview>
  <MtList v-model:loading="loading" :finished="finished" @load="onLoad">
    <div
      v-for="item in items"
      :key="item"
      style="padding: 12px 16px; border-bottom: 1px solid var(--mt-border-color)"
    >
      {{ item }}
    </div>
  </MtList>
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const items = ref([])
const loading = ref(false)
const finished = ref(false)

async function onLoad() {
  const page = await fetchNextPage()
  items.value.push(...page.items)
  loading.value = false
  if (page.isLast) finished.value = true
}
<\/script>

<template>
  <MtList v-model:loading="loading" :finished="finished" @load="onLoad">
    <div v-for="item in items" :key="item.id">{{ item.title }}</div>
  </MtList>
</template>
```

## 错误重试

加载失败时将 `error` 置为 `true`，底部显示错误文案，点击后触发 `load` 重试：

<PhonePreview>
  <MtList v-model:error="hasError" @load="onErrorLoad">
    <div
      v-for="item in errorItems"
      :key="item"
      style="padding: 12px 16px; border-bottom: 1px solid var(--mt-border-color)"
    >
      {{ item }}
    </div>
  </MtList>
</PhonePreview>

```vue
<MtList v-model:loading="loading" v-model:error="error" :finished="finished" @load="onLoad">
  <div v-for="item in items" :key="item.id">{{ item.title }}</div>
</MtList>
```

## 自定义文案

`loading-text` / `finished-text` / `error-text` 自定义底部提示文案：

<PhonePreview>
  <MtList :finished="true" finished-text="—— 没有更多数据了 ——">
    <div
      v-for="item in ['项目 1', '项目 2', '项目 3']"
      :key="item"
      style="padding: 12px 16px; border-bottom: 1px solid var(--mt-border-color)"
    >
      {{ item }}
    </div>
  </MtList>
</PhonePreview>

```vue
<MtList
  :finished="true"
  loading-text="拼命加载中..."
  finished-text="没有更多数据了"
  error-text="加载失败，点击重试"
>
  <!-- ... -->
</MtList>
```

## 交互说明

- 底部哨兵距视口底部小于 `offset` 时触发检查
- 挂载后默认立即检查一次（`immediate-check`），内容不足一屏会连续加载直到撑满
- 一轮加载结束后（`loading` 变为 `false`）自动复查
- `loading` / `finished` / `error` 期间不会重复触发 `load`

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loading / v-model:loading | 是否正在加载 | `boolean` | `false` |
| finished | 是否已加载完成 | `boolean` | `false` |
| error / v-model:error | 是否加载失败 | `boolean` | `false` |
| offset | 触发检查的距底部距离（px） | `number` | `300` |
| immediate-check | 挂载后是否立即检查 | `boolean` | `true` |
| loading-text | 加载中文案 | `string` | 语言包 |
| finished-text | 加载完成文案 | `string` | 语言包 |
| error-text | 错误文案 | `string` | 语言包 |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| load | 需要加载更多时触发 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 列表内容 |
| loading | 自定义加载中提示 |
| finished | 自定义加载完成提示 |
| error | 自定义错误提示 |
