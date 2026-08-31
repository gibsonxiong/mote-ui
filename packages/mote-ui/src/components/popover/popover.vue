<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import MtIcon from '../icon/icon.vue'
import Overlay from '../overlay/overlay.vue'
import { nextZIndex } from '../../utils/z-index'
import { lockScroll, unlockScroll } from '../../utils/lock-scroll'
import { usePopoverPosition } from '../../composables/use-popover-position'
import type { MtPopoverAction, MtPopoverProps } from './types'

defineOptions({
  name: 'MtPopover',
})

const props = withDefaults(defineProps<MtPopoverProps>(), {
  modelValue: false,
  placement: 'bottom',
  align: 'center',
  actions: () => [],
  offset: 8,
  closeOnSelect: true,
  overlay: false,
  closeOnClickOverlay: true,
  teleport: 'body',
  zIndex: undefined,
  duration: 200,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  open: []
  close: []
  opened: []
  closed: []
  select: [action: MtPopoverAction, index: number]
  clickOverlay: [event: MouseEvent]
}>()

const rootRef = ref<HTMLElement>()
const panelRef = ref<HTMLElement>()

// Auto-allocate a z-index when omitted, so popovers stack in opening order.
const allocatedZIndex = ref(0)

watch(
  () => props.modelValue,
  (visible) => {
    if (visible) {
      if (props.zIndex === undefined) allocatedZIndex.value = nextZIndex()
      if (props.overlay) lockScroll()
    } else {
      if (props.overlay) unlockScroll()
    }
  },
  { immediate: true },
)

const baseZIndex = computed(() => props.zIndex ?? allocatedZIndex.value)

onBeforeUnmount(() => {
  if (props.modelValue && props.overlay) unlockScroll()
})

const { panelStyle, currentPlacement } = usePopoverPosition({
  triggerRef: rootRef,
  panelRef,
  placement: computed(() => props.placement),
  align: computed(() => props.align),
  offset: computed(() => props.offset),
  visible: computed(() => props.modelValue),
})

function setVisible(value: boolean) {
  if (value === props.modelValue) return
  emit('update:modelValue', value)
}

function handleTriggerClick() {
  setVisible(!props.modelValue)
}

// Clicks outside the popover close the floating panel
function handleDocumentClick(event: MouseEvent) {
  if (!rootRef.value || rootRef.value.contains(event.target as Node)) return
  if (panelRef.value && panelRef.value.contains(event.target as Node)) return
  setVisible(false)
}

// Keyboard: Esc closes and returns focus to the trigger
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.modelValue) {
    setVisible(false)
    rootRef.value?.querySelector<HTMLElement>('.mt-popover__reference')?.focus()
  }
}

watch(
  () => props.modelValue,
  (visible) => {
    if (visible) document.addEventListener('click', handleDocumentClick)
    else document.removeEventListener('click', handleDocumentClick)
  },
  { immediate: true },
)

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
  document.removeEventListener('keydown', handleKeydown)
})

function handleOverlayClick(event: MouseEvent) {
  emit('clickOverlay', event)
  if (props.closeOnClickOverlay) setVisible(false)
}

function handleSelect(action: MtPopoverAction, index: number) {
  if (action.disabled) return
  emit('select', action, index)
  if (props.closeOnSelect) setVisible(false)
}

function handleTriggerKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleTriggerClick()
  }
}
</script>

<template>
  <div ref="rootRef" class="mt-popover">
    <div
      class="mt-popover__reference"
      role="button"
      tabindex="0"
      :aria-expanded="modelValue"
      aria-haspopup="menu"
      @click="handleTriggerClick"
      @keydown="handleTriggerKeydown"
    >
      <slot name="reference" />
    </div>

    <Teleport :to="teleport">
      <Overlay
        v-if="overlay"
        :model-value="modelValue"
        :z-index="baseZIndex"
        :duration="duration"
        @click="handleOverlayClick"
      />
      <Transition
        name="mt-popover-fade"
        :duration="duration"
        @before-enter="emit('open')"
        @after-enter="emit('opened')"
        @before-leave="emit('close')"
        @after-leave="emit('closed')"
      >
        <div
          v-if="modelValue"
          ref="panelRef"
          class="mt-popover__panel"
          :class="`mt-popover__panel--${currentPlacement}`"
          :style="{ ...panelStyle, zIndex: baseZIndex + 1 }"
          role="menu"
        >
          <slot>
            <div
              v-for="(action, index) in actions"
              :key="index"
              class="mt-popover__action"
              :class="{ 'mt-popover__action--disabled': action.disabled }"
              role="menuitem"
              :aria-disabled="action.disabled"
              @click="handleSelect(action, index)"
            >
              <MtIcon v-if="action.icon" class="mt-popover__action-icon" :name="action.icon" />
              <span>{{ action.text }}</span>
            </div>
          </slot>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss">
.mt-popover {
  display: inline-block;

  &__reference {
    display: inline-flex;
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid var(--mt-color-primary);
      outline-offset: 2px;
    }
  }

  &__panel {
    position: fixed;
    min-width: 120px;
    padding: 4px 0;
    background: var(--mt-bg-color);
    border-radius: var(--mt-radius-base);
    box-shadow: 0 2px 12px rgb(50 50 51 / 12%);
  }

  &__action {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    font-size: var(--mt-font-size-sm);
    color: var(--mt-text-color-primary);
    white-space: nowrap;
    cursor: pointer;

    &:active {
      background: var(--mt-bg-color-page);
    }

    &--disabled {
      color: var(--mt-text-color-disabled);
      cursor: not-allowed;

      &:active {
        background: none;
      }
    }
  }

  &__action-icon {
    margin-right: 6px;
  }
}

// ---- Fade + scale ----
.mt-popover-fade-enter-active,
.mt-popover-fade-leave-active {
  transition: opacity var(--mt-duration-fast) var(--mt-easing-standard),
    transform var(--mt-duration-fast) var(--mt-easing-standard);
}

.mt-popover-fade-enter-from,
.mt-popover-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
