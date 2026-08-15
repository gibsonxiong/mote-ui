# Cell 单元格

列表项的基础结构，可组合为设置页、表单分组等场景。

## 基础用法

<PhonePreview>
  <MtCellGroup>
    <MtCell title="单元格" value="内容" />
    <MtCell title="单元格" value="内容" label="描述信息" />
    <MtCell title="单元格" :border="false" />
  </MtCellGroup>
</PhonePreview>

```vue
<MtCellGroup>
  <MtCell title="单元格" value="内容" />
  <MtCell title="单元格" value="内容" label="描述信息" />
</MtCellGroup>
```

## 链接与箭头

<PhonePreview>
  <MtCellGroup>
    <MtCell title="单元格" is-link />
    <MtCell title="单元格" value="详情" is-link />
    <MtCell title="单元格" is-link arrow-direction="down" :border="false" />
  </MtCellGroup>
</PhonePreview>

```vue
<MtCell title="单元格" is-link />
<MtCell title="单元格" value="详情" is-link />
<MtCell title="单元格" is-link arrow-direction="down" />
```

## 图标与表单标记

<PhonePreview>
  <MtCellGroup>
    <MtCell title="单元格" icon="success" value="内容" required />
    <MtCell title="单元格" value="内容" center label="垂直居中对齐" :border="false" />
  </MtCellGroup>
</PhonePreview>

```vue
<MtCell title="单元格" icon="success" required />
<MtCell title="单元格" center label="垂直居中对齐" />
```

## 卡片分组

<PhonePreview>
  <MtCellGroup title="分组标题" inset>
    <MtCell title="单元格" value="内容" />
    <MtCell title="单元格" value="内容" :border="false" />
  </MtCellGroup>
</PhonePreview>

```vue
<MtCellGroup title="分组标题" inset>
  <MtCell title="单元格" value="内容" />
</MtCellGroup>
```

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
