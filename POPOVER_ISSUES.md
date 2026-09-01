# MtPopover 组件痛点清单

> 来自下游消费者（cc-code 前端）实际使用 `MtPopover` 替换自定义浮层菜单时发现的问题。
> 按优先级排序，前 3 条是本次直接踩到的定位缺陷，后 4 条是顺带发现的体验/API 问题。

## 核心痛点（必须改）

### 1. 无边界检测 / 自动翻转

- **现状**：`placement` 固定四选一（`top`/`bottom`/`left`/`right`），panel 用绝对定位写死方向。触发元素靠近视口边缘时，panel 不翻转、不 clamp，右侧/底部直接被裁切。
- **期望**：检测触发元素到视口边缘的距离，空间不足时自动翻转方向；或将 panel 约束在视口内（`max-width: calc(100vw - Npx)` + 边界 clamp）。

### 2. 对齐方式固定居中，无对齐参数

- **现状**：`bottom`/`top` 固定 `left: 50%; transform: translateX(-50%)`；`left`/`right` 固定 `top: 50%; transform: translateY(-50%)`，只能居中。
- **期望**：加 `align`（`start`/`center`/`end`）参数。靠边按钮场景（面板需右对齐向左展开，或左对齐向右展开）现在完全做不到，只能靠消费方 `:deep` 强改定位 hack。

### 3. 无 Teleport

- **现状**：panel 绝对定位在 `.mt-popover` 内部。父容器一旦有 `overflow: hidden`、`transform`、或 z-index 较低，面板会被裁剪/遮挡。
- **期望**：Teleport 到 body（`MtPopup` 已这么做，popover 没有），或至少提供 `teleport` 选项。

## 次要痛点（建议改）

### 4. 无过渡动画

- **现状**：panel 用 `v-show` 硬切，没有 fade/scale 动效。`MtPopup` 有 `Transition`，popover 没有，体验不一致。

### 5. `select` 强制关闭，无法多选

- **现状**：`handleSelect` 里写死 `setVisible(false)`。用 `actions` 模式时无法做多选（选完保持打开）。
- **期望**：加 `closeOnSelect` 配置（默认 `true`）。

### 6. 无 `offset` 间距参数

- **现状**：面板与触发元素间距硬编码 `8px`（`margin-top`/`margin-bottom`/`margin-left`/`margin-right`），无法自定义。

### 7. 事件语义混乱

- **现状**：`setVisible` 里同时 emit `update:modelValue` 和 `open`/`close`，但没有 transition 却叫 `open`/`close`，语义不清。
- **期望**：`MtPopup` 用的是 `open`/`close`/`opened`/`closed` 四阶段（对应 transition 钩子），popover 应对齐，或改名为明确的状态变化事件。

---

## 优先级建议

1. **必改**：#1 边界检测/自动翻转 + #2 对齐参数（真实定位缺陷）
2. **建议改**：#3 Teleport（裁剪是隐藏 bug）
3. **可选**：#4 ~ #7（体验/API 打磨）

> 参考实现：`MtPopup`（`src/components/popup/popup.vue`）已具备 Teleport、Transition、自动 z-index，可作为 popover 的改造范本。
