<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { useLocale } from '../../locale'
import type { MtEmptyProps } from './types'

defineOptions({
  name: 'MtEmpty',
})

const props = withDefaults(defineProps<MtEmptyProps>(), {
  image: undefined,
  imageSize: undefined,
  description: undefined,
})

const slots = useSlots()

const { t } = useLocale()

const imageStyle = computed(() => {
  if (props.imageSize === undefined) {
    return undefined
  }
  const width = typeof props.imageSize === 'number' ? `${props.imageSize}px` : props.imageSize
  return { width }
})
</script>

<template>
  <div class="mt-empty">
    <div class="mt-empty__image" :style="imageStyle">
      <slot name="image">
        <img v-if="image" :src="image" class="mt-empty__img">
        <svg v-else viewBox="0 0 160 120" fill="none" aria-hidden="true">
          <ellipse cx="80" cy="104" rx="52" ry="8" fill="var(--mt-fill-color-light)" />
          <path d="M38 46h84l-10 50H48L38 46z" fill="var(--mt-border-color-lighter)" />
          <path d="M32 34h96v12H32z" fill="var(--mt-border-color-light)" />
          <path d="M64 46h32l-4 14H68l-4-14z" fill="var(--mt-border-color)" />
        </svg>
      </slot>
    </div>
    <div class="mt-empty__description">
      <slot name="description">{{ description ?? t('empty.description') }}</slot>
    </div>
    <div v-if="slots.default" class="mt-empty__footer">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.mt-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--mt-spacing-xl) 0;

  &__image {
    width: 160px;
    line-height: 0;

    svg {
      width: 100%;
      height: auto;
    }
  }

  &__img {
    width: 100%;
    height: auto;
  }

  &__description {
    margin-top: var(--mt-spacing-md);
    font-size: var(--mt-font-size-md);
    color: var(--mt-text-color-secondary);
  }

  &__footer {
    margin-top: var(--mt-spacing-lg);
  }
}
</style>
