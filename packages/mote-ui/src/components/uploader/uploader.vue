<script setup lang="ts">
import { computed, ref } from 'vue'
import { MtIconPlus, MtIconClose, MtIconPhoto, MtIconLoading } from '@mote-ui/icons'
import { useLocale } from '../../locale'
import type { MtUploaderFile, MtUploaderProps } from './types'

defineOptions({
  name: 'MtUploader',
})

const props = withDefaults(defineProps<MtUploaderProps>(), {
  modelValue: () => [],
  accept: 'image/*',
  multiple: false,
  maxCount: Infinity,
  maxSize: Infinity,
  disabled: false,
  readonly: false,
  beforeRead: undefined,
  afterRead: undefined,
  capture: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [files: MtUploaderFile[]]
  oversize: [file: File]
  delete: [file: MtUploaderFile, index: number]
}>()

const { t } = useLocale()

const inputRef = ref<HTMLInputElement>()

const showTrigger = computed(() => !props.disabled && props.modelValue.length < props.maxCount)

const classes = computed(() => ['mt-uploader', { 'is-disabled': props.disabled }])

function isImage(file: File) {
  return file.type.startsWith('image/')
}

function readFile(file: File): Promise<MtUploaderFile> {
  return new Promise((resolve) => {
    if (!isImage(file)) {
      resolve({ file, name: file.name, status: 'done' })
      return
    }
    const reader = new FileReader()
    reader.onload = () => resolve({ file, url: String(reader.result), status: 'done' })
    reader.onerror = () =>
      resolve({ file, name: file.name, status: 'failed', message: t('uploader.failed') })
    reader.readAsDataURL(file)
  })
}

async function handleChange(event: Event) {
  const input = event.target as HTMLInputElement
  const selected = Array.from(input.files ?? [])
  input.value = ''
  if (props.disabled || selected.length === 0) return

  const remaining = props.maxCount - props.modelValue.length
  if (remaining <= 0) return

  let files = selected.slice(0, remaining)
  const accepted: File[] = []
  for (const file of files) {
    if (file.size > props.maxSize) {
      emit('oversize', file)
      continue
    }
    accepted.push(file)
  }
  if (accepted.length === 0) return

  if (props.beforeRead) {
    const result = await props.beforeRead(accepted.length === 1 ? accepted[0] : accepted)
    if (result === false) return
    if (result instanceof File) {
      files = [result]
    } else if (Array.isArray(result)) {
      files = result
    } else {
      files = accepted
    }
  } else {
    files = accepted
  }

  const items = await Promise.all(files.map((file) => readFile(file)))
  emit('update:modelValue', [...props.modelValue, ...items])

  if (props.afterRead) {
    try {
      await props.afterRead(items.length === 1 ? items[0] : items)
    } catch {
      const failed = items.map((item) => ({
        ...item,
        status: 'failed' as const,
        message: item.message || t('uploader.failed'),
      }))
      emit('update:modelValue', [...props.modelValue, ...failed])
    }
  }
}

function handleDelete(index: number) {
  const next = props.modelValue.filter((_, position) => position !== index)
  emit('update:modelValue', next)
  emit('delete', props.modelValue[index], index)
}

function openPicker() {
  if (props.disabled) return
  inputRef.value?.click()
}
</script>

<template>
  <div :class="classes">
    <div class="mt-uploader__wrapper">
      <div
        v-for="(item, index) in modelValue"
        :key="index"
        class="mt-uploader__preview"
        :class="`is-${item.status ?? 'done'}`"
      >
        <img v-if="item.url" class="mt-uploader__image" :src="item.url" alt="">
        <div v-else class="mt-uploader__file">
          <MtIconPhoto class="mt-uploader__file-icon" />
          <span class="mt-uploader__file-name">{{ item.name }}</span>
        </div>
        <div
          v-if="item.status === 'uploading' || item.status === 'failed'"
          class="mt-uploader__mask"
        >
          <MtIconLoading v-if="item.status === 'uploading'" class="mt-uploader__loading" />
          <span class="mt-uploader__message">{{
            item.message || (item.status === 'failed' ? t('uploader.failed') : '')
          }}</span>
        </div>
        <span
          v-if="!readonly && !disabled"
          class="mt-uploader__delete"
          role="button"
          aria-label="delete"
          @click="handleDelete(index)"
        >
          <MtIconClose />
        </span>
      </div>
      <div v-if="showTrigger" class="mt-uploader__trigger" role="button" @click="openPicker">
        <slot>
          <MtIconPlus class="mt-uploader__trigger-icon" />
          <span class="mt-uploader__trigger-text">{{ t('uploader.upload') }}</span>
        </slot>
        <input
          ref="inputRef"
          class="mt-uploader__input"
          type="file"
          :accept="accept"
          :multiple="multiple"
          :capture="capture"
          :disabled="disabled"
          @change="handleChange"
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.mt-uploader {
  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: var(--mt-spacing-sm);
  }

  &__preview,
  &__trigger {
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: var(--mt-radius-lg);
    overflow: hidden;
  }

  &__preview {
    background-color: var(--mt-fill-color-light);
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__file {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--mt-spacing-xs);
    width: 100%;
    height: 100%;
    padding: var(--mt-spacing-xs);
    color: var(--mt-text-color-secondary);
  }

  &__file-icon {
    font-size: 22px;
  }

  &__file-name {
    max-width: 100%;
    font-size: var(--mt-font-size-xs);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__mask {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--mt-spacing-xs);
    background-color: rgba(0, 0, 0, 0.55);
    color: #ffffff;
    font-size: var(--mt-font-size-xs);
  }

  &__loading {
    font-size: var(--mt-font-size-xl);
    animation: mt-uploader-rotate 0.8s linear infinite;
  }

  &__message {
    padding: 0 var(--mt-spacing-xs);
    text-align: center;
  }

  &__delete {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 0 0 0 var(--mt-radius-lg);
    background-color: rgba(0, 0, 0, 0.55);
    color: #ffffff;
    font-size: var(--mt-font-size-xs);
    cursor: pointer;
  }

  &__trigger {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--mt-spacing-xs);
    border: 1px dashed var(--mt-border-color);
    background-color: var(--mt-fill-color-light);
    color: var(--mt-text-color-secondary);
    cursor: pointer;
  }

  &__trigger-icon {
    font-size: 22px;
  }

  &__trigger-text {
    font-size: var(--mt-font-size-xs);
  }

  &__input {
    display: none;
  }

  &.is-disabled &__trigger {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

@keyframes mt-uploader-rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
