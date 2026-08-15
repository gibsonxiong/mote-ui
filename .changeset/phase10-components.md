---
'mote-ui': minor
---

阶段 10 · 滚动场景，新增五个组件并增强 Popup：

- Swipe 轮播：手势切换、自动播放、循环、纵向、指示点
- SwipeCell 滑动单元格：左右滑出操作区、受控开合、点击外部收起
- List 无限滚动列表：IntersectionObserver 哨兵检查、错误重试、自动补屏
- PullRefresh 下拉刷新：阻尼手势、成功提示、head 插槽
- BackTop 回到顶部：window/自定义滚动容器、平滑滚动
- Popup：z-index 全局自增分配，后开弹层自动盖住先开弹层

配套：语言包新增 `list.*` 与 `pullRefresh.*` 文案（zh/en）。
