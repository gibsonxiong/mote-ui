# Toast 轻提示

<script setup>
import { showToast, MtToast } from 'mote-ui'
</script>

轻量反馈提示，函数式调用，适合操作结果的简短提示。同一时间只显示一个 Toast，重复调用会覆盖当前内容。

## 基础用法

<PhonePreview>
  <MtButton @click="showToast('这是一条提示')">文字提示</MtButton>
</PhonePreview>

```js
import { showToast } from 'mote-ui'

showToast('这是一条提示')
```

## 成功 / 失败 / 加载

<PhonePreview>
  <MtButton @click="MtToast.success('操作成功')">成功</MtButton>
  <MtButton @click="MtToast.fail('操作失败')">失败</MtButton>
  <MtButton @click="MtToast.loading('加载中...')">加载</MtButton>
</PhonePreview>

```js
import { MtToast } from 'mote-ui'

MtToast.success('操作成功')
MtToast.fail('操作失败')
MtToast.loading('加载中...') // 不会自动关闭
MtToast.clear() // 手动关闭
```

## 自定义配置

<PhonePreview>
  <MtButton @click="showToast({ message: '顶部提示', position: 'top' })">顶部位置</MtButton>
  <MtButton @click="showToast({ message: '5 秒后关闭', duration: 5000 })">自定义时长</MtButton>
</PhonePreview>

```js
showToast({ message: '顶部提示', position: 'top' })
showToast({ message: '5 秒后关闭', duration: 5000 })
showToast({ message: '禁止操作', overlay: true }) // 透明遮罩阻断交互
```

## API

### MtToast 方法

| 名称 | 说明 |
| --- | --- |
| MtToast.show(options) | 显示 Toast，参数见 Options |
| MtToast.text(message) | 纯文字提示 |
| MtToast.success(message) | 成功提示 |
| MtToast.fail(message) | 失败提示 |
| MtToast.loading(message?) | 加载提示，不自动关闭 |
| MtToast.clear() | 关闭当前 Toast |

也可直接使用具名导出 `showToast(options | string)` 与 `clearToast()`。

### Options

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| message | 提示内容 | `string` | `''` |
| type | 类型 | `'text' \| 'success' \| 'fail' \| 'loading'` | `'text'` |
| duration | 自动关闭延时（ms），`0` 为不关闭 | `number` | `2000`（loading 为 `0`） |
| position | 显示位置 | `'top' \| 'middle' \| 'bottom'` | `'middle'` |
| overlay | 显示透明遮罩阻断页面交互 | `boolean` | `false` |
