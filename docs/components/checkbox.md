# Checkbox 复选框

<script setup>
import { reactive, ref } from 'vue'

const checkboxDemo = reactive({
  single: true,
  group: ['apple'],
})

const checkboxEvent = ref('')
</script>

用于在一组选项中进行多选，也可单独使用表示布尔开关。

## 基础用法

单独使用时 `v-model` 绑定布尔值：

<PhonePreview>
  <div style="padding: 16px">
    <MtCheckbox v-model="checkboxDemo.single">同意用户协议</MtCheckbox>
  </div>
</PhonePreview>

```vue
<MtCheckbox v-model="checked">同意用户协议</MtCheckbox>
```

## 复选框组

`MtCheckboxGroup` 的 `v-model` 绑定已勾选值数组，子项用 `value` 标识：

<PhonePreview>
  <div style="padding: 16px">
    <MtCheckboxGroup v-model="checkboxDemo.group">
      <MtCheckbox value="apple">苹果</MtCheckbox>
      <MtCheckbox value="banana">香蕉</MtCheckbox>
      <MtCheckbox value="orange">橘子</MtCheckbox>
    </MtCheckboxGroup>
  </div>
</PhonePreview>

```vue
<MtCheckboxGroup v-model="fruits">
  <MtCheckbox value="apple">苹果</MtCheckbox>
  <MtCheckbox value="banana">香蕉</MtCheckbox>
  <MtCheckbox value="orange">橘子</MtCheckbox>
</MtCheckboxGroup>
```

## 半选状态

`indeterminate` 仅视觉半选（如"全选"在部分勾选时的状态）：

<PhonePreview>
  <div style="padding: 16px">
    <MtCheckbox indeterminate>全选</MtCheckbox>
  </div>
</PhonePreview>

```vue
<MtCheckbox indeterminate>全选</MtCheckbox>
```

## 禁用

子项 `disabled` 单独禁用；`MtCheckboxGroup` 的 `disabled` 整组禁用：

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px">
    <MtCheckbox v-model="checkboxDemo.single" disabled>单独禁用</MtCheckbox>
    <MtCheckboxGroup v-model="checkboxDemo.group" disabled>
      <MtCheckbox value="apple">苹果</MtCheckbox>
      <MtCheckbox value="banana">香蕉</MtCheckbox>
    </MtCheckboxGroup>
  </div>
</PhonePreview>

```vue
<MtCheckbox v-model="checked" disabled>单独禁用</MtCheckbox>
<MtCheckboxGroup v-model="fruits" disabled>
  <MtCheckbox value="apple">苹果</MtCheckbox>
</MtCheckboxGroup>
```

## 事件

单独使用时 `change` 参数为布尔值，组内为已勾选值数组：

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px">
    <MtCheckbox v-model="checkboxDemo.single" @change="checkboxEvent = '单独: ' + $event">同意用户协议</MtCheckbox>
    <MtCheckboxGroup v-model="checkboxDemo.group" @change="checkboxEvent = '组: ' + $event.join(', ')">
      <MtCheckbox value="apple">苹果</MtCheckbox>
      <MtCheckbox value="banana">香蕉</MtCheckbox>
      <MtCheckbox value="orange">橘子</MtCheckbox>
    </MtCheckboxGroup>
    <div style="font-size: 12px; color: var(--mt-text-color-secondary)">{{ checkboxEvent || '切换观察事件' }}</div>
  </div>
</PhonePreview>

```vue
<MtCheckbox v-model="checked" @change="(v) => onChange(v)" />
<MtCheckboxGroup v-model="fruits" @change="(values) => onChange(values)" />
```

## 交互说明

- 组内子项通过 `value` 标识，`v-model` 为已勾选值数组
- `disabled` 可作用于子项或整组
- 在 `MtFormItem` 内会自动触发对应表单校验

## API

### Checkbox Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 单独使用时的绑定值 | `boolean` | `false` |
| value | 在复选框组中的标识值 | `string \| number \| boolean` | - |
| disabled | 禁用 | `boolean` | `false` |
| indeterminate | 半选状态（仅视觉） | `boolean` | `false` |

### Checkbox Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 值变化时触发（单独使用） | `(checked: boolean)` |

### CheckboxGroup Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 已勾选的值数组 | `Array<string \| number \| boolean>` | `[]` |
| disabled | 整组禁用 | `boolean` | `false` |

### CheckboxGroup Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 值变化时触发 | `(values)` |
