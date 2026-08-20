# NumberKeyboard 数字键盘

<script setup>
import { reactive } from 'vue'

const keyboardDemo = reactive({
  show: false,
  value: '',
  limitShow: false,
  limit: '',
  customShow: false,
  custom: '',
})
</script>

用于输入数字的底部键盘，支持 `v-model` 绑定输入值与 `v-model:show` 控制显示。

## 基础用法

`MtNumberKeyboard` 通过 `v-model:show` 控制显隐，`v-model` 接收输入的数字字符串：

<PhonePreview>
  <div style="padding: 16px">
    <MtCell title="已输入" :value="keyboardDemo.value || '未输入'" />
    <MtButton block @click="keyboardDemo.show = true">弹出数字键盘</MtButton>
    <MtNumberKeyboard
      v-model="keyboardDemo.value"
      v-model:show="keyboardDemo.show"
      title="数字键盘"
    />
  </div>
</PhonePreview>

```vue
<template>
  <MtNumberKeyboard v-model="value" v-model:show="show" />
</template>
```

## 限制长度

`maxlength` 限制最多可输入的字符数：

<PhonePreview>
  <div style="padding: 16px">
    <MtCell title="验证码" :value="keyboardDemo.limit || '未输入'" />
    <MtButton block @click="keyboardDemo.limitShow = true">弹出数字键盘</MtButton>
    <MtNumberKeyboard
      v-model="keyboardDemo.limit"
      v-model:show="keyboardDemo.limitShow"
      :maxlength="4"
    />
  </div>
</PhonePreview>

```vue
<MtNumberKeyboard v-model="value" v-model:show="show" :maxlength="4" />
```

## 自定义左下角按键

`extra-key` 设置左下角额外按键的文案，点击时触发 `input` 事件但不会修改绑定值：

<PhonePreview>
  <div style="padding: 16px">
    <MtButton block @click="keyboardDemo.show = true">弹出数字键盘</MtButton>
    <MtNumberKeyboard
      v-model="keyboardDemo.value"
      v-model:show="keyboardDemo.show"
      extra-key="."
    />
  </div>
</PhonePreview>

```vue
<MtNumberKeyboard v-model="value" v-model:show="show" extra-key="." />
```

## 自定义主题

`theme="custom"` 时使用默认插槽渲染自定义键位：

<PhonePreview>
  <div style="padding: 16px">
    <MtButton block @click="keyboardDemo.customShow = true">弹出自定义键盘</MtButton>
    <MtNumberKeyboard v-model:show="keyboardDemo.customShow" theme="custom" title="自定义键盘">
      <div style="padding: 16px; text-align: center">自定义键位内容</div>
    </MtNumberKeyboard>
  </div>
</PhonePreview>

```vue
<MtNumberKeyboard v-model:show="show" theme="custom">
  <div>自定义键位内容</div>
</MtNumberKeyboard>
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 输入值 | `string` | `''` |
| show / v-model:show | 是否显示键盘 | `boolean` | `false` |
| title | 键盘标题 | `string` | - |
| theme | 键盘主题 | `'default' \| 'custom'` | `'default'` |
| maxlength | 最大输入长度 | `number` | `Infinity` |
| extra-key | 左下角额外按键文案 | `string` | `''` |
| close-button-text | 顶部左侧关闭按钮文案 | `string` | - |
| show-delete-key | 是否显示删除键 | `boolean` | `true` |
| hide-on-click-outside | 点击外部是否收起 | `boolean` | `true` |
| safe-area-inset-bottom | 底部是否适配安全区 | `boolean` | `true` |
| teleport | teleport 挂载目标 | `string` | `'body'` |
| z-index | 层级 | `number` | 自动递增 |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| input | 点击按键时触发（不包含删除） | `(key: string)` |
| delete | 点击删除键时触发 | - |
| close | 点击关闭按钮时触发 | - |
| update:modelValue | 输入值变化 | `(value: string)` |
| update:show | 显示状态变化 | `(value: boolean)` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | `theme="custom"` 时的键位内容 |
| title | 自定义标题内容 |
| title-left | 自定义顶部左侧关闭区域 |
| extra-key | 自定义左下角按键 |
| delete | 自定义删除键内容 |