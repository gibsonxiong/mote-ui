# Rate 评分

<script setup>
import { reactive, ref } from 'vue'

const rateDemo = reactive({
  basic: 3,
  half: 2.5,
  max: 3,
  readonly: 4,
  disabled: 2,
  small: 4,
  large: 2,
})

const rateEvent = ref(3)
</script>

用于对事物进行评级操作，常用于评价类表单。

## 基础用法

<PhonePreview>
  <div style="padding: 16px">
    <MtRate v-model="rateDemo.basic" />
  </div>
</PhonePreview>

```vue
<MtRate v-model="score" />
```

## 半星与自定义数量

`allow-half` 允许半星，`max` 自定义星星数量：

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px">
    <MtRate v-model="rateDemo.half" allow-half />
    <MtRate v-model="rateDemo.max" :max="8" />
  </div>
</PhonePreview>

```vue
<MtRate v-model="score" allow-half />
<MtRate v-model="score" :max="8" />
```

## 只读与禁用

`readonly` 只读展示，`disabled` 禁用不可交互：

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px">
    <MtRate v-model="rateDemo.readonly" readonly />
    <MtRate v-model="rateDemo.disabled" disabled />
  </div>
</PhonePreview>

```vue
<MtRate v-model="score" readonly />
<MtRate v-model="score" disabled />
```

## 尺寸

`size` 支持 `small` / `normal` / `large`：

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px">
    <MtRate v-model="rateDemo.small" size="small" />
    <MtRate v-model="rateDemo.basic" />
    <MtRate v-model="rateDemo.large" size="large" />
  </div>
</PhonePreview>

```vue
<MtRate v-model="score" size="small" />
<MtRate v-model="score" />
<MtRate v-model="score" size="large" />
```

## 评分事件

分值变化触发 `change`：

<PhonePreview>
  <div style="padding: 16px">
    <MtRate v-model="rateEvent" @change="(value) => rateEvent = value" />
    <div style="margin-top: 8px; font-size: 12px; color: var(--mt-text-color-secondary)">当前分值：{{ rateEvent }}</div>
  </div>
</PhonePreview>

```vue
<MtRate v-model="score" @change="onChange" />
```

## 交互说明

- `readonly` 与 `disabled` 均不可交互，`readonly` 用于展示、`disabled` 用于禁用态
- 在 `MtFormItem` 内会自动触发对应表单校验

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | `number` | `0` |
| max | 最大分值（星星数量） | `number` | `5` |
| allow-half | 允许选择半星 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |
| readonly | 只读 | `boolean` | `false` |
| size | 尺寸 | `'small' \| 'normal' \| 'large'` | `'normal'` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 分值变化时触发 | `(value: number)` |
