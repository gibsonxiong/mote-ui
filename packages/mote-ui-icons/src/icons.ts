import { h } from 'vue'
import { createIcon } from './create-icon'

export const MtIconArrowRight = createIcon('MtIconArrowRight', () => [h('path', { d: 'm9 6 6 6-6 6' })])

export const MtIconArrowLeft = createIcon('MtIconArrowLeft', () => [h('path', { d: 'm15 6-6 6 6 6' })])

export const MtIconArrowUp = createIcon('MtIconArrowUp', () => [h('path', { d: 'm6 15 6-6 6 6' })])

export const MtIconArrowDown = createIcon('MtIconArrowDown', () => [h('path', { d: 'm6 9 6 6 6-6' })])

export const MtIconClose = createIcon('MtIconClose', () => [
  h('path', { d: 'M6 6l12 12' }),
  h('path', { d: 'M18 6 6 18' }),
])

export const MtIconSuccess = createIcon('MtIconSuccess', () => [h('path', { d: 'm5 13 4 4 10-10' })])

export const MtIconLoading = createIcon('MtIconLoading', () => [
  h('path', { d: 'M12 3a9 9 0 1 0 9 9' }),
])
