# 项目长期笔记（Mote UI）

## 项目定位
- **Mote UI**：移动端 Vue 3 组件库，借鉴 Element Plus 设计 token，组件形态按移动端重设计。MIT 协议。
- **范围边界**：只做移动端 Vue 3；不支持 SSR（SPA only）；不做跨框架/跨端、电商专用与长尾组件。
- **兼容**：iOS Safari 14+ / Chrome 90+。**对标**：组件广度对齐 Vant，API 命名对齐 Element Plus。

## 技术栈与结构（三包 monorepo，pnpm `>=9.12`）
- `packages/mote-ui`（组件库本体，46 组件，v1.0.0）、`packages/mote-ui-icons`（`@mote-ui/icons` v0.2.0）、`docs`（VitePress 双语文档站，含手机壳预览 + @vue/repl Playground，不发布）。
- Vue 3（peerDep ^3.4）+ TS strict + Vite 库模式（ESM+CJS 双格式）+ SCSS/CSS Variables + vw 适配（375px 基准，postcss-px-to-viewport-8-plugin）。
- 测试 Vitest + @vue/test-utils + happy-dom；ESLint 9 + Prettier（无分号/单引号/width100/trailingComma all）+ changesets + GitHub Actions。
- 仓库：https://github.com/gibsonxiong/mote-ui.git（主分支 main）。

## 核心约定
- 组件名=注册名（`MtXxx`），`withInstall` 注册；布尔显隐统一 `v-model`（否决 `v-model:show`）；typed props/emits；类型全量导出。
- API：优先 Element Plus；EP 无先例用 Vant；冲突以库内惯例为准。
- 主题 token 前缀 `--mt-*`；暗色 `[data-theme='dark']` 覆写。
- 弹层 z-index：`utils/z-index.ts` `nextZIndex()` 全局自增。
- i18n：ConfigProvider + zh-CN/en-US；命令式 API 读全局 locale。
- Form 异步校验：validating 状态 + 序列号防竞态。
- 组件质量不降级：单测 + 双语文档 + 暗色 + i18n 缺一不可。

## 命令
`pnpm dev`（文档站）/ `build` / `build:docs` / `test` / `lint` / `typecheck`（vue-tsc）/ `format` / `release`（=build+changeset publish）。全链路验证 = test+typecheck+lint+build+build:docs。

## 发布（npm OIDC）
- npm 2026-08 起移除本地 2FA 豁免 → 本地 publish 一律 E403，改用 GitHub Actions Trusted Publishing(OIDC)：每包配 trusted publisher（owner/repo+workflow 名）、`id-token: write`、Node≥22.14 + npm≥11.5.1、无需 NPM_TOKEN。
- `@mote-ui/icons` 发布前需先建 `mote-ui` org；新 org 首包有安全扫描 Hold（短暂 404）。

## 关键踩坑（详见 MEMORY-EXPORT.md）
1. vite lib 构建须在入口 `import './styles/index.scss'`，否则 dist/style.css 缺 `:root` token（曾 v0.1.0 带病发布）。
2. vitest fake timers 默认不 mock Date.now，需显式 `toFake`；advanceTimersByTime 后需 `await nextTick()`。
3. happy-dom 下 `instanceof Window` 不可靠 → 恒等 `=== window`；VTU `isVisible()` 对 Transition stub 失效 → 读 `style.display`。
4. esm.sh 新版本 404 负缓存 → URL 加 `&no-dts`。
5. @vue/repl：store 渲染前初始化、高度 `max(70vh,480px)`+`!important`、`optimizeDeps.exclude`。
6. VitePress `useData()` 不能用于 enhanceApp → Layout 插槽客户端组件。
7. Windows/PowerShell git 多行 commit 报错实为成功；stderr 进度致 exit 1 误报 → 看输出关键字。

## 版本里程碑
阶段 0–11 全完成 → v1.0.0 已发布（2026-08-15，含 Notify visible→v-model、ImagePreview v-model:show→v-model 两处破坏性变更）。完整历史见 MEMORY-EXPORT.md。
