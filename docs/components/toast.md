# Toast 轻提示

<script setup>
import { showToast, MtToast } from 'mote-ui'
</script>

轻量反馈提示，函数式调用，适合操作结果的简短提示。同一时间只显示一个 Toast，重复调用会覆盖当前内容。

## 基础用法

`showToast` 直接传入字符串：

<PhonePreview>
  <MtButton @click="showToast('这是一条提示')">文字提示</MtButton>
</PhonePreview>

```js
import { showToast } from 'mote-ui'

showToast('这是一条提示')
```

## 成功 / 失败 / 加载

`MtToast` 提供语义化方法；`loading` 不会自动关闭，需手动 `clear`：

<PhonePreview>
  <div style="display: flex; gap: 8px">
    <MtButton size="small" @click="MtToast.success('操作成功')">成功</MtButton>
    <MtButton size="small" @click="MtToast.fail('操作失败')">失败</MtButton>
    <MtButton size="small" @click="MtToast.loading('加载中...')">加载</MtButton>
    <MtButton size="small" @click="MtToast.clear()">手动关闭</MtButton>
  </div>
</PhonePreview>

```js
import { MtToast } from 'mote-ui'

MtToast.success('操作成功')
MtToast.fail('操作失败')
MtToast.loading('加载中...') // 不会自动关闭
MtToast.clear() // 手动关闭
```

## 显示位置

`position` 支持 `top` / `middle` / `bottom`：

<PhonePreview>
  <div style="display: flex; gap: 8px">
    <MtButton size="small" @click="showToast({ message: '顶部提示', position: 'top' })">顶部</MtButton>
    <MtButton size="small" @click="showToast({ message: '中间提示', position: 'middle' })">中间</MtButton>
    <MtButton size="small" @click="showToast({ message: '底部提示', position: 'bottom' })">底部</MtButton>
  </div>
</PhonePreview>

```js
showToast({ message: '顶部提示', position: 'top' })
showToast({ message: '中间提示', position: 'middle' })
showToast({ message: '底部提示', position: 'bottom' })
```

## 时长与遮罩

`duration` 自定义自动关闭时长（`0` 不关闭）；`overlay` 显示透明遮罩阻断页面交互：

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <MtButton @click="showToast({ message: '5 秒后关闭', duration: 5000 })">5 秒后关闭</MtButton>
    <MtButton @click="showToast({ message: '阻断交互中', overlay: true, duration: 1500 })">遮罩阻断交互</MtButton>
  </div>
</PhonePreview>

```js
showToast({ message: '5 秒后关闭', duration: 5000 })
showToast({ message: '阻断交互中', overlay: true, duration: 1500 })
```

## 交互说明

- 同一时间只显示一个 Toast，重复调用覆盖当前内容
- `loading` 类型默认 `duration: 0`（不自动关闭），需调用 `clear`
- `overlay: true` 时透明遮罩会阻断页面交互，直到 Toast 关闭

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
