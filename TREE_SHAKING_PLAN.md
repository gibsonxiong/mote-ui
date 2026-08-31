# mote-ui 多入口按需构建改造（Tree-shake 优化）

> 本文档是一份实现需求描述，交给实现者（AI 或开发者）执行。
> 目标：让下游 `import { MtPopup } from 'mote-ui'` 只打进用到的组件，其余组件与 `@mote-ui/icons` 被 tree-shake 掉。

## 背景与目标

`mote-ui`（`packages/mote-ui`）当前用 vite `lib` 单入口打包，`dist/index.js` 把所有 70+ 组件和 `@mote-ui/icons` 塞进同一个 3995 行文件，且存在 `components[] 数组 → install → export default` 引用链，导致下游按需 import 时 Rollup 无法 tree-shake，全量组件 + icons 都被打进产物（实测 gzip 增量约 +244KB JS）。

改造后：消费者可以 `import { MtPopup } from 'mote-ui'`，产物里只包含 MtPopup 及其依赖（Overlay、lock-scroll、z-index），MtButton、`@mote-ui/icons` 等不再出现。

## 样式策略（重要：不按需）

**样式维持全量引入，不做拆分。**

- 继续保留 `src/index.ts` 顶层 `import './styles/index.scss'`，产出一个全量 `dist/style.css`。
- 消费者统一 `import 'mote-ui/dist/style.css'` 引入完整样式，与现状一致。
- 本次改造**只解决 JS 层 tree-shake**，不涉及样式按需。

## 核心改动点

### 1. vite.config.ts：开启 `preserveModules`

当前配置（`packages/mote-ui/vite.config.ts`）：

```ts
build: {
  lib: {
    entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
    formats: ['es', 'cjs'],
    fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
  },
  rollupOptions: {
    external: ['vue', '@mote-ui/icons'],
    output: { exports: 'named', globals: { vue: 'Vue' } },
  },
  sourcemap: true,
},
```

改为在 `build.rollupOptions.output` 加 `preserveModules: true`，并设 `preserveModulesRoot` 指向 `src`，让每个组件、每个 util 都产出独立 `.js` 文件，保留 ESM 边界供 tree-shake。

注意：`formats: ['es', 'cjs']` 下 preserveModules 会同时产出 `.js` 与 `.cjs` 两套目录结构，需确认 `fileName` 在 preserveModules 下的行为（preserveModules 会忽略 `fileName` 自定义，改用源码相对路径命名）。

### 2. package.json：`exports` 加子路径

当前 `exports` 只有 `"."` 和 `"./dist/style.css"`。在保留全量 `"."` 入口的同时，为每个组件加按需子路径，如：

```json
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js",
    "require": "./dist/index.cjs"
  },
  "./popup": {
    "types": "./dist/components/popup/index.d.ts",
    "import": "./dist/components/popup/index.js",
    "require": "./dist/components/popup/index.cjs"
  },
  "./dist/style.css": "./dist/style.css",
  "./package.json": "./package.json"
}
```

子路径对应 preserveModules 产出的 `dist/components/<name>/index.js`。这是 element-plus / vant 的标准做法。

### 3. 入口 `src/index.ts` 的处理

`src/index.ts` 顶层 `import './styles/index.scss'` 的样式副作用保持不动（样式仍全量）。但需注意：这个副作用 import 位于主入口，`import { MtPopup } from 'mote-ui'` 时，如果样式副作用和组件导出绑定在同一入口，可能阻碍 JS tree-shake（副作用 import 通常不会阻碍命名导出的 tree-shake，但需验证）。

若验证发现主入口的样式副作用影响 tree-shake，可考虑：
- 把 `import './styles/index.scss'` 从 `src/index.ts` 移除，改为在 package.json 的 `sideEffects` 里单独声明 `dist/style.css`（已存在该字段），消费者手动 `import 'mote-ui/dist/style.css'`。

### 4. vite-plugin-dts 适配 preserveModules

当前 dts 插件已按目录产出子路径 `.d.ts`（`dist/components/popup/index.d.ts` 已存在），需确认 preserveModules 后 dts 的 `insertTypesEntry` 与 `exports` 子路径类型解析对齐。

## 验证标准

用最小消费场景验证（可在 `packages/mote-ui` 或临时项目）：

```ts
import { MtPopup } from 'mote-ui';
import 'mote-ui/dist/style.css';
```

构建产物应只包含 MtPopup + Overlay + lock-scroll + z-index 相关代码，断言：

```bash
grep -c "mt-button" dist/assets/*.js   # 应为 0（MtButton 被摇掉）
grep -c "@mote-ui/icons" dist/assets/*.js   # 应为 0（icons 被摇掉）
```

## 注意事项

- `mote-ui` 内部 `@mote-ui/icons` 是 `workspace:*` 依赖，构建时已 `external`，preserveModules 后这条 external 关系必须保留，否则 icons 的 workspace 协议会破坏安装。
- 改完需 `pnpm --filter @mote-ui/icons build`（icons 是前置依赖）再 `pnpm --filter mote-ui build`。
- 发布用 changeset（根目录 `.changeset/`）：`pnpm version-packages` 生成版本，`pnpm release`（内部 `pnpm build && changeset publish`）。
- 这是**破坏性变更**（`exports` 结构变化），建议 minor 版本（1.1.0）而非 patch，并在 CHANGELOG 说明新按需引入方式。

## 非目标（本次不做）

- 样式按需拆分（维持全量 `dist/style.css`）。
- 组件级独立样式文件（`dist/style/popup.css` 之类）。
- 修改组件内部实现或 API。
