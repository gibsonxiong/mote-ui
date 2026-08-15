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
}

export default zhCN
