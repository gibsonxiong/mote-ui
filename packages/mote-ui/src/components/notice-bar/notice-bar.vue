<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import MtIcon from '../icon/icon.vue'
import type { MtNoticeBarProps } from './types'

defineOptions({
  name: 'MtNoticeBar',
})

const props = withDefaults(defineProps<MtNoticeBarProps>(), {
  text: undefined,
  scrollable: false,
  speed: 60,
  leftIcon: undefined,
  closeable: false,
  wrapable: false,
  color: undefined,
  background: undefined,
})

const emit = defineEmits<{
  close: []
}>()

const shown = ref(true)
const wrapRef = ref<HTMLElement>()
const textRef = ref<HTMLElement>()
// Seconds for one scroll loop; undefined keeps the text static
const duration = ref<number>()

function measure() {
  if (!props.scrollable || !wrapRef.value || !textRef.value) return
  const distance = wrapRef.value.offsetWidth + textRef.value.offsetWidth
  if (distance > 0 && props.speed > 0) duration.value = distance / props.speed
}

onMounted(measure)

function handleClose() {
  shown.value = false
  emit('close')
}

const barStyle = computed(() => ({
  color: props.color,
  backgroundColor: props.background,
}))

const textStyle = computed(() =>
  duration.value
    ? {
        animation: `mt-notice-bar-scroll ${duration.value}s linear infinite`,
        '--mt-notice-bar-from': `${wrapRef.value?.offsetWidth ?? 0}px`,
        '--mt-notice-bar-to': `-${textRef.value?.offsetWidth ?? 0}px`,
      }
    : undefined,
)
</script>

<template>
  <div
    v-show="shown"
    class="mt-notice-bar"
    :class="{ 'mt-notice-bar--wrapable': wrapable }"
    role="alert"
    :style="barStyle"
  >
    <span v-if="leftIcon" class="mt-notice-bar__left-icon">
      <MtIcon :name="leftIcon" />
    </span>
    <div ref="wrapRef" class="mt-notice-bar__wrap">
      <div ref="textRef" class="mt-notice-bar__text" :style="textStyle">
        <slot>{{ text }}</slot>
      </div>
    </div>
    <span v-if="closeable" class="mt-notice-bar__close" @click="handleClose">
      <slot name="right-icon">
        <MtIcon name="close" />
      </slot>
    </span>
  </div>
</template>

<style lang="scss">
.mt-notice-bar {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  color: var(--mt-color-warning);
  background-color: rgba(230, 162, 60, 0.1);
  font-size: var(--mt-font-size-sm);

  &__left-icon {
    flex-shrink: 0;
    margin-right: 6px;
    display: inline-flex;
  }

  &__wrap {
    flex: 1;
    min-width: 0;
    overflow: hidden;
  }

  &__text {
    display: inline-block;
    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &--wrapable {
    .mt-notice-bar__wrap {
      overflow: visible;
    }

    .mt-notice-bar__text {
      white-space: normal;
      max-width: none;
    }
  }

  &__close {
    flex-shrink: 0;
    margin-left: 6px;
    display: inline-flex;
    cursor: pointer;
  }
}

@keyframes mt-notice-bar-scroll {
  from {
    transform: translateX(var(--mt-notice-bar-from, 0));
  }

  to {
    transform: translateX(var(--mt-notice-bar-to, -100%));
  }
}
</style>
