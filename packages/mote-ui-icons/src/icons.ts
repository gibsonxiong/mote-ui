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

export const MtIconSearch = createIcon('MtIconSearch', () => [
  h('circle', { cx: 11, cy: 11, r: 7 }),
  h('path', { d: 'm20 20-4-4' }),
])

export const MtIconPlus = createIcon('MtIconPlus', () => [
  h('path', { d: 'M12 5v14' }),
  h('path', { d: 'M5 12h14' }),
])

export const MtIconStar = createIcon('MtIconStar', () => [
  h('path', {
    d: 'm12 3 2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 16.9l-5.4 2.9 1.1-6.1L3.2 9.4l6.1-.8L12 3z',
  }),
])

export const MtIconStarFilled = createIcon('MtIconStarFilled', () => [
  h('path', {
    d: 'm12 3 2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 16.9l-5.4 2.9 1.1-6.1L3.2 9.4l6.1-.8L12 3z',
    fill: 'currentColor',
    stroke: 'none',
  }),
])

export const MtIconPhoto = createIcon('MtIconPhoto', () => [
  h('rect', { x: 3, y: 5, width: 18, height: 14, rx: 2 }),
  h('circle', { cx: 9, cy: 10, r: 1.5 }),
  h('path', { d: 'm5 19 5-5 3 3 3-3 3 3' }),
])
