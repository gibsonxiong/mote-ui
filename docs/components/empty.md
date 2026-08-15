# Empty 空状态

<script setup>
import { showToast } from 'mote-ui'
</script>

列表或页面无数据时的占位展示。

## 基础用法

<PhonePreview>
  <MtEmpty />
</PhonePreview>

```vue
<MtEmpty />
```

## 自定义描述

<PhonePreview>
  <MtEmpty description="没有找到相关内容" />
</PhonePreview>

```vue
<MtEmpty description="没有找到相关内容" />
```

## 底部操作区

默认插槽渲染在描述下方的操作区：

<PhonePreview>
  <MtEmpty description="暂无消息">
    <MtButton type="primary" @click="showToast('刷新')">刷新试试</MtButton>
  </MtEmpty>
</PhonePreview>

```vue
<MtEmpty description="暂无消息">
  <MtButton type="primary">刷新试试</MtButton>
</MtEmpty>
```

## 自定义图片

`image` 传入图片地址，`image-size` 控制宽度；也可用 `image` 插槽完全自定义：

<PhonePreview>
  <MtEmpty :image-size="120" description="插槽自定义插画">
    <template #image>
      <span style="font-size: 48px">📭</span>
    </template>
  </MtEmpty>
</PhonePreview>

```vue
<MtEmpty description="插槽自定义插画">
  <template #image>
    <span style="font-size: 48px">📭</span>
  </template>
</MtEmpty>
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| image | 自定义图片地址，默认内置插画 | `string` | - |
| image-size | 图片宽度，数字自动加 px | `number \| string` | `160px` |
| description | 描述文字 | `string` | 语言包 |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 底部操作区 |
| image | 自定义图片 |
| description | 自定义描述 |
