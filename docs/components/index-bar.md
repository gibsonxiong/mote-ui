# IndexBar 索引栏

用于通讯录、城市列表等场景的字母索引，点击右侧字母可快速跳转到对应分组。

## 基础用法

默认使用 `A-Z` 作为索引列表：

<PhonePreview>
  <MtIndexBar>
    <MtIndexAnchor index="A">苹果</MtIndexAnchor>
    <MtIndexAnchor index="B">香蕉</MtIndexAnchor>
    <MtIndexAnchor index="C">车厘子</MtIndexAnchor>
    <MtIndexAnchor index="D">冬瓜</MtIndexAnchor>
  </MtIndexBar>
</PhonePreview>

```vue
<MtIndexBar>
  <MtIndexAnchor index="A">苹果</MtIndexAnchor>
  <MtIndexAnchor index="B">香蕉</MtIndexAnchor>
  <MtIndexAnchor index="C">车厘子</MtIndexAnchor>
  <MtIndexAnchor index="D">冬瓜</MtIndexAnchor>
</MtIndexBar>
```

## 自定义索引列表

通过 `index-list` 自定义索引字符：

<PhonePreview>
  <MtIndexBar :index-list="['热', '新', '推', '选']">
    <MtIndexAnchor index="热">热门推荐</MtIndexAnchor>
    <MtIndexAnchor index="新">最近上新</MtIndexAnchor>
    <MtIndexAnchor index="推">编辑精选</MtIndexAnchor>
    <MtIndexAnchor index="选">你可能喜欢</MtIndexAnchor>
  </MtIndexBar>
</PhonePreview>

```vue
<MtIndexBar :index-list="['热', '新', '推', '选']">
  <MtIndexAnchor index="热">热门推荐</MtIndexAnchor>
  <MtIndexAnchor index="新">最近上新</MtIndexAnchor>
  <MtIndexAnchor index="推">编辑精选</MtIndexAnchor>
  <MtIndexAnchor index="选">你可能喜欢</MtIndexAnchor>
</MtIndexBar>
```

## 吸顶与偏移

`sticky` 控制锚点标题是否吸顶，`sticky-offset-top` 设置吸顶偏移距离：

<PhonePreview>
  <MtIndexBar :sticky="true" :sticky-offset-top="0">
    <MtIndexAnchor index="A">苹果</MtIndexAnchor>
    <MtIndexAnchor index="B">香蕉</MtIndexAnchor>
    <MtIndexAnchor index="C">车厘子</MtIndexAnchor>
  </MtIndexBar>
</PhonePreview>

```vue
<MtIndexBar :sticky-offset-top="0">
  <MtIndexAnchor index="A">苹果</MtIndexAnchor>
  <MtIndexAnchor index="B">香蕉</MtIndexAnchor>
  <MtIndexAnchor index="C">车厘子</MtIndexAnchor>
</MtIndexBar>
```

## 高亮颜色

`highlight-color` 自定义激活索引与锚点标题的颜色：

<PhonePreview>
  <MtIndexBar highlight-color="#07c160">
    <MtIndexAnchor index="A">苹果</MtIndexAnchor>
    <MtIndexAnchor index="B">香蕉</MtIndexAnchor>
  </MtIndexBar>
</PhonePreview>

```vue
<MtIndexBar highlight-color="#07c160">
  <MtIndexAnchor index="A">苹果</MtIndexAnchor>
  <MtIndexAnchor index="B">香蕉</MtIndexAnchor>
</MtIndexBar>
```

## API

### IndexBar Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| index-list | 索引字符列表 | `(string \| number)[]` | `A-Z` |
| z-index | 侧边栏与吸顶标题的层级 | `number` | `1` |
| sticky | 锚点标题是否吸顶 | `boolean` | `true` |
| sticky-offset-top | 吸顶偏移距离（px） | `number` | `0` |
| highlight-color | 激活索引与锚点的高亮颜色 | `string` | - |

### IndexBar Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| select | 点击索引时触发 | `(index: string \| number)` |
| change | 当前激活索引变化时触发 | `(index: string \| number)` |

### IndexBar 方法

通过组件实例调用：

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| scrollTo | 滚动到指定索引的锚点 | `(index: string \| number)` |

### IndexAnchor Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| index | 锚点对应的索引字符 | `string \| number` | - |