# Cell 单元格

列表项的基础结构，可组合为设置页、表单分组等场景。

<script setup>
import { ref } from 'vue'

const cellClicks = ref(0)
</script>

## 基础用法

`title` 标题、`value` 右侧内容、`label` 标题下方描述；`border` 控制底部分割线：

<PhonePreview>
  <MtCellGroup>
    <MtCell title="单元格" value="内容" />
    <MtCell title="单元格" value="内容" label="描述信息" />
    <MtCell title="无分割线" :border="false" />
  </MtCellGroup>
</PhonePreview>

```vue
<MtCellGroup>
  <MtCell title="单元格" value="内容" />
  <MtCell title="单元格" value="内容" label="描述信息" />
  <MtCell title="无分割线" :border="false" />
</MtCellGroup>
```

## 链接与箭头

`is-link` 显示箭头并可点击；`arrow-direction` 控制箭头方向（`left` / `right` / `up` / `down`）：

<PhonePreview>
  <MtCellGroup>
    <MtCell title="右箭头" is-link />
    <MtCell title="下箭头" is-link arrow-direction="down" />
    <MtCell title="上箭头" is-link arrow-direction="up" />
    <MtCell title="左箭头" is-link arrow-direction="left" :border="false" />
  </MtCellGroup>
</PhonePreview>

```vue
<MtCellGroup>
  <MtCell title="右箭头" is-link />
  <MtCell title="下箭头" is-link arrow-direction="down" />
  <MtCell title="上箭头" is-link arrow-direction="up" />
  <MtCell title="左箭头" is-link arrow-direction="left" />
</MtCellGroup>
```

## 图标与表单标记

`icon` 左侧图标，`required` 标题前显示必填星号，`center` 垂直居中：

<PhonePreview>
  <MtCellGroup>
    <MtCell title="单元格" icon="success" value="内容" required />
    <MtCell title="单元格" value="内容" center label="垂直居中对齐" :border="false" />
  </MtCellGroup>
</PhonePreview>

```vue
<MtCellGroup>
  <MtCell title="单元格" icon="success" value="内容" required />
  <MtCell title="单元格" value="内容" center label="垂直居中对齐" />
</MtCellGroup>
```

## 卡片分组

`inset` 圆角卡片样式，`title` 分组标题：

<PhonePreview>
  <MtCellGroup title="分组标题" inset>
    <MtCell title="单元格" value="内容" />
    <MtCell title="单元格" value="内容" :border="false" />
  </MtCellGroup>
</PhonePreview>

```vue
<MtCellGroup title="分组标题" inset>
  <MtCell title="单元格" value="内容" />
  <MtCell title="单元格" value="内容" />
</MtCellGroup>
```

## 自定义插槽

默认插槽自定义右侧内容，`icon` / `right-icon` 插槽自定义两侧图标：

<PhonePreview>
  <MtCellGroup>
    <MtCell title="自定义右侧内容">
      <span style="color: var(--mt-color-danger)">红色文字</span>
    </MtCell>
    <MtCell title="自定义左侧图标">
      <template #icon>
        <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--mt-color-primary)" />
      </template>
    </MtCell>
    <MtCell title="自定义右图标" :border="false">
      <template #right-icon>
        <MtIcon name="success" color="var(--mt-color-success)" />
      </template>
    </MtCell>
  </MtCellGroup>
</PhonePreview>

```vue
<MtCell title="自定义右侧内容">
  <span style="color: var(--mt-color-danger)">红色文字</span>
</MtCell>
<MtCell title="自定义左侧图标">
  <template #icon>
    <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--mt-color-primary)" />
  </template>
</MtCell>
<MtCell title="自定义右图标">
  <template #right-icon>
    <MtIcon name="success" color="var(--mt-color-success)" />
  </template>
</MtCell>
```

## 点击事件

点击单元格触发 `click` 事件（无论是否 `is-link`）：

<PhonePreview>
  <MtCellGroup>
    <MtCell title="点击单元格" is-link @click="cellClicks++">
      <span>已点击 {{ cellClicks }} 次</span>
    </MtCell>
    <MtCell title="普通单元格" value="点击也触发" @click="cellClicks++" :border="false" />
  </MtCellGroup>
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const cellClicks = ref(0)
<\/script>

<template>
  <MtCell title="点击单元格" is-link @click="cellClicks++">
    <span>已点击 {{ cellClicks }} 次</span>
  </MtCell>
</template>
```

## 交互说明

- `is-link` 时单元格可点击，按下有背景色反馈
- `click` 事件在任意单元格上都会触发
- `border` 默认显示底部分割线，最后一项常设为 `false`

## API

### Cell Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 左侧标题 | `string` | - |
| value | 右侧内容 | `string \| number` | - |
| label | 标题下方的描述信息 | `string` | - |
| icon | 左侧图标名 | `string` | - |
| is-link | 显示箭头并可点击 | `boolean` | `false` |
| arrow-direction | 箭头方向 | `'left' \| 'right' \| 'up' \| 'down'` | `'right'` |
| center | 垂直居中 | `boolean` | `false` |
| border | 显示底部分割线 | `boolean` | `true` |
| required | 标题前显示必填星号 | `boolean` | `false` |

### Cell Events

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| click | 点击单元格时触发 | `(event: MouseEvent) => void` |

### Cell Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义右侧内容 |
| title | 自定义标题 |
| label | 自定义描述信息 |
| icon | 自定义左侧图标 |
| right-icon | 自定义右侧图标 |

### CellGroup Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 分组标题 | `string` | - |
| inset | 圆角卡片样式 | `boolean` | `false` |
| border | 显示外边框 | `boolean` | `true` |
