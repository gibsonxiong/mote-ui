<script setup lang="ts">
import { computed } from 'vue'
import type { MtHighlightProps } from './types'

defineOptions({
  name: 'MtHighlight',
})

const props = withDefaults(defineProps<MtHighlightProps>(), {
  text: '',
  keywords: undefined,
  highlightStyle: undefined,
  highlightClass: undefined,
  caseSensitive: false,
})

interface HighlightSegment {
  text: string
  highlighted: boolean
}

function normalizeKeywords(keywords?: string | string[]): string[] {
  if (keywords == null) return []
  const list = Array.isArray(keywords) ? keywords : [keywords]
  return list.filter((item) => item !== '')
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const segments = computed<HighlightSegment[]>(() => {
  const source = props.text
  const keywords = normalizeKeywords(props.keywords)

  if (!source) return []
  if (keywords.length === 0) return [{ text: source, highlighted: false }]

  const flags = props.caseSensitive ? 'g' : 'gi'
  const pattern = keywords.map(escapeRegExp).join('|')
  const regex = new RegExp(`(${pattern})`, flags)

  // String.split keeps captured groups, so odd indices are matches.
  return source.split(regex).map((text, index) => ({
    text,
    highlighted: index % 2 === 1,
  }))
})
</script>

<template>
  <span class="mt-highlight">
    <slot>
      <template v-for="(segment, index) in segments" :key="index">
        <mark
          v-if="segment.highlighted"
          class="mt-highlight__mark"
          :class="highlightClass"
          :style="highlightStyle"
        >
          {{ segment.text }}
        </mark>
        <template v-else>{{ segment.text }}</template>
      </template>
    </slot>
  </span>
</template>

<style lang="scss">
.mt-highlight {
  &__mark {
    padding: 0;
    background: transparent;
    color: var(--mt-color-primary);
  }
}
</style>