import { defineComponent, h, type PropType, type VNodeArrayChildren } from 'vue'

export interface MtIconProps {
  size?: string | number
  color?: string
}

/**
 * Creates an SVG icon component from a list of inner SVG children.
 * All icons use a 24x24 viewBox and inherit `currentColor` by default.
 */
export function createIcon(name: string, renderChildren: () => VNodeArrayChildren) {
  return defineComponent({
    name,
    props: {
      size: {
        type: [String, Number] as PropType<string | number>,
        default: '1em',
      },
      color: {
        type: String,
        default: undefined,
      },
    },
    setup(props) {
      return () =>
        h(
          'svg',
          {
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: '0 0 24 24',
            width: props.size,
            height: props.size,
            fill: 'none',
            stroke: props.color ?? 'currentColor',
            'stroke-width': 2,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            class: 'mt-icon',
            role: 'img',
            'aria-label': name.replace(/^MtIcon/, '').toLowerCase(),
          },
          renderChildren(),
        )
    },
  })
}
