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
  search: {
    placeholder: 'Please enter keywords',
  },
  cascader: {
    placeholder: 'Please select',
  },
  calendar: {
    title: 'Date selection',
    confirm: 'OK',
    start: 'Start',
    end: 'End',
    startEnd: 'Start/End',
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    monthTitle: '{month} {year}',
  },
  uploader: {
    upload: 'Upload',
    sizeExceed: 'File size cannot exceed {max}',
    failed: 'Upload failed',
  },
  list: {
    loading: 'Loading...',
    finished: 'No more data',
    error: 'Failed to load, tap to retry',
  },
  pullRefresh: {
    pulling: 'Pull down to refresh...',
    loosing: 'Release to refresh...',
    loading: 'Loading...',
    success: 'Refreshed successfully',
  },
  signature: {
    clear: 'Clear',
  },
  area: {
    title: 'Select region',
  },
}

export default enUS
