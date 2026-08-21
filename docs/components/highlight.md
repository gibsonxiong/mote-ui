# Highlight 高亮文本

在文本中高亮指定的关键词，支持多关键词与自定义样式。

## 基础用法

`text` 为全文，`keywords` 为要高亮的关键词：

<PhonePreview>
  <MtHighlight text="mote-ui 是一套移动端 Vue 3 组件库" keywords="组件" />
</PhonePreview>

```vue
<MtHighlight text="mote-ui 是一套移动端 Vue 3 组件库" keywords="组件" />
```

## 多关键词

`keywords` 支持数组，多个关键词同时高亮：

<PhonePreview>
  <MtHighlight text="mote-ui 是一套移动端 Vue 3 组件库" :keywords="['mote-ui', 'Vue']" />
</PhonePreview>

```vue
<MtHighlight
  text="mote-ui 是一套移动端 Vue 3 组件库"
  :keywords="['mote-ui', 'Vue']"
/>
```

## 自定义样式

`highlight-style` 与 `highlight-class` 自定义高亮样式：

<PhonePreview>
  <MtHighlight
    text="自定义高亮样式"
    keywords="高亮"
    :highlight-style="{ color: 'var(--mt-color-danger)' }"
  />
</PhonePreview>

```vue
<MtHighlight
  text="自定义高亮样式"
  keywords="高亮"
  :highlight-style="{ color: 'var(--mt-color-danger)' }"
/>
```

## 大小写敏感

默认匹配不区分大小写，`case-sensitive` 开启大小写敏感：

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <MtHighlight text="Hello World" keywords="hello" />
    <MtHighlight text="Hello World" keywords="hello" case-sensitive />
  </div>
</PhonePreview>

```vue
<MtHighlight text="Hello World" keywords="hello" />
<MtHighlight text="Hello World" keywords="hello" case-sensitive />
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 全文，提供默认插槽时忽略 | `string` | - |
| keywords | 要高亮的关键词 | `string \| string[]` | - |
| highlight-style | 高亮片段的行内样式 | `CSSProperties` | - |
| highlight-class | 高亮片段的额外类名 | `string` | - |
| case-sensitive | 是否区分大小写 | `boolean` | `false` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义内容，覆盖 text/keywords 渲染 |