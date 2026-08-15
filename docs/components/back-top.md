# BackTop 回到顶部

滚动超过指定距离后显示悬浮按钮，点击平滑滚动回顶部。

## 基础用法

默认监听页面（window）滚动，滚动超过 `visibility-height` 后出现：

```vue
<template>
  <MtBackTop />
</template>
```

## 指定滚动容器

通过 `target` 传入 CSS 选择器或元素，监听局部滚动容器：

<div
  id="backtop-demo"
  style="position: relative; height: 200px; overflow-y: auto; border: 1px solid var(--mt-border-color); border-radius: 8px; padding: 12px 16px"
>
  <p v-for="index in 20" :key="index" style="margin: 0 0 8px">第 {{ index }} 行内容，向下滚动</p>
  <MtBackTop target="#backtop-demo" :right="12" :bottom="12" />
</div>

```vue
<template>
  <div id="scroller" style="height: 300px; overflow-y: auto; position: relative">
    <!-- 长内容 -->
    <MtBackTop target="#scroller" :right="12" :bottom="12" />
  </div>
</template>
```

## 自定义内容

默认渲染向上箭头图标，可通过默认插槽替换：

```vue
<template>
  <MtBackTop>返回顶部</MtBackTop>
</template>
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| target | 监听滚动的元素：CSS 选择器或元素；默认 window | `string \| HTMLElement` | - |
| visibility-height | 出现按钮所需的滚动距离（px） | `number` | `200` |
| right | 距视口右侧距离（px） | `number` | `24` |
| bottom | 距视口底部距离（px） | `number` | `48` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击按钮时触发 | `(event: MouseEvent)` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义按钮内容 |
