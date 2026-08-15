---
'mote-ui': minor
---

阶段 9 · 时间与级联，新增三个组件并增强既有能力：

- **DatetimePicker 时间选择**：date/time/datetime/year-month 四种模式，min/max 范围约束、filter/formatter，年月切换自动收敛合法日期
- **Cascader 级联选择**：全路径数组绑定（对齐 Element Plus）、`props` 字段名映射、分层 tab 交互、禁用选项
- **Calendar 日历**：single/range 双模式、月份分组滚动、区间起止标记、免确认模式
- **Form 增强**：异步校验暴露 `validating` 状态（is-validating class），序列号机制防止慢异步结果覆盖新一轮校验

配套更新：语言包新增 `cascader.placeholder` 与 `calendar.*` 文案（zh/en）。
