# Radio 单选框

<script setup>
import { reactive, ref } from 'vue'

const radioDemo = reactive({
  value: 'male',
  group: 'js',
})

const radioEvent = ref('')
</script>

用于在一组选项中选择单个值。

## 基础用法

`MtRadioGroup` 的 `v-model` 绑定选中值，子项用 `value` 标识：

<PhonePreview>
  <div style="padding: 16px">
    <MtRadioGroup v-model="radioDemo.value">
      <MtRadio value="male">男</MtRadio>
      <MtRadio value="female">女</MtRadio>
    </MtRadioGroup>
  </div>
</PhonePreview>

```vue
<MtRadioGroup v-model="gender">
  <MtRadio value="male">男</MtRadio>
  <MtRadio value="female">女</MtRadio>
</MtRadioGroup>
```

## 禁用

子项 `disabled` 单独禁用；`MtRadioGroup` 的 `disabled` 整组禁用：

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px">
    <MtRadioGroup v-model="radioDemo.value">
      <MtRadio value="male">男</MtRadio>
      <MtRadio value="female">女</MtRadio>
      <MtRadio value="secret" disabled>保密（禁用）</MtRadio>
    </MtRadioGroup>
    <MtRadioGroup v-model="radioDemo.group" disabled>
      <MtRadio value="js">JavaScript</MtRadio>
      <MtRadio value="ts">TypeScript</MtRadio>
    </MtRadioGroup>
  </div>
</PhonePreview>

```vue
<MtRadioGroup v-model="gender">
  <MtRadio value="male">男</MtRadio>
  <MtRadio value="female">女</MtRadio>
  <MtRadio value="secret" disabled>保密（禁用）</MtRadio>
</MtRadioGroup>

<MtRadioGroup v-model="language" disabled>
  <MtRadio value="js">JavaScript</MtRadio>
  <MtRadio value="ts">TypeScript</MtRadio>
</MtRadioGroup>
```

## 事件

切换选项触发 `change`，参数为选中值：

<PhonePreview>
  <div style="padding: 16px">
    <MtRadioGroup v-model="radioDemo.value" @change="radioEvent = $event">
      <MtRadio value="male">男</MtRadio>
      <MtRadio value="female">女</MtRadio>
    </MtRadioGroup>
    <div style="margin-top: 8px; font-size: 12px; color: var(--mt-text-color-secondary)">change：{{ radioEvent || '-' }}</div>
  </div>
</PhonePreview>

```vue
<MtRadioGroup v-model="gender" @change="onChange">
  <MtRadio value="male">男</MtRadio>
  <MtRadio value="female">女</MtRadio>
</MtRadioGroup>
```

## 交互说明

- 子项通过 `value` 标识，`v-model` 为选中值
- `disabled` 可作用于子项或整组
- 在 `MtFormItem` 内会自动触发对应表单校验

## API

### Radio Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 选项标识值（必填） | `string \| number \| boolean` | - |
| disabled | 禁用 | `boolean` | `false` |

### RadioGroup Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | `string \| number \| boolean` | - |
| disabled | 整组禁用 | `boolean` | `false` |

### RadioGroup Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 值变化时触发 | `(value)` |
