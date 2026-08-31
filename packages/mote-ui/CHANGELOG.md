# mote-ui

## 1.1.0

### Minor Changes

- fac8eb3: Add per-component subpath exports (`mote-ui/popup`, `mote-ui/button`, …) backed by a `preserveModules` build, so bundlers can tree-shake unused components and `@mote-ui/icons` when importing named exports from the main entry. Styles remain bundled in a single `dist/style.css`.
- 7b6f3b0: Add `z-index` prop to Popover and ImagePreview with auto-allocation on open; add `zIndex` option to Notify and Toast; add `nativeType` and `icon` props to Button.
- 20450c7: Add NumberKeyboard, PasswordInput, Signature, Sticky, and Overlay components. Refactor Popup to reuse Overlay (with auto-incrementing z-index).
- ed74158: Add ShareSheet, DropdownMenu, TreeSelect, Area, and Sidebar components.
- bbb7bf5: Add IndexBar, Pagination, Circle, LazyLoad, Highlight, and FloatingBubble components.

## 1.0.0

### Major Changes

- dd92170: v1.0 全量 API 审计与约定统一：

  - 破坏性变更：Notify 组件形式显隐由 `visible` prop 改为 `v-model`（modelValue），与 Popup/Dialog 对齐；组件形式以 `MtNotifyComponent` 导出并支持全局注册
  - 破坏性变更：ImagePreview 由 `v-model:show` 改为 `v-model`，全库布尔显隐统一为 `v-model` 约定
  - 审计确认：46 个组件的组件名与注册名一致、类型导出全覆盖、全部使用 typed emits

### Minor Changes

- 7a5d7ab: 阶段 10 · 滚动场景，新增五个组件并增强 Popup：

  - Swipe 轮播：手势切换、自动播放、循环、纵向、指示点
  - SwipeCell 滑动单元格：左右滑出操作区、受控开合、点击外部收起
  - List 无限滚动列表：IntersectionObserver 哨兵检查、错误重试、自动补屏
  - PullRefresh 下拉刷新：阻尼手势、成功提示、head 插槽
  - BackTop 回到顶部：window/自定义滚动容器、平滑滚动
  - Popup：z-index 全局自增分配，后开弹层自动盖住先开弹层

  配套：语言包新增 `list.*` 与 `pullRefresh.*` 文案（zh/en）。

- a1b35b9: 阶段 11 · 展示补充，新增八个组件：

  - Loading 加载：circular / spinner 两种动画、文案、垂直排列、自定义颜色与大小
  - Progress 进度条：百分比、语义状态色、自定义颜色与粗细
  - NoticeBar 通知栏：省略截断、按速度横向循环滚动、多行换行、可关闭
  - CountDown 倒计时：毫秒精度、format 占位符滚降、start/pause/reset、作用域插槽
  - Collapse / CollapseItem 折叠面板：v-model 数组、手风琴模式、禁用、展开动画
  - Steps / Step 步骤条：finished/process/waiting 状态、横竖双向
  - Popover 气泡弹出菜单：actions 菜单、四向弹出、点击外部关闭
  - ImagePreview 图片预览：基于 Swipe 全屏预览、索引指示、关闭按钮、初始位置

- 1546bdf: 阶段 8 · 数据录入补充，新增五个组件：

  - **Stepper 步进器**：min/max/step/precision、disable-input、三档尺寸，接入 Form 校验
  - **Rate 评分**：max/allow-half/readonly/size，半星点击区，接入 Form 校验
  - **Slider 滑块**：min/max/step、指针拖动、轨道点按、键盘方向键、拖动气泡
  - **Search 搜索**：shape/show-action/clearable，回车触发 search 事件，默认文案走语言包
  - **Uploader 文件上传**：图片本地预览、max-count/max-size、before-read/after-read 钩子、失败状态遮罩

  配套更新：语言包新增 `search.placeholder` 与 `uploader.*` 文案（zh/en）；README 增加项目范围声明与 v1.0 路线图。

- c0fbe0d: 阶段 9 · 时间与级联，新增三个组件并增强既有能力：

  - **DatetimePicker 时间选择**：date/time/datetime/year-month 四种模式，min/max 范围约束、filter/formatter，年月切换自动收敛合法日期
  - **Cascader 级联选择**：全路径数组绑定（对齐 Element Plus）、`props` 字段名映射、分层 tab 交互、禁用选项
  - **Calendar 日历**：single/range 双模式、月份分组滚动、区间起止标记、免确认模式
  - **Form 增强**：异步校验暴露 `validating` 状态（is-validating class），序列号机制防止慢异步结果覆盖新一轮校验

  配套更新：语言包新增 `cascader.placeholder` 与 `calendar.*` 文案（zh/en）。

### Patch Changes

- Updated dependencies [1546bdf]
  - @mote-ui/icons@0.2.0

## 0.1.1

### Patch Changes

- fix: bundle design tokens and base styles into `dist/style.css`

  The entry now imports `styles/index.scss`, so the built stylesheet ships the
  `:root` CSS variable definitions (`--mt-*` design tokens) together with
  component styles. Previously `dist/style.css` only contained `var(--mt-*)`
  consumptions, leaving npm consumers (and the docs Playground sandbox) with
  unstyled components.

## 0.1.0

### Minor Changes

- v0.1 公测发布：

  - 基础组件：Icon、Button、Cell、Grid、Divider
  - 表单组件：Field、Form（零依赖校验引擎）、Switch、Checkbox、Radio、Picker 滚轮选择器
  - 反馈组件：Popup 弹层基础件、Toast、Dialog（含 confirm/alert 函数式调用）、ActionSheet、Notify
  - 导航组件：NavBar、TabBar、Tabs
  - 展示组件：Image（懒加载/错误态）、Tag、Badge、Empty、Skeleton
  - ESM + CJS 双格式产物，完整 TypeScript 类型声明
  - SCSS + CSS Variables 主题化（设计 token 对齐 Element Plus）
  - VitePress 中文文档站（含手机壳实时预览）

### Patch Changes

- Updated dependencies
  - @mote-ui/icons@0.1.0
