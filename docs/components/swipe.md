# Swipe 轮播

<script setup>
import { ref } from 'vue'

const swipeIndex = ref(0)
const colors = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c']
</script>

用于循环播放一组内容，支持手势滑动、自动播放与纵向模式。

## 基础用法

默认开启循环与指示点，拖动超过四分之一宽度即可切换：

<PhonePreview>
  <MtSwipe style="height: 120px; border-radius: 8px; overflow: hidden">
    <div
      v-for="(color, index) in colors"
      :key="index"
      :style="{ height: '120px', lineHeight: '120px', textAlign: 'center', color: '#fff', backgroundColor: color }"
    >
      {{ index + 1 }}
    </div>
  </MtSwipe>
</PhonePreview>

```vue
<template>
  <MtSwipe>
    <div v-for="item in banners" :key="item.id">{{ item.title }}</div>
  </MtSwipe>
</template>
```

## 受控切换

通过 `v-model` 绑定当前页索引，点击指示点也会同步：

<PhonePreview>
  <MtSwipe v-model="swipeIndex" :autoplay="3000" style="height: 120px; border-radius: 8px; overflow: hidden">
    <div
      v-for="(color, index) in colors"
      :key="index"
      :style="{ height: '120px', lineHeight: '120px', textAlign: 'center', color: '#fff', backgroundColor: color }"
    >
      第 {{ index + 1 }} 页
    </div>
  </MtSwipe>
</PhonePreview>

```vue
<script setup>
import { ref } from 'vue'

const index = ref(0)
<\/script>

<template>
  <MtSwipe v-model="index" :autoplay="3000">
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </MtSwipe>
</template>
```

## 交互说明

- 手指拖动（或鼠标拖动）超过四分之一宽度切换上一页/下一页
- `autoplay` 大于 0 时自动播放，拖动期间暂停
- `loop` 为 `false` 时到达边界不再环绕
- `vertical` 为 `true` 时纵向滑动，容器需给定高度

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 当前页索引 | `number` | `0` |
| autoplay | 自动播放间隔（毫秒），非正数关闭 | `number` | `0` |
| duration | 切换动画时长（毫秒） | `number` | `300` |
| loop | 是否循环播放 | `boolean` | `true` |
| show-indicators | 是否显示指示点 | `boolean` | `true` |
| vertical | 是否纵向滑动 | `boolean` | `false` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 切换页面时触发 | `(index: number)` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 轮播内容，每个直接子元素为一页 |
