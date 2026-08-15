# Image 图片

<script setup>
const brokenSrc = 'https://example.com/not-exist.png'
const demoSrc = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#409eff"/><text x="100" y="106" font-size="20" fill="#fff" text-anchor="middle">Mote UI</text></svg>')
</script>

增强的图片组件，提供加载/错误占位、填充模式、圆角与懒加载。

## 基础用法

加载中显示加载图标，加载失败显示「加载失败」占位：

<PhonePreview>
  <div style="display: flex; gap: 12px">
    <MtImage :src="demoSrc" width="80" height="80" />
    <MtImage :src="brokenSrc" width="80" height="80" />
  </div>
</PhonePreview>

```vue
<MtImage src="https://example.com/a.png" width="80" height="80" />
```

## 填充模式

`fit` 对应 CSS `object-fit` 的五个取值：

<PhonePreview>
  <div style="display: flex; gap: 8px">
    <MtImage v-for="fit in ['contain', 'cover', 'fill', 'none', 'scale-down']" :key="fit" :src="demoSrc" :fit="fit" width="56" height="56" />
  </div>
</PhonePreview>

```vue
<MtImage src="..." fit="contain" />
```

## 圆角与圆形

<PhonePreview>
  <div style="display: flex; gap: 12px">
    <MtImage :src="demoSrc" width="80" height="80" radius="8" />
    <MtImage :src="demoSrc" width="80" height="80" round />
  </div>
</PhonePreview>

```vue
<MtImage src="..." radius="8" />
<MtImage src="..." round />
```

## 懒加载

`lazy-load` 基于 IntersectionObserver，图片进入视口（提前 50px）才开始加载；环境不支持时自动退化为立即加载：

```vue
<MtImage src="..." lazy-load />
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片地址 | `string` | - |
| alt | 替代文本 | `string` | - |
| fit | 填充模式 | `'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'` | `'cover'` |
| block | 以块级元素展示 | `boolean` | `false` |
| width | 宽度，数字自动加 px | `number \| string` | - |
| height | 高度，数字自动加 px | `number \| string` | - |
| radius | 圆角，数字自动加 px | `number \| string` | - |
| round | 圆形 | `boolean` | `false` |
| lazy-load | 懒加载 | `boolean` | `false` |
| show-loading | 显示加载占位 | `boolean` | `true` |
| show-error | 显示错误占位 | `boolean` | `true` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| load | 图片加载成功 | `(event: Event)` |
| error | 图片加载失败 | `(event: Event)` |

### Slots

| 名称 | 说明 |
| --- | --- |
| loading | 自定义加载占位 |
| error | 自定义错误占位 |
