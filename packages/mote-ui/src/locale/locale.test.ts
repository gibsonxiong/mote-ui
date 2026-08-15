import { afterEach, describe, expect, it } from 'vitest'
import { validateRules } from '../components/form/validator'
import { enUS, zhCN, format, getLocale, setLocale, translate } from './index'

describe('locale', () => {
  afterEach(() => setLocale(zhCN))

  it('defaults to zh-CN', () => {
    expect(getLocale().name).toBe('zh-CN')
    expect(translate('common.confirm')).toBe('确认')
  })

  it('switches the global locale with setLocale', () => {
    setLocale(enUS)
    expect(getLocale().name).toBe('en-US')
    expect(translate('empty.description')).toBe('No data')
  })

  it('formats message templates with placeholders', () => {
    expect(format('Length must be between {min} and {max}', { min: 2, max: 5 })).toBe(
      'Length must be between 2 and 5',
    )
    expect(format('no placeholders', {})).toBe('no placeholders')
  })

  it('returns an empty string for unknown paths', () => {
    expect(translate('unknown.path')).toBe('')
  })

  it('localizes built-in validator messages', async () => {
    setLocale(enUS)
    await expect(validateRules([{ required: true }], '')).rejects.toThrow(
      'This field is required',
    )
  })
})
