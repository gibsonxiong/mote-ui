# TabBar

<script setup>
import { ref } from 'vue'
import { showToast } from 'mote-ui'

const active = ref(0)
const namedActive = ref('home')
</script>

A bottom tab bar for switching between views.

## Basic Usage

Items are identified by index by default; `v-model` binds the active item:

<PhonePreview>
  <MtTabBar v-model="active" @change="(value) => showToast(`Switched to item ${value}`)">
    <MtTabBarItem title="Home" />
    <MtTabBarItem title="Discover" />
    <MtTabBarItem title="Messages" />
    <MtTabBarItem title="Me" />
  </MtTabBar>
</PhonePreview>

```vue
<script setup>
const active = ref(0)
</script>

<template>
  <MtTabBar v-model="active">
    <MtTabBarItem title="Home" />
    <MtTabBarItem title="Discover" />
    <MtTabBarItem title="Messages" />
    <MtTabBarItem title="Me" />
  </MtTabBar>
</template>
```

## Badges and Dots

`badge` shows a numeric badge (values above `99` render as `99+`); `dot` shows a small red dot:

<PhonePreview>
  <MtTabBar :model-value="0">
    <MtTabBarItem title="Home" />
    <MtTabBarItem title="Messages" :badge="8" />
    <MtTabBarItem title="Favorites" :badge="120" />
    <MtTabBarItem title="Feed" dot />
  </MtTabBar>
</PhonePreview>

```vue
<MtTabBar>
  <MtTabBarItem title="Messages" :badge="8" />
  <MtTabBarItem title="Favorites" :badge="120" />
  <MtTabBarItem title="Feed" dot />
</MtTabBar>
```

## Named Items and Icon Slots

Use `name` for string identifiers; the `icon` slot accepts any icon content:

<PhonePreview>
  <MtTabBar v-model="namedActive">
    <MtTabBarItem name="home" title="Home">
      <template #icon>🏠</template>
    </MtTabBarItem>
    <MtTabBarItem name="search" title="Discover">
      <template #icon>🔍</template>
    </MtTabBarItem>
    <MtTabBarItem name="mine" title="Me">
      <template #icon>👤</template>
    </MtTabBarItem>
  </MtTabBar>
</PhonePreview>

```vue
<MtTabBar v-model="active">
  <MtTabBarItem name="home" title="Home">
    <template #icon>🏠</template>
  </MtTabBarItem>
</MtTabBar>
```

## API

### TabBar Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Active item (`name` or index) | `number \| string` | `0` |
| fixed | Pins to the bottom of the page | `boolean` | `false` |
| placeholder | Renders a placeholder when fixed | `boolean` | `false` |
| border | Shows the top border | `boolean` | `true` |
| safe-area-inset-bottom | Adapts to the bottom safe area | `boolean` | `false` |
| z-index | Custom z-index | `number` | - |

### TabBar Events

| Event | Description | Parameters |
| --- | --- | --- |
| change | Emitted when the active item changes | `(value: number \| string)` |

### TabBarItem Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| name | Unique identifier; defaults to the index | `number \| string` | - |
| title | Title text | `string` | - |
| icon | Built-in icon name | `string` | - |
| badge | Badge content; numbers above 99 render as `99+` | `number \| string` | - |
| dot | Shows a small red dot | `boolean` | `false` |
| disabled | Whether it is disabled | `boolean` | `false` |

### TabBarItem Slots

| Slot | Description |
| --- | --- |
| icon | Custom icon |
| title | Custom title |
