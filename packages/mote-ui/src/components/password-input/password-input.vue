<script setup lang="ts">
import { computed } from 'vue'
import type { MtPasswordInputProps } from './types'

defineOptions({
  name: 'MtPasswordInput',
})

const props = withDefaults(defineProps<MtPasswordInputProps>(), {
  modelValue: '',
  info: undefined,
  errorInfo: undefined,
  length: 6,
  gutter: 0,
  mask: true,
  focused: false,
})

const emit = defineEmits<{
  focus: [event: FocusEvent]
}>()

const value = computed(() => String(props.modelValue ?? ''))
const cells = computed(() => Array.from({ length: props.length }, (_, index) => index))

const gutterStyle = computed(() =>
  typeof props.gutter === 'number' ? `${props.gutter}px` : props.gutter,
)

const hintText = computed(() => props.errorInfo ?? props.info)

function cellMargin(index: number) {
  return index === props.length - 1 ? '0' : gutterStyle.value
}

function showCursor(index: number) {
  return props.focused && index === value.value.length
}
</script>

<template>
  <div class="mt-password-input">
    <div class="mt-password-input__security" tabindex="0" @focus="emit('focus', $event)">
      <div
        v-for="index in cells"
        :key="index"
        class="mt-password-input__cell"
        :class="{ 'mt-password-input__cell--cursor': showCursor(index) }"
        :style="{ marginRight: cellMargin(index) }"
      >
        <template v-if="value[index]">
          <span v-if="mask" class="mt-password-input__dot" />
          <span v-else class="mt-password-input__char">{{ value[index] }}</span>
        </template>
        <span v-else-if="showCursor(index)" class="mt-password-input__cursor" />
      </div>
    </div>
    <div
      v-if="hintText"
      :class="[
        'mt-password-input__hint',
        { 'mt-password-input__hint--error': errorInfo },
      ]"
    >
      {{ hintText }}
    </div>
  </div>
</template>

<style lang="scss">
.mt-password-input {
  display: inline-flex;
  flex-direction: column;
  align-items: center;

  &__security {
    display: flex;
    align-items: center;
    outline: none;
  }

  &__cell {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 48px;
    border: 1px solid var(--mt-border-color-light);
    border-radius: var(--mt-radius-base);
    background-color: var(--mt-bg-color);
    color: var(--mt-text-color-primary);
    font-size: var(--mt-font-size-lg);
    line-height: 1;
  }

  &__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: currentColor;
  }

  &__char {
    font-weight: var(--mt-font-weight-medium);
  }

  &__cursor {
    width: 2px;
    height: 22px;
    background-color: var(--mt-color-primary);
    animation: mt-password-input-blink 1s steps(2, start) infinite;
  }

  &__hint {
    margin-top: var(--mt-spacing-sm);
    font-size: var(--mt-font-size-sm);
    color: var(--mt-text-color-secondary);

    &--error {
      color: var(--mt-color-danger);
    }
  }
}

@keyframes mt-password-input-blink {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>