<script setup lang="ts">
import { computed, inject } from 'vue'
import { MtIconStar, MtIconStarFilled } from '@mote-ui/icons'
import { formItemKey } from '../form/types'
import type { MtRateProps } from './types'

defineOptions({
  name: 'MtRate',
})

const props = withDefaults(defineProps<MtRateProps>(), {
  modelValue: 0,
  max: 5,
  allowHalf: false,
  disabled: false,
  readonly: false,
  size: 'normal',
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
}>()

const formItem = inject(formItemKey, null)

const items = computed(() => Array.from({ length: props.max }, (_, index) => index + 1))

const interactive = computed(() => !props.disabled && !props.readonly)

const classes = computed(() => [
  'mt-rate',
  `mt-rate--${props.size}`,
  {
    'is-disabled': props.disabled,
    'is-readonly': props.readonly,
  },
])

function isFull(index: number) {
  return props.modelValue >= index
}

function isHalf(index: number) {
  return props.allowHalf && props.modelValue >= index - 0.5 && props.modelValue < index
}

function select(value: number) {
  if (!interactive.value || value === props.modelValue) return
  emit('update:modelValue', value)
  emit('change', value)
  formItem?.onFieldChange()
}
</script>

<template>
  <div role="radiogroup" :class="classes">
    <span
      v-for="index in items"
      :key="index"
      role="radio"
      :aria-checked="modelValue >= index"
      class="mt-rate__item"
      :class="{ 'is-full': isFull(index), 'is-half': isHalf(index) }"
      @click="select(index)"
    >
      <MtIconStarFilled class="mt-rate__star mt-rate__star--active" />
      <MtIconStar class="mt-rate__star mt-rate__star--void" />
      <span
        v-if="allowHalf"
        class="mt-rate__half"
        :aria-label="`${index - 0.5}`"
        @click.stop="select(index - 0.5)"
      >
        <MtIconStarFilled class="mt-rate__star mt-rate__star--active" />
      </span>
    </span>
  </div>
</template>

<style lang="scss">
.mt-rate {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;

  &__item {
    position: relative;
    display: inline-flex;
    cursor: pointer;

    & + & {
      margin-left: 4px;
    }
  }

  &__star {
    font-size: 20px;

    &--void {
      color: var(--mt-border-color);
    }

    &--active {
      display: none;
      color: var(--mt-color-warning);
    }
  }

  &__item.is-full {
    .mt-rate__star--active {
      display: block;
    }

    .mt-rate__star--void {
      display: none;
    }
  }

  &__half {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    overflow: hidden;
    cursor: pointer;

    .mt-rate__star--active {
      display: block;
    }
  }

  &__item.is-half {
    .mt-rate__star--void {
      display: block;
    }
  }

  // ---- sizes ----
  &--small .mt-rate__star {
    font-size: 16px;
  }

  &--large .mt-rate__star {
    font-size: 26px;
  }

  // ---- states ----
  &.is-disabled &__item {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.is-readonly &__item {
    cursor: default;
  }
}
</style>
