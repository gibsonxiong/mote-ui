<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useLocale } from '../../locale'
import type { MtSignatureProps } from './types'

defineOptions({
  name: 'MtSignature',
})

const props = withDefaults(defineProps<MtSignatureProps>(), {
  type: 'png',
  penColor: '#000',
  lineWidth: 3,
  backgroundColor: '',
  tips: undefined,
  clearButtonText: undefined,
  confirmButtonText: undefined,
})

const emit = defineEmits<{
  start: [event: PointerEvent]
  end: []
  signing: [signing: boolean]
  submit: [content: { canvas: HTMLCanvasElement | null; image: string }]
  clear: []
}>()

const { t } = useLocale()

const clearLabel = computed(() => props.clearButtonText ?? t('signature.clear'))
const confirmLabel = computed(() => props.confirmButtonText ?? t('common.confirm'))

const canvasRef = ref<HTMLCanvasElement>()
const signing = ref(false)

const mimeType = computed(() => (props.type === 'jpg' ? 'image/jpeg' : 'image/png'))

function getContext() {
  // happy-dom and some test environments provide a canvas element without a
  // real 2D context — guard so drawing degrades gracefully instead of throwing.
  return canvasRef.value?.getContext?.('2d') ?? null
}

function getPosition(event: PointerEvent) {
  const canvas = canvasRef.value
  if (!canvas) return { x: 0, y: 0 }
  if (typeof event.offsetX === 'number') return { x: event.offsetX, y: event.offsetY }
  const rect = canvas.getBoundingClientRect()
  return { x: event.clientX - rect.left, y: event.clientY - rect.top }
}

function onPointerDown(event: PointerEvent) {
  const ctx = getContext()
  const { x, y } = getPosition(event)
  emit('start', event)
  signing.value = true
  emit('signing', true)
  if (ctx) {
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.strokeStyle = props.penColor
    ctx.lineWidth = props.lineWidth
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
  window.addEventListener('pointercancel', onPointerUp)
}

function onPointerMove(event: PointerEvent) {
  if (!signing.value) return
  const ctx = getContext()
  const { x, y } = getPosition(event)
  if (ctx) {
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}

function onPointerUp() {
  removeWindowListeners()
  if (!signing.value) return
  signing.value = false
  emit('end')
  emit('signing', false)
}

function removeWindowListeners() {
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  window.removeEventListener('pointercancel', onPointerUp)
}

function fillBackground(ctx: CanvasRenderingContext2D, width: number, height: number) {
  if (!props.backgroundColor) return
  ctx.fillStyle = props.backgroundColor
  ctx.fillRect(0, 0, width, height)
}

function resize() {
  const canvas = canvasRef.value
  if (!canvas) return
  const width = canvas.offsetWidth || 300
  const height = canvas.offsetHeight || 150
  if (canvas.width !== width) canvas.width = width
  if (canvas.height !== height) canvas.height = height
  const ctx = getContext()
  if (ctx) fillBackground(ctx, width, height)
}

function clear() {
  const canvas = canvasRef.value
  const ctx = getContext()
  emit('clear')
  if (canvas && ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    fillBackground(ctx, canvas.width, canvas.height)
  }
}

function submit() {
  const canvas = canvasRef.value
  const image = canvas?.toDataURL?.(mimeType.value) ?? ''
  emit('submit', { canvas: canvas ?? null, image })
}

onMounted(() => {
  resize()
})

onBeforeUnmount(() => {
  removeWindowListeners()
})

defineExpose({ resize, clear, submit })
</script>

<template>
  <div class="mt-signature">
    <div class="mt-signature__canvas" @touchstart.prevent>
      <canvas ref="canvasRef" class="mt-signature__ctx" @pointerdown.prevent="onPointerDown" />
    </div>
    <div v-if="tips" class="mt-signature__tips">{{ tips }}</div>
    <div class="mt-signature__footer">
      <button type="button" class="mt-signature__btn" @click="clear">{{ clearLabel }}</button>
      <button type="button" class="mt-signature__btn mt-signature__btn--confirm" @click="submit">
        {{ confirmLabel }}
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.mt-signature {
  border: 1px solid var(--mt-border-color-light);
  border-radius: var(--mt-radius-lg);
  overflow: hidden;

  &__canvas {
    height: 168px;
    background-color: var(--mt-bg-color);
  }

  &__ctx {
    display: block;
    width: 100%;
    height: 100%;
    cursor: crosshair;
    touch-action: none;
  }

  &__tips {
    padding: var(--mt-spacing-sm) var(--mt-spacing-md);
    font-size: var(--mt-font-size-sm);
    color: var(--mt-text-color-secondary);
  }

  &__footer {
    display: flex;
    border-top: 1px solid var(--mt-border-color-lighter);

    .mt-signature__btn:not(:first-child) {
      margin-left: 1px;
    }
  }

  &__btn {
    flex: 1;
    height: 44px;
    padding: 0;
    border: none;
    background-color: var(--mt-bg-color);
    color: var(--mt-text-color-primary);
    font-size: var(--mt-font-size-md);
    cursor: pointer;

    &:active {
      background-color: var(--mt-fill-color-light);
    }

    &--confirm {
      color: var(--mt-color-primary);
    }
  }
}
</style>