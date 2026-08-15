import type { MtLocaleMessages } from '../types'

const enUS: MtLocaleMessages = {
  name: 'en-US',
  common: {
    confirm: 'Confirm',
    cancel: 'Cancel',
    loading: 'Loading',
  },
  empty: {
    description: 'No data',
  },
  image: {
    error: 'Failed to load',
  },
  form: {
    required: 'This field is required',
    pattern: 'Invalid format',
    email: 'Please enter a valid email address',
    range: 'Length must be between {min} and {max}',
    min: 'Length cannot be less than {min}',
    max: 'Length cannot exceed {max}',
    typeMismatch: 'Type mismatch',
    validateFailed: 'Validation failed',
  },
}

export default enUS
