# Notify 消息通知

<script setup>
import { MtNotify } from 'mote-ui'
</script>

顶部滑入的消息通知，函数式调用，适合系统级消息提醒。同一时间只显示一条，重复调用会覆盖。

## 基础用法

默认 `danger` 类型：

<PhonePreview>
  <MtButton @click="MtNotify.show('网络异常，请稍后重试')">显示通知</MtButton>
</PhonePreview>

```js
import { MtNotify, showNotify } from 'mote-ui'

MtNotify.show('网络异常，请稍后重试')
showNotify('等价写法')
```

## 通知类型

<PhonePreview>
  <MtButton @click="MtNotify.primary('新消息：3 条未读')">primary</MtButton>
  <MtButton @click="MtNotify.success('保存成功')">success</MtButton>
  <MtButton @click="MtNotify.warning('当前网络不稳定')">warning</MtButton>
  <MtButton @click="MtNotify.danger('删除失败')">danger</MtButton>
</PhonePreview>

```js
MtNotify.primary('新消息：3 条未读')
MtNotify.success('保存成功')
MtNotify.warning('当前网络不稳定')
MtNotify.danger('删除失败')
```

## 手动关闭

`duration` 设为 `0` 时不自动关闭，需调用 `MtNotify.close()`：

```js
MtNotify.show({ message: '等待服务端响应...', duration: 0 })
// ... 稍后
MtNotify.close()
```

## API

### MtNotify 方法

| 名称 | 说明 |
| --- | --- |
| MtNotify.show(options) | 显示通知，参数见 Options |
| MtNotify.primary(message) | primary 类型通知 |
| MtNotify.success(message) | success 类型通知 |
| MtNotify.warning(message) | warning 类型通知 |
| MtNotify.danger(message) | danger 类型通知 |
| MtNotify.close() | 关闭当前通知 |

也可直接使用具名导出 `showNotify(options | string)` 与 `closeNotify()`。

### Options

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| message | 通知内容 | `string` | `''` |
| type | 类型 | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'danger'` |
| duration | 自动关闭延时（ms），`0` 为不关闭 | `number` | `3000` |
