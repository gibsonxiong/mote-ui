# Switch 开关

<script setup>
import { reactive, ref } from 'vue'

const switchDemo = reactive({
  basic: true,
  custom: 'on',
  disabled: true,
  loading: true,
  small: true,
  large: true,
})

const switchEvent = ref(true)
</script>

用于在打开和关闭状态之间切换，常用于设置类表单。

## 基础用法

`v-model` 绑定布尔值；`active-value` / `inactive-value` 支持自定义开关值：

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px">
    <MtSwitch v-model="switchDemo.basic" />
    <MtSwitch v-model="switchDemo.custom" active-value="on" inactive-value="off" />
  </div>
</PhonePreview>

```vue
<MtSwitch v-model="checked" />
<!-- 自定义开关值 -->
<MtSwitch v-model="state" active-value="on" inactive-value="off" />
```

## 尺寸

`size` 支持 `small` / `normal` / `large`：

<PhonePreview>
  <div style="display: flex; align-items: center; gap: 12px; padding: 16px">
    <MtSwitch v-model="switchDemo.small" size="small" />
    <MtSwitch v-model="switchDemo.basic" />
    <MtSwitch v-model="switchDemo.large" size="large" />
  </div>
</PhonePreview>

```vue
<MtSwitch v-model="checked" size="small" />
<MtSwitch v-model="checked" />
<MtSwitch v-model="checked" size="large" />
```

## 禁用与加载中

`disabled` 禁用不可切换；`loading` 显示加载图标并禁止切换：

<PhonePreview>
  <div style="display: flex; align-items: center; gap: 12px; padding: 16px">
    <MtSwitch v-model="switchDemo.disabled" disabled />
    <MtSwitch v-model="switchDemo.loading" loading />
  </div>
</PhonePreview>

```vue
<MtSwitch v-model="checked" disabled />
<MtSwitch v-model="checked" loading />
```

## 切换事件

值变化触发 `change`，参数为切换后的值：

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px">
    <MtSwitch v-model="switchEvent" @change="(value) => switchEvent = value" />
    <div style="font-size: 12px; color: var(--mt-text-color-secondary)">当前值：{{ switchEvent }}</div>
  </div>
</PhonePreview>

```vue
<MtSwitch v-model="checked" @change="onChange" />
```

## 交互说明

- `disabled` 或 `loading` 状态下点击不切换
- `checked` 判断依据为 `modelValue === activeValue`
- 在 `MtFormItem` 内会自动触发对应表单校验

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | `boolean \| string \| number` | `false` |
| active-value | 打开时的值 | `boolean \| string \| number` | `true` |
| inactive-value | 关闭时的值 | `boolean \| string \| number` | `false` |
| size | 尺寸 | `'small' \| 'normal' \| 'large'` | `'normal'` |
| disabled | 禁用 | `boolean` | `false` |
| loading | 加载中（不可切换） | `boolean` | `false` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 值变化时触发 | `(value)` |
