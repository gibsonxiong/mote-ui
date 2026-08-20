<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { nextZIndex } from '../../utils/z-index'
import type { MtNumberKeyboardProps } from './types'

defineOptions({
  name: 'MtNumberKeyboard',
})

const props = withDefaults(defineProps<MtNumberKeyboardProps>(), {
  modelValue: '',
  show: false,
  title: undefined,
  theme: 'default',
  maxlength: Infinity,
  zIndex: undefined,
  extraKey: '',
  closeButtonText: undefined,
  showDeleteKey: true,
  hideOnClickOutside: true,
  safeAreaInsetBottom: true,
  teleport: 'body',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:show': [value: boolean]
  input: [key: string]
  delete: []
  close: []
}>()

const rootRef = ref<HTMLElement>()

// Mirrors Popup/Overlay: auto-allocate a z-index when omitted so the keyboard
// always floats above other layers opened earlier.
const allocatedZIndex = ref(0)

watch(
  () => props.show,
  (visible) => {
    if (visible && props.zIndex === undefined) allocatedZIndex.value = nextZIndex()
  },
  { immediate: true },
)

const zIndex = computed(() => props.zIndex ?? allocatedZIndex.value)

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

function appendKey(key: string) {
  emit('input', key)
  if (props.modelValue.length < props.maxlength) {
    emit('update:modelValue', props.modelValue + key)
  }
}

function handleDelete() {
  emit('delete')
  emit('update:modelValue', props.modelValue.slice(0, -1))
}

function handleExtra() {
  if (props.extraKey) emit('input', props.extraKey)
}

function handleClose() {
  emit('close')
  emit('update:show', false)
}

function onDocumentClick(event: MouseEvent) {
  if (!props.hideOnClickOutside) return
  const root = rootRef.value
  if (root && !root.contains(event.target as Node)) {
    emit('update:show', false)
  }
}

watch(
  () => props.show,
  (visible) => {
    if (visible) document.addEventListener('click', onDocumentClick)
    else document.removeEventListener('click', onDocumentClick)
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
})
</script>

<template>
  <Teleport :to="teleport">
    <Transition name="mt-number-keyboard-slide">
      <div
        v-if="show"
        ref="rootRef"
        class="mt-number-keyboard"
        :style="{ zIndex }"
        :class="{ 'mt-number-keyboard--inset': safeAreaInsetBottom }"
      >
        <div class="mt-number-keyboard__header">
          <button type="button" class="mt-number-keyboard__close" aria-label="close" @click="handleClose">
            <slot name="title-left">
              <span v-if="closeButtonText">{{ closeButtonText }}</span>
              <svg v-else viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
              </svg>
            </slot>
          </button>
          <div class="mt-number-keyboard__title">
            <slot name="title">{{ title }}</slot>
          </div>
        </div>
        <div v-if="theme === 'default'" class="mt-number-keyboard__keys">
          <button
            v-for="key in keys"
            :key="key"
            type="button"
            class="mt-number-keyboard__key"
            @click="appendKey(key)"
          >
            {{ key }}
          </button>
          <button
            type="button"
            class="mt-number-keyboard__key mt-number-keyboard__key--extra"
            :disabled="!extraKey"
            @click="handleExtra"
          >
            <slot name="extra-key">{{ extraKey }}</slot>
          </button>
          <button type="button" class="mt-number-keyboard__key" @click="appendKey('0')">0</button>
          <button
            v-if="showDeleteKey"
            type="button"
            class="mt-number-keyboard__key mt-number-keyboard__key--delete"
            aria-label="delete"
            @click="handleDelete"
          >
            <slot name="delete">
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z" />
              </svg>
            </slot>
          </button>
          <span v-else class="mt-number-keyboard__key mt-number-keyboard__key--placeholder" />
        </div>
        <slot v-else />
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
.mt-number-keyboard {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--mt-bg-color-overlay);
  user-select: none;
  touch-action: manipulation;

  &--inset {
    padding-bottom: env(safe-area-inset-bottom);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    padding: 0 var(--mt-spacing-lg);
  }

  &__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    margin-left: calc(var(--mt-spacing-lg) * -1);
    padding: 0;
    border: none;
    background-color: transparent;
    color: var(--mt-color-primary);
    font-size: var(--mt-font-size-md);
    cursor: pointer;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  &__title {
    flex: 1;
    text-align: center;
    color: var(--mt-text-color-primary);
    font-size: var(--mt-font-size-md);
    font-weight: var(--mt-font-weight-medium);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__keys {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background-color: var(--mt-border-color-lighter);
  }

  &__key {
    height: 48px;
    padding: 0;
    border: none;
    background-color: var(--mt-bg-color-overlay);
    color: var(--mt-text-color-primary);
    font-size: var(--mt-font-size-xl);
    cursor: pointer;

    &:active {
      background-color: var(--mt-fill-color-light);
    }

    &:disabled {
      cursor: not-allowed;
    }

    &--delete {
      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
}

.mt-number-keyboard-slide-enter-active,
.mt-number-keyboard-slide-leave-active {
  transition: transform var(--mt-duration-normal) var(--mt-easing-standard);
}

.mt-number-keyboard-slide-enter-from,
.mt-number-keyboard-slide-leave-to {
  transform: translateY(100%);
}
</style>