import { format, translate } from '../../locale'
import type { MtFormItemRule, MtRuleValue } from './types'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isEmpty(value: MtRuleValue | undefined): boolean {
  if (value === undefined || value === null) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  return false
}

function defaultMessage(rule: MtFormItemRule): string {
  if (rule.required) return translate('form.required')
  if (rule.pattern) return translate('form.pattern')
  if (rule.type === 'email') return translate('form.email')
  if (rule.min !== undefined && rule.max !== undefined) {
    return format(translate('form.range'), { min: rule.min, max: rule.max })
  }
  if (rule.min !== undefined) return format(translate('form.min'), { min: rule.min })
  if (rule.max !== undefined) return format(translate('form.max'), { max: rule.max })
  return translate('form.validateFailed')
}

function checkRule(rule: MtFormItemRule, value: MtRuleValue | undefined): string | null {
  if (rule.required && isEmpty(value)) {
    return rule.message ?? defaultMessage(rule)
  }
  if (isEmpty(value)) return null

  if (rule.type === 'array' && !Array.isArray(value)) {
    return rule.message ?? translate('form.typeMismatch')
  }
  if (rule.type === 'string' && typeof value !== 'string') {
    return rule.message ?? translate('form.typeMismatch')
  }
  if (rule.type === 'number' && typeof value !== 'number') {
    return rule.message ?? translate('form.typeMismatch')
  }
  if (rule.type === 'boolean' && typeof value !== 'boolean') {
    return rule.message ?? translate('form.typeMismatch')
  }

  const stringValue = String(value)

  if (rule.pattern && !rule.pattern.test(stringValue)) {
    return rule.message ?? defaultMessage(rule)
  }
  if (rule.type === 'email' && !EMAIL_PATTERN.test(stringValue)) {
    return rule.message ?? defaultMessage(rule)
  }

  const length = Array.isArray(value) ? value.length : stringValue.length
  if (typeof value === 'number') {
    if (rule.min !== undefined && value < rule.min) return rule.message ?? defaultMessage(rule)
    if (rule.max !== undefined && value > rule.max) return rule.message ?? defaultMessage(rule)
  } else {
    if (rule.min !== undefined && length < rule.min) return rule.message ?? defaultMessage(rule)
    if (rule.max !== undefined && length > rule.max) return rule.message ?? defaultMessage(rule)
  }

  return null
}

/**
 * Validates a value against a rule list. Resolves when all rules pass;
 * rejects with the first error message otherwise.
 */
export async function validateRules(
  rules: MtFormItemRule[],
  value: MtRuleValue | undefined,
  trigger?: string,
): Promise<void> {
  const active = rules.filter((rule) => {
    if (!trigger || !rule.trigger) return true
    const triggers = Array.isArray(rule.trigger) ? rule.trigger : [rule.trigger]
    return triggers.includes(trigger as 'change' | 'blur')
  })

  for (const rule of active) {
    const message = checkRule(rule, value)
    if (message) {
      throw new Error(message)
    }
    if (rule.validator) {
      const result = rule.validator(rule, value)
      if (result === false) {
        throw new Error(rule.message ?? defaultMessage(rule))
      }
      if (result instanceof Promise) {
        await result
      }
    }
  }
}
