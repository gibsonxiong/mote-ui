<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref, watch } from 'vue'
import MtIcon from '../icon/icon.vue'
import Overlay from '../overlay/overlay.vue'
import { nextZIndex } from '../../utils/z-index'
import type { MtDropdownItemProps, MtDropdownOption, MtDropdownValue } from './types'
import { dropdownMenuKey } from './types'

defineOptions({
  name: 'MtDropdownItem',
})

const props = withDefaults(defineProps<MtDropdownItemProps>(), {
  modelValue: undefined,
  title: undefined,
  options: () => [],
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: MtDropdownValue]
  change: [value: MtDropdownValue]
  open: []
  close: []
  opened: []
  closed: []
}>()

const ctx = inject(dropdownMenuKey, null)

const item: object = {}
const index = ctx ? ctx.register(item) : -1

onBeforeUnmount(() => {
  ctx?.unregister(item)
})

const open = computed(() => ctx !== null && ctx.activeIndex === index)

const selectedOption = computed(
  () => props.options.find((option) => option.value === props.modelValue) ?? null,
)

const displayTitle = computed(() => selectedOption.value?.text ?? props.title ?? '')

const activeColor = computed(() => ctx?.activeColor ?? 'var(--mt-color-primary)')

const zIndex = ref(0)

watch(open, (value) => {
  if (value) {
    zIndex.value = ctx?.zIndex ?? nextZIndex()
  }
})

watch(open, (value) => {
  if (value) emit('open')
  else emit('close')
})

function onTitleClick() {
  if (props.disabled || !ctx) return
  ctx.toggle(index)
}

function onOverlayClick() {
  if (!ctx) return
  // Closing is handled by the parent; respect the shared flag.
  if (ctx.closeOnClickOverlay) ctx.close()
}

function onSelect(option: MtDropdownOption) {
  if (option.disabled) return
  emit('update:modelValue', option.value)
  emit('change', option.value)
  ctx?.close()
}

const optionsStyle = computed(() => {
  const base = ctx?.direction === 'up' ? { bottom: '48px' } : { top: '48px' }
  return { ...base, zIndex: zIndex.value + 1 }
})

const iconName = computed(() => {
  const up = ctx?.direction === 'up'
  return open.value ? (up ? 'arrow-down' : 'arrow-up') : up ? 'arrow-up' : 'arrow-down'
})
</script>

<template>
  <div class="mt-dropdown-item" :class="{ 'is-disabled': disabled }">
    <div class="mt-dropdown-item__title" role="button" @click="onTitleClick">
      <span
        class="mt-dropdown-item__title-text"
        :style="selectedOption ? { color: activeColor } : undefined"
      >
        {{ displayTitle }}
      </span>
      <MtIcon :name="iconName" size="12" class="mt-dropdown-item__arrow" />
    </div>
    <Teleport to="body">
      <Overlay
        :model-value="open && (ctx?.overlay ?? true)"
        :z-index="zIndex"
        :duration="ctx?.duration ?? 300"
        @click="onOverlayClick"
      />
      <Transition
        :name="ctx?.direction === 'up' ? 'mt-dropdown-item-slide-up' : 'mt-dropdown-item-slide-down'"
        :duration="ctx?.duration ?? 300"
        @after-enter="emit('opened')"
        @after-leave="emit('closed')"
      >
        <div v-if="open" class="mt-dropdown-item__options" :style="optionsStyle">
          <div
            v-for="option in options"
            :key="option.value"
            class="mt-dropdown-item__option"
            :class="{
              'is-active': option.value === modelValue,
              'is-disabled': option.disabled,
            }"
            @click="onSelect(option)"
          >
            <span class="mt-dropdown-item__option-text">{{ option.text }}</span>
            <MtIcon
              v-if="option.value === modelValue"
              name="success"
              size="16"
              class="mt-dropdown-item__option-icon"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss">
.mt-dropdown-item {
  display: flex;
  flex: 1;
  justify-content: center;
  min-width: 0;
  cursor: pointer;

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    padding: 0 8px;
  }

  &__title-text {
    overflow: hidden;
    color: var(--mt-text-color-primary);
    font-size: var(--mt-font-size-md);
    line-height: var(--mt-line-height-tight);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__arrow {
    margin-left: 4px;
    color: var(--mt-text-color-secondary);
    flex-shrink: 0;
  }

  &__options {
    position: fixed;
    left: 0;
    right: 0;
    overflow-y: auto;
    max-height: 60%;
    background-color: var(--mt-bg-color);
  }

  &__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    padding: 0 16px;
    color: var(--mt-text-color-primary);
    font-size: var(--mt-font-size-md);
    cursor: pointer;

    &:active {
      background-color: var(--mt-fill-color-light);
    }

    &.is-active {
      color: var(--mt-color-primary);
      font-weight: var(--mt-font-weight-medium);
    }

    &.is-disabled {
      color: var(--mt-text-color-placeholder);
      cursor: not-allowed;

      &:active {
        background-color: transparent;
      }
    }
  }

  &__option-text {
    flex: 1;
  }

  &__option-icon {
    margin-left: 8px;
  }
}

.mt-dropdown-item-slide-down-enter-active,
.mt-dropdown-item-slide-down-leave-active,
.mt-dropdown-item-slide-up-enter-active,
.mt-dropdown-item-slide-up-leave-active {
  transition: opacity var(--mt-duration-normal) var(--mt-easing-standard),
    transform var(--mt-duration-normal) var(--mt-easing-standard);
}

.mt-dropdown-item-slide-down-enter-from,
.mt-dropdown-item-slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.mt-dropdown-item-slide-up-enter-from,
.mt-dropdown-item-slide-up-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>