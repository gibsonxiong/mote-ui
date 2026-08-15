# CountDown 倒计时

用于实时展示倒计时，支持毫秒精度与自定义格式。

<script setup>
import { ref } from 'vue'

const countDownRef = ref()

function start() {
  countDownRef.value?.start()
}

function pause() {
  countDownRef.value?.pause()
}

function reset() {
  countDownRef.value?.reset()
}
</script>

## 基础用法

`time` 设置倒计时总时长（毫秒），默认格式为 `HH:mm:ss`：

<PhonePreview>
  <MtCountDown :time="30 * 60 * 1000" />
</PhonePreview>

```vue
<MtCountDown :time="30 * 60 * 1000" />
```

## 自定义格式

`format` 支持 `DD` / `HH` / `mm` / `ss` / `SSS` 占位符。省略高位占位符时，时间会向低位滚降（例如 `mm:ss` 展示 1 小时 30 分会渲染为 `90:00`）：

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <MtCountDown :time="90 * 60 * 1000" format="mm:ss" />
    <MtCountDown :time="2 * 24 * 3600 * 1000 + 3600 * 1000" format="DD 天 HH 时 mm 分" />
  </div>
</PhonePreview>

```vue
<MtCountDown :time="90 * 60 * 1000" format="mm:ss" />
<MtCountDown :time="2 * 24 * 3600 * 1000 + 3600 * 1000" format="DD 天 HH 时 mm 分" />
```

## 手动控制

通过组件实例调用 `start` / `pause` / `reset`，`auto-start` 设为 `false` 后不会自动开始：

<PhonePreview>
  <div style="display: flex; align-items: center; gap: 12px">
    <MtCountDown ref="countDownRef" :time="60 * 1000" :auto-start="false" />
    <MtButton size="small" @click="start">开始</MtButton>
    <MtButton size="small" @click="pause">暂停</MtButton>
    <MtButton size="small" @click="reset">重置</MtButton>
  </div>
</PhonePreview>

```vue
<script setup>
const countDownRef = ref()
</script>

<template>
  <MtCountDown ref="countDownRef" :time="60 * 1000" :auto-start="false" />
  <MtButton size="small" @click="countDownRef?.start()">开始</MtButton>
  <MtButton size="small" @click="countDownRef?.pause()">暂停</MtButton>
  <MtButton size="small" @click="countDownRef?.reset()">重置</MtButton>
</template>
```

## 自定义渲染

默认插槽为作用域插槽，`time` 参数包含剩余时间的各字段：

<PhonePreview>
  <MtCountDown :time="3600 * 1000">
    <template #default="{ time }">
      <span style="color: var(--mt-color-danger)">
        剩余 {{ time.minutes }} 分 {{ time.seconds }} 秒
      </span>
    </template>
  </MtCountDown>
</PhonePreview>

```vue
<MtCountDown :time="3600 * 1000">
  <template #default="{ time }">
    剩余 {{ time.minutes }} 分 {{ time.seconds }} 秒
  </template>
</MtCountDown>
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| time | 倒计时总时长（毫秒） | `number` | `0` |
| format | 格式模板，支持 `DD` / `HH` / `mm` / `ss` / `SSS` | `string` | `'HH:mm:ss'` |
| auto-start | 是否自动开始 | `boolean` | `true` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 倒计时变化时触发 | `(current: MtCountDownCurrentTime)` |
| finish | 倒计时结束时触发 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义渲染，作用域插槽，参数为 `{ time: MtCountDownCurrentTime }` |

### Methods

通过组件实例调用：

| 方法名 | 说明 |
| --- | --- |
| start | 开始倒计时 |
| pause | 暂停倒计时 |
| reset | 重置为初始时长（`auto-start` 为 `true` 时立即重新开始） |

### MtCountDownCurrentTime

| 字段 | 说明 |
| --- | --- |
| days / hours / minutes / seconds / milliseconds | 各时间单位的剩余值 |
| total | 剩余总毫秒数 |
