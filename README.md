# Mote UI

> 移动端 Vue 3 组件库 —— 借鉴 Element Plus 设计 token，组件形态为移动端重新设计。

- **技术栈**：TypeScript + Vite（库模式）+ pnpm monorepo
- **样式**：SCSS + CSS Variables 主题化，vw 视口适配（375px 设计基准）
- **产物**：ESM + CJS 双格式，支持按需 tree-shaking 与完整引入
- **能力**：暗色模式（`[data-theme="dark"]` token 覆写）+ 组件级 i18n（zh/en）
- **文档**：VitePress 双语站点（简体中文 / English）
- **协议**：MIT
- **支持范围**：iOS Safari 14+ / Android Chrome 90+；**不支持 SSR（SPA only）**

## 项目范围声明

本库定位为**移动端 Vue 3 组件库**，API 命名对齐 Element Plus 惯例。以下方向不在规划内，相关 issue 将直接关闭：

- 桌面端 / PC 端组件形态
- Vue 2 兼容层
- React / 其他框架移植
- 可视化搭建 / 组件市场

## 仓库结构

```
packages/
  mote-ui/          # 组件库本体
  mote-ui-icons/    # 图标包（@mote-ui/icons）
docs/               # VitePress 文档站（含手机壳实时预览）
```

## 安装

```bash
npm install mote-ui
```

```ts
import { createApp } from 'vue'
import MoteUI from 'mote-ui'
import 'mote-ui/dist/style.css'

createApp(App).use(MoteUI).mount('#app')
```

## 开发

```bash
pnpm install
pnpm dev          # 启动文档站开发服务
pnpm build        # 构建组件库与图标包
pnpm test         # 运行单元测试
pnpm lint         # ESLint 检查
```

## 路线图

- 阶段 0 · 地基：脚手架、构建链、主题 token、文档站、CI ✅
- 阶段 1 · 基础件：Icon、Button、Cell、Grid、Divider ✅
- 阶段 2 · 表单：Field、Form、Switch、Checkbox、Radio、Picker ✅
- 阶段 3 · 反馈：Popup、Toast、Dialog、ActionSheet、Notify ✅
- 阶段 4 · 导航展示：NavBar、TabBar、Tabs、Image、Tag、Badge、Empty、Skeleton ✅ → v0.1 公测（已发布 npm）
- 阶段 5 · 暗色模式：`[data-theme="dark"]` 语义化 token 覆写 ✅
- 阶段 6 · 组件级 i18n：ConfigProvider + zh/en 语言包 ✅
- 阶段 7 · 英文文档：VitePress locales 双语站点 ✅
- Playground 在线编辑（@vue/repl + Monaco，esm.sh 沙箱依赖）✅
- 阶段 8 · 数据录入补充：Stepper、Rate、Slider、Search、Uploader ✅ → v0.2
- 阶段 9 · 时间与级联：DatetimePicker、Calendar、Cascader，Form 异步校验增强 ✅ → v0.3
- 阶段 10 · 滚动场景：List、PullRefresh、BackTop、Swipe、SwipeCell，Popup z-index 自动层级 ✅ → v0.4
- 阶段 11 · 展示补充：Loading、Progress、NoticeBar、Popover、Collapse、Steps、ImagePreview、CountDown ✅ → v0.5
- v1.0：全量 API 审计 + Notify 破坏性变更统一 ✅ → 发布正式版

## 许可

[MIT](./LICENSE)
