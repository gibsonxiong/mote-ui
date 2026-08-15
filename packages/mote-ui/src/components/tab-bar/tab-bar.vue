<script setup lang="ts">
import { computed, provide, reactive, ref, toRefs, watch } from 'vue'
import type { MtTabBarContext, MtTabBarProps, MtTabBarValue } from './types'
import { tabBarKey } from './types'

defineOptions({
  name: 'MtTabBar',
})

const props = withDefaults(defineProps<MtTabBarProps>(), {
  modelValue: undefined,
  fixed: false,
  placeholder: false,
  border: true,
  safeAreaInsetBottom: false,
  zIndex: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: MtTabBarValue]
  change: [value: MtTabBarValue]
}>()

const items: object[] = []

const internalActive = ref<MtTabBarValue | undefined>(undefined)

watch(
  () => props.modelValue,
  (value) => {
    internalActive.value = value
  },
  { immediate: true },
)

const currentActive = computed(() => internalActive.value ?? 0)

const register = (item: object) => {
  items.push(item)
  return items.length - 1
}

const unregister = (item: object) => {
  const index = items.indexOf(item)
  if (index > -1) {
    items.splice(index, 1)
  }
}

const select = (value: MtTabBarValue) => {
  if (value !== currentActive.value) {
    internalActive.value = value
    emit('update:modelValue', value)
    emit('change', value)
  }
}

provide(
  tabBarKey,
  reactive({
    ...toRefs(props),
    modelValue: currentActive,
    register,
    unregister,
    select,
  }) as unknown as MtTabBarContext,
)

const showPlaceholder = computed(() => props.fixed && props.placeholder)

const classes = computed(() => [
  'mt-tab-bar',
  {
    'mt-tab-bar--border': props.border,
    'mt-tab-bar--fixed': props.fixed,
    'mt-tab-bar--safe-bottom': props.safeAreaInsetBottom,
  },
])

const style = computed(() => (props.zIndex !== undefined ? { zIndex: props.zIndex } : undefined))
</script>

<template>
  <div v-if="showPlaceholder" class="mt-tab-bar__placeholder" aria-hidden="true" />
  <div :class="classes" :style="style" role="tablist">
    <slot />
  </div>
</template>

<style lang="scss">
.mt-tab-bar {
  --mt-tab-bar-height: 50px;

  display: flex;
  box-sizing: content-box;
  height: var(--mt-tab-bar-height);
  background: var(--mt-bg-color);
  user-select: none;

  &--border {
    border-top: 1px solid var(--mt-border-color-light);
  }

  &--fixed {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
  }

  &--safe-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }

  &__placeholder {
    --mt-tab-bar-height: 50px;

    height: var(--mt-tab-bar-height);
  }
}
</style>
