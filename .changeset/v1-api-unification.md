---
'mote-ui': major
---

v1.0 全量 API 审计与约定统一：

- 破坏性变更：Notify 组件形式显隐由 `visible` prop 改为 `v-model`（modelValue），与 Popup/Dialog 对齐；组件形式以 `MtNotifyComponent` 导出并支持全局注册
- 破坏性变更：ImagePreview 由 `v-model:show` 改为 `v-model`，全库布尔显隐统一为 `v-model` 约定
- 审计确认：46 个组件的组件名与注册名一致、类型导出全覆盖、全部使用 typed emits
