<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { MtIconArrowRight, MtIconSuccess } from '@mote-ui/icons'
import { useLocale } from '../../locale'
import { formItemKey } from '../form/types'
import type { MtCascaderOption, MtCascaderProps, MtCascaderValue } from './types'

defineOptions({
  name: 'MtCascader',
})

const props = withDefaults(defineProps<MtCascaderProps>(), {
  modelValue: () => [],
  options: () => [],
  props: undefined,
  title: undefined,
  placeholder: undefined,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: MtCascaderValue[]]
  change: [value: MtCascaderValue[], selectedOptions: MtCascaderOption[]]
}>()

const { t } = useLocale()

const formItem = inject(formItemKey, null)

const fieldNames = computed(() => ({
  value: props.props?.value ?? 'value',
  label: props.props?.label ?? 'label',
  children: props.props?.children ?? 'children',
  disabled: props.props?.disabled ?? 'disabled',
}))

function getValue(option: MtCascaderOption): MtCascaderValue {
  return option[fieldNames.value.value] as MtCascaderValue
}

function getLabel(option: MtCascaderOption): string {
  return String(option[fieldNames.value.label] ?? '')
}

function getChildren(option: MtCascaderOption): MtCascaderOption[] {
  const children = option[fieldNames.value.children]
  return Array.isArray(children) ? (children as MtCascaderOption[]) : []
}

function isDisabled(option: MtCascaderOption): boolean {
  return Boolean(option[fieldNames.value.disabled])
}

function hasChildren(option: MtCascaderOption): boolean {
  return getChildren(option).length > 0
}

// Walks the option tree along the given value path, keeping the part that
// still matches when the data or value is only partially consistent.
function resolvePath(values: MtCascaderValue[]): MtCascaderOption[] {
  const path: MtCascaderOption[] = []
  let levelOptions = props.options
  for (const value of values) {
    const found = levelOptions.find((option) => getValue(option) === value)
    if (!found) break
    path.push(found)
    levelOptions = getChildren(found)
  }
  return path
}

// Stops at the leaf's own level for a complete path so the selected leaf
// stays visible; stops one level deeper for a partial path ending on a branch.
function levelForPath(path: MtCascaderOption[]): number {
  if (path.length === 0) return 0
  return hasChildren(path[path.length - 1]) ? path.length : path.length - 1
}

const selected = ref<MtCascaderOption[]>(resolvePath(props.modelValue))
// Level of the pane currently shown; ranges from 0 to selected.length.
const activeLevel = ref(levelForPath(selected.value))

watch(
  () => props.modelValue,
  () => {
    selected.value = resolvePath(props.modelValue)
    activeLevel.value = levelForPath(selected.value)
  },
)
watch(
  () => props.options,
  () => {
    selected.value = resolvePath(props.modelValue)
    activeLevel.value = Math.min(activeLevel.value, selected.value.length)
  },
)

const tabs = computed(() => {
  const last = selected.value[selected.value.length - 1]
  // Only append the trailing placeholder tab when the path can still drill
  // deeper (empty path, or the last selected option is a branch). A completed
  // leaf selection has no deeper level, so no empty "please select" tab.
  const canDrill = selected.value.length === 0 || (last !== undefined && hasChildren(last))
  return Array.from({ length: selected.value.length + (canDrill ? 1 : 0) }, (_, level) => ({
    level,
    text:
      level < selected.value.length
        ? getLabel(selected.value[level])
        : props.placeholder ?? t('cascader.placeholder'),
  }))
})

const paneOptions = computed(() => {
  let levelOptions = props.options
  for (let level = 0; level < activeLevel.value; level += 1) {
    levelOptions = getChildren(selected.value[level])
  }
  return levelOptions
})

function isOptionSelected(option: MtCascaderOption): boolean {
  const current = selected.value[activeLevel.value]
  return current !== undefined && getValue(current) === getValue(option)
}

function handleTabClick(level: number) {
  if (props.disabled) return
  activeLevel.value = level
}

function handleSelect(option: MtCascaderOption) {
  if (props.disabled || isDisabled(option)) return
  const nextPath = selected.value.slice(0, activeLevel.value).concat(option)
  selected.value = nextPath
  if (hasChildren(option)) {
    activeLevel.value = nextPath.length
    return
  }
  const values = nextPath.map(getValue)
  emit('update:modelValue', values)
  emit('change', values, nextPath)
  formItem?.onFieldChange()
}
</script>

<template>
  <div class="mt-cascader" :class="{ 'is-disabled': disabled }">
    <div v-if="title" class="mt-cascader__title">{{ title }}</div>
    <div class="mt-cascader__tabs" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.level"
        type="button"
        role="tab"
        class="mt-cascader__tab"
        :class="{ 'is-active': tab.level === activeLevel }"
        :aria-selected="tab.level === activeLevel"
        :disabled="disabled"
        @click="handleTabClick(tab.level)"
      >
        {{ tab.text }}
      </button>
    </div>
    <ul class="mt-cascader__pane" role="listbox">
      <li
        v-for="option in paneOptions"
        :key="String(getValue(option))"
        role="option"
        class="mt-cascader__option"
        :class="{
          'is-selected': isOptionSelected(option),
          'is-disabled': isDisabled(option),
        }"
        :aria-selected="isOptionSelected(option)"
        :aria-disabled="isDisabled(option)"
        @click="handleSelect(option)"
      >
        <span class="mt-cascader__option-label">{{ getLabel(option) }}</span>
        <MtIconSuccess v-if="isOptionSelected(option)" class="mt-cascader__option-icon" />
        <MtIconArrowRight v-else-if="hasChildren(option)" class="mt-cascader__option-icon" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.mt-cascader {
  background-color: var(--mt-bg-color);

  &__title {
    padding: 16px;
    color: var(--mt-text-color-primary);
    font-size: var(--mt-font-size-lg);
    font-weight: var(--mt-font-weight-bold);
    text-align: center;
  }

  &__tabs {
    display: flex;
    padding: 0 8px;
    overflow-x: auto;
    border-bottom: 1px solid var(--mt-border-color);
  }

  &__tab {
    flex-shrink: 0;
    max-width: 50%;
    padding: 10px 8px;
    border: none;
    background: none;
    color: var(--mt-text-color-secondary);
    font-size: var(--mt-font-size-md);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;

    &.is-active {
      color: var(--mt-color-primary);
      font-weight: 600;
      box-shadow: inset 0 -2px 0 var(--mt-color-primary);
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  &__pane {
    margin: 0;
    padding: 0;
    list-style: none;
    max-height: 320px;
    overflow-y: auto;
  }

  &__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    color: var(--mt-text-color-primary);
    font-size: var(--mt-font-size-md);
    cursor: pointer;

    &.is-selected {
      color: var(--mt-color-primary);
      font-weight: 600;
    }

    &.is-disabled {
      color: var(--mt-text-color-placeholder);
      cursor: not-allowed;
    }
  }

  &__option-label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__option-icon {
    flex-shrink: 0;
    margin-left: 8px;
    font-size: var(--mt-font-size-lg);
  }

  &.is-disabled .mt-cascader__option:not(.is-disabled) {
    color: var(--mt-text-color-placeholder);
    cursor: not-allowed;
  }
}
</style>
