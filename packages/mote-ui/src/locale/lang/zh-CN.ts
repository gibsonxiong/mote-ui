import type { MtLocaleMessages } from '../types'

const zhCN: MtLocaleMessages = {
  name: 'zh-CN',
  common: {
    confirm: '确认',
    cancel: '取消',
    loading: '加载中',
  },
  empty: {
    description: '暂无数据',
  },
  image: {
    error: '加载失败',
  },
  form: {
    required: '该字段为必填项',
    pattern: '格式不正确',
    email: '请输入有效的邮箱地址',
    range: '长度需在 {min} 到 {max} 之间',
    min: '长度不能少于 {min}',
    max: '长度不能超过 {max}',
    typeMismatch: '类型不匹配',
    validateFailed: '校验失败',
  },
  search: {
    placeholder: '请输入搜索关键词',
  },
  cascader: {
    placeholder: '请选择',
  },
  calendar: {
    title: '日期选择',
    confirm: '确定',
    start: '开始',
    end: '结束',
    startEnd: '开始/结束',
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    monthTitle: '{year} 年 {month} 月',
  },
  uploader: {
    upload: '上传文件',
    sizeExceed: '文件大小不能超过 {max}',
    failed: '上传失败',
  },
  list: {
    loading: '正在加载...',
    finished: '没有更多了',
    error: '加载失败，点击重试',
  },
  pullRefresh: {
    pulling: '下拉即可刷新...',
    loosing: '释放即可刷新...',
    loading: '正在加载...',
    success: '刷新成功',
  },
  signature: {
    clear: '清除',
  },
}

export default zhCN
