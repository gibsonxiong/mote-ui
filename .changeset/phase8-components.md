---
'mote-ui': minor
---

阶段 8 · 数据录入补充，新增五个组件：

- **Stepper 步进器**：min/max/step/precision、disable-input、三档尺寸，接入 Form 校验
- **Rate 评分**：max/allow-half/readonly/size，半星点击区，接入 Form 校验
- **Slider 滑块**：min/max/step、指针拖动、轨道点按、键盘方向键、拖动气泡
- **Search 搜索**：shape/show-action/clearable，回车触发 search 事件，默认文案走语言包
- **Uploader 文件上传**：图片本地预览、max-count/max-size、before-read/after-read 钩子、失败状态遮罩

配套更新：语言包新增 `search.placeholder` 与 `uploader.*` 文案（zh/en）；README 增加项目范围声明与 v1.0 路线图。
