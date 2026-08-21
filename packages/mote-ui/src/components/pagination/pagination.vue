<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { MtPaginationProps } from './types'

defineOptions({
  name: 'MtPagination',
})

const props = withDefaults(defineProps<MtPaginationProps>(), {
  modelValue: 1,
  mode: 'multi',
  prevText: '',
  nextText: '',
  pageCount: undefined,
  totalItems: 0,
  itemsPerPage: 10,
  showPageSize: 5,
  forceEllipses: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
}>()

const total = computed(() => {
  const count = props.pageCount ?? Math.ceil(props.totalItems / props.itemsPerPage)
  return Math.max(1, count)
})

const internalCurrent = ref(props.modelValue)
const currentPage = computed(() => {
  const value = internalCurrent.value
  return Math.min(Math.max(value, 1), total.value)
})

watch(
  () => props.modelValue,
  (value) => {
    internalCurrent.value = value
  },
  { immediate: true },
)

// The visible page sequence, mixing numbers and an ellipsis marker.
const items = computed<(number | string)[]>(() => {
  const count = total.value
  const size = Math.max(1, props.showPageSize)
  const current = currentPage.value

  if (count <= size) {
    return Array.from({ length: count }, (_, i) => i + 1)
  }

  const inner = Math.max(1, size - 2)
  let start = current - Math.floor((inner - 1) / 2)
  start = Math.max(2, start)
  let end = start + inner - 1
  if (end > count - 1) {
    end = count - 1
    start = Math.max(2, end - inner + 1)
  }

  const result: (number | string)[] = [1]
  if (start > 2 || props.forceEllipses) result.push('...')
  for (let i = start; i <= end; i++) result.push(i)
  if (end < count - 1 || props.forceEllipses) result.push('...')
  result.push(count)
  return result
})

function isNumber(item: number | string): item is number {
  return typeof item === 'number'
}

function go(page: number) {
  if (page < 1 || page > total.value || page === currentPage.value) return
  internalCurrent.value = page
  emit('update:modelValue', page)
  emit('change', page)
}
</script>

<template>
  <div class="mt-pagination" role="navigation" aria-label="Pagination">
    <button
      type="button"
      class="mt-pagination__item mt-pagination__prev"
      :disabled="currentPage === 1"
      @click="go(currentPage - 1)"
    >
      <span v-if="prevText">{{ prevText }}</span>
      <svg v-else viewBox="0 0 20 20" aria-hidden="true">
        <path d="M12.5 4l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" />
      </svg>
    </button>

    <template v-if="mode === 'simple'">
      <span class="mt-pagination__page mt-pagination__page--current">{{ currentPage }}</span>
      <span class="mt-pagination__separator">/</span>
      <span class="mt-pagination__page">{{ total }}</span>
    </template>
    <template v-else>
      <template v-for="(item, index) in items" :key="index">
        <span v-if="!isNumber(item)" class="mt-pagination__ellipsis">{{ item }}</span>
        <button
          v-else
          type="button"
          class="mt-pagination__item"
          :class="{ 'mt-pagination__item--active': item === currentPage }"
          @click="go(item)"
        >
          {{ item }}
        </button>
      </template>
    </template>

    <button
      type="button"
      class="mt-pagination__item mt-pagination__next"
      :disabled="currentPage === total"
      @click="go(currentPage + 1)"
    >
      <span v-if="nextText">{{ nextText }}</span>
      <svg v-else viewBox="0 0 20 20" aria-hidden="true">
        <path d="M7.5 4l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" />
      </svg>
    </button>
  </div>
</template>

<style lang="scss">
.mt-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  &__item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    min-width: 32px;
    height: 32px;
    padding: 0 6px;
    border: none;
    border-radius: var(--mt-radius-base);
    background: transparent;
    color: var(--mt-text-color-regular);
    font-size: var(--mt-font-size-md);
    cursor: pointer;
    transition: background-color var(--mt-duration-fast) var(--mt-easing-standard);

    svg {
      width: 16px;
      height: 16px;
    }

    &:disabled {
      color: var(--mt-text-color-disabled);
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: var(--mt-fill-color-light);
    }

    &--active {
      background: var(--mt-color-primary);
      color: #fff;

      &:not(:disabled):hover {
        background: var(--mt-color-primary);
      }
    }
  }

  &__page {
    padding: 0 4px;
    color: var(--mt-text-color-regular);
    font-size: var(--mt-font-size-md);

    &--current {
      color: var(--mt-color-primary);
    }
  }

  &__separator {
    color: var(--mt-text-color-placeholder);
  }

  &__ellipsis {
    min-width: 24px;
    text-align: center;
    color: var(--mt-text-color-secondary);
    font-size: var(--mt-font-size-md);
  }
}
</style>