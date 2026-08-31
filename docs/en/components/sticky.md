# Sticky

Fixes an element to the top or bottom of the screen while scrolling.

## Basic Usage

Sticks to the top by default; `offset` sets the distance after sticking. The example below mimics a product detail page whose title bar stays pinned to the top:

<PhonePreview>
  <div style="height: 360px; overflow: auto">
    <MtSticky :offset="0">
      <div style="display: flex; align-items: center; justify-content: space-between; height: 44px; padding: 0 12px; background: var(--mt-color-primary); color: #fff">
        <span>Product Detail</span>
        <span>Favorite</span>
      </div>
    </MtSticky>
    <div style="padding: 16px 12px; line-height: 1.6; font-size: 16px; font-weight: 600">Mote UI Mobile Component Library</div>
    <div style="padding: 0 12px 12px; line-height: 1.8; color: var(--mt-text-color-secondary); font-size: 14px">
      A lightweight Vue 3 mobile component library inspired by Element Plus design tokens, with 60+ components covering form, feedback, navigation and display. Scroll down and the top title bar sticks to the container top.
    </div>
    <div style="padding: 12px; margin: 0 12px 12px; background: var(--mt-bg-color); border-radius: 8px; line-height: 1.8; color: var(--mt-text-color-regular); font-size: 14px">
      Key Features<br />· Vue 3 + TypeScript<br />· On-demand import with tree-shaking<br />· Dark mode support<br />· Well tested
    </div>
    <div style="padding: 0 12px 12px; line-height: 1.8; color: var(--mt-text-color-secondary); font-size: 14px">
      Keep scrolling and the title bar stays visible. This is the most typical use case for sticky layout.
    </div>
  </div>
</PhonePreview>

```vue
<div style="height: 360px; overflow: auto">
  <MtSticky :offset="0">
    <div style="background: var(--mt-color-primary); color: #fff">Product Detail</div>
  </MtSticky>
  <!-- detail content -->
</div>
```

## Custom Offset

`offset` controls the distance from the container top after sticking, useful when there is another fixed element above:

<PhonePreview>
  <div style="height: 360px; overflow: auto">
    <div style="height: 48px; display: flex; align-items: center; padding: 0 12px; background: var(--mt-bg-color); font-size: 15px; font-weight: 600; border-bottom: 1px solid var(--mt-border-color)">Fixed Header</div>
    <MtSticky :offset="48">
      <div style="height: 40px; display: flex; align-items: center; padding: 0 12px; background: var(--mt-color-warning); color: #fff">Sticky Tab (48px from top)</div>
    </MtSticky>
    <div v-for="i in 10" :key="i" style="line-height: 40px; padding: 0 12px; border-bottom: 1px solid var(--mt-border-color); color: var(--mt-text-color-regular)">
      List item {{ i }}
    </div>
  </div>
</PhonePreview>

```vue
<MtSticky :offset="48">
  <div>Sticky content</div>
</MtSticky>
```

## Sticky Bottom

`position="bottom"` sticks to the bottom of the container, commonly used for a cart checkout bar:

<PhonePreview>
  <div style="height: 360px; overflow: auto">
    <div v-for="item in 8" :key="item" style="display: flex; align-items: center; justify-content: space-between; height: 52px; padding: 0 12px; border-bottom: 1px solid var(--mt-border-color)">
      <span style="color: var(--mt-text-color-regular)">Product {{ item }}</span>
      <span style="color: var(--mt-color-danger)">${{ item * 10 }}.00</span>
    </div>
    <MtSticky position="bottom" :offset="0">
      <div style="display: flex; align-items: center; justify-content: space-between; height: 52px; padding: 0 12px; background: var(--mt-bg-color); border-top: 1px solid var(--mt-border-color)">
        <span style="color: var(--mt-color-danger); font-size: 16px; font-weight: 600">Total $360.00</span>
        <span style="display: inline-block; height: 36px; line-height: 36px; padding: 0 20px; background: var(--mt-color-danger); color: #fff; border-radius: 18px">Checkout</span>
      </div>
    </MtSticky>
  </div>
</PhonePreview>

```vue
<MtSticky position="bottom" :offset="0">
  <div>Checkout bar</div>
</MtSticky>
```

## Multiple Sticky Elements

A page can contain multiple `Sticky` elements, each sticking independently. This is common for grouped list headers: as you scroll, each group header pushes the previous one up. Note that each group should be wrapped in a container so the sticky header is constrained to its own group:

<PhonePreview>
  <div style="height: 360px; overflow: auto">
    <div>
      <MtSticky :offset="0">
        <div style="height: 40px; display: flex; align-items: center; padding: 0 12px; background: var(--mt-color-primary); color: #fff; font-size: 15px">Group A</div>
      </MtSticky>
      <div v-for="i in 4" :key="'a' + i" style="line-height: 44px; padding: 0 12px; border-bottom: 1px solid var(--mt-border-color); color: var(--mt-text-color-regular)">
        Group A · Member {{ i }}
      </div>
    </div>
    <div>
      <MtSticky :offset="0">
        <div style="height: 40px; display: flex; align-items: center; padding: 0 12px; background: var(--mt-color-primary); color: #fff; font-size: 15px">Group B</div>
      </MtSticky>
      <div v-for="i in 4" :key="'b' + i" style="line-height: 44px; padding: 0 12px; border-bottom: 1px solid var(--mt-border-color); color: var(--mt-text-color-regular)">
        Group B · Member {{ i }}
      </div>
    </div>
    <div>
      <MtSticky :offset="0">
        <div style="height: 40px; display: flex; align-items: center; padding: 0 12px; background: var(--mt-color-primary); color: #fff; font-size: 15px">Group C</div>
      </MtSticky>
      <div v-for="i in 4" :key="'c' + i" style="line-height: 44px; padding: 0 12px; border-bottom: 1px solid var(--mt-border-color); color: var(--mt-text-color-regular)">
        Group C · Member {{ i }}
      </div>
    </div>
  </div>
</PhonePreview>

```vue
<div style="height: 360px; overflow: auto">
  <div>
    <MtSticky :offset="0">
      <div>Group A</div>
    </MtSticky>
    <!-- Group A members -->
  </div>
  <div>
    <MtSticky :offset="0">
      <div>Group B</div>
    </MtSticky>
    <!-- Group B members -->
  </div>
</div>
```

## Events

`change` fires when the sticky state changes, `scroll` fires on scroll with the scroll position:

<PhonePreview>
  <div style="height: 360px; overflow: auto">
    <MtSticky @change="(fixed) => fixed && console.log('fixed')" @scroll="(top) => console.log(top)">
      <div style="height: 44px; display: flex; align-items: center; padding: 0 12px; background: var(--mt-color-primary); color: #fff">Sticky Title</div>
    </MtSticky>
    <div v-for="i in 10" :key="i" style="line-height: 40px; padding: 0 12px; border-bottom: 1px solid var(--mt-border-color)">
      Content line {{ i }}
    </div>
  </div>
</PhonePreview>

```vue
<MtSticky @change="onChange" @scroll="onScroll">
  <div>Sticky content</div>
</MtSticky>
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| offset | Sticking distance — from the top when `position` is `top`, from the bottom when `bottom` | `number` | `0` |
| position | Sticking position | `'top' \| 'bottom'` | `'top'` |
| target | Scroll container selector; listens to `window` when omitted | `string` | `''` |
| z-index | z-index | `number` | `100` |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| change | Emitted when the sticky state changes | `(fixed: boolean)` |
| scroll | Emitted on scroll | `(scrollTop: number, fixed: boolean)` |

### Slots

| Name | Description |
| --- | --- |
| default | The content to stick |
