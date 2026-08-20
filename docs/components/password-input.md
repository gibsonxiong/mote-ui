# PasswordInput 密码输入框

<script setup>
import { ref } from 'vue'

const basic = ref('123')
const hint = ref('')
const shown = ref('1288')
const error = ref('')
</script>

用于展示逐位密码的输入框，通常配合数字键盘一起使用。

## 基础用法

`v-model` 绑定输入值，默认以圆点掩码显示：

<PhonePreview>
  <div style="padding: 16px">
    <MtPasswordInput v-model="basic" />
  </div>
</PhonePreview>

```vue
<MtPasswordInput v-model="value" />
```

## 明文显示

`mask="false"` 直接显示输入的字符：

<PhonePreview>
  <div style="padding: 16px">
    <MtPasswordInput v-model="shown" :mask="false" />
  </div>
</PhonePreview>

```vue
<MtPasswordInput v-model="value" :mask="false" />
```

## 提示与错误信息

`info` 显示提示文案，`error-info` 优先展示错误信息：

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 24px; padding: 16px">
    <MtPasswordInput v-model="hint" info="请输入 6 位数字密码" />
    <MtPasswordInput :model-value="'12'" :length="4" :error-info="'密码长度不足'" />
  </div>
</PhonePreview>

```vue
<MtPasswordInput v-model="value" info="请输入 6 位数字密码" />
<MtPasswordInput v-model="value" :error-info="'密码长度不足'" />
```

## 自定义长度与间距

`length` 设置位数，`gutter` 设置单元格间距：

<PhonePreview>
  <div style="padding: 16px">
    <MtPasswordInput v-model="basic" :length="4" :gutter="12" />
  </div>
</PhonePreview>

```vue
<MtPasswordInput v-model="value" :length="4" :gutter="12" />
```

## 聚焦光标

`focused` 在下一个空单元格显示闪烁光标：

<PhonePreview>
  <div style="padding: 16px">
    <MtPasswordInput v-model="basic" focused />
  </div>
</PhonePreview>

```vue
<MtPasswordInput v-model="value" focused />
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | `string` | `''` |
| info | 底部提示文案 | `string` | - |
| error-info | 底部错误提示文案，优先级高于 `info` | `string` | - |
| length | 单元格数量 | `number` | `6` |
| gutter | 单元格间距，数字为 px，字符串原样透传 | `number \| string` | `0` |
| mask | 是否以圆点掩码显示 | `boolean` | `true` |
| focused | 是否在下一个空单元格显示闪烁光标 | `boolean` | `false` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| focus | 容器聚焦时触发 | `(event: FocusEvent)` |