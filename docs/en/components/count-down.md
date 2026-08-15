# CountDown

Renders a real-time countdown with millisecond precision and custom formatting.

<script setup>
import { ref } from 'vue'

const countDownRef = ref()

function start() {
  countDownRef.value?.start()
}

function pause() {
  countDownRef.value?.pause()
}

function reset() {
  countDownRef.value?.reset()
}
</script>

## Basic Usage

`time` sets the total duration in milliseconds; the default format is `HH:mm:ss`:

<PhonePreview>
  <MtCountDown :time="30 * 60 * 1000" />
</PhonePreview>

```vue
<MtCountDown :time="30 * 60 * 1000" />
```

## Custom Format

`format` supports the `DD` / `HH` / `mm` / `ss` / `SSS` tokens. When higher tokens are omitted, time rolls down into lower ones (e.g. `mm:ss` renders 1 hour 30 minutes as `90:00`):

<PhonePreview>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <MtCountDown :time="90 * 60 * 1000" format="mm:ss" />
    <MtCountDown :time="2 * 24 * 3600 * 1000 + 3600 * 1000" format="DD d HH h mm m" />
  </div>
</PhonePreview>

```vue
<MtCountDown :time="90 * 60 * 1000" format="mm:ss" />
<MtCountDown :time="2 * 24 * 3600 * 1000 + 3600 * 1000" format="DD d HH h mm m" />
```

## Manual Control

Call `start` / `pause` / `reset` on the component instance; setting `auto-start` to `false` prevents the countdown from starting on mount:

<PhonePreview>
  <div style="display: flex; align-items: center; gap: 12px">
    <MtCountDown ref="countDownRef" :time="60 * 1000" :auto-start="false" />
    <MtButton size="small" @click="start">Start</MtButton>
    <MtButton size="small" @click="pause">Pause</MtButton>
    <MtButton size="small" @click="reset">Reset</MtButton>
  </div>
</PhonePreview>

```vue
<script setup>
const countDownRef = ref()
</script>

<template>
  <MtCountDown ref="countDownRef" :time="60 * 1000" :auto-start="false" />
  <MtButton size="small" @click="countDownRef?.start()">Start</MtButton>
  <MtButton size="small" @click="countDownRef?.pause()">Pause</MtButton>
  <MtButton size="small" @click="countDownRef?.reset()">Reset</MtButton>
</template>
```

## Custom Rendering

The default slot is scoped; the `time` parameter exposes the remaining time fields:

<PhonePreview>
  <MtCountDown :time="3600 * 1000">
    <template #default="{ time }">
      <span style="color: var(--mt-color-danger)">
        {{ time.minutes }} min {{ time.seconds }} s left
      </span>
    </template>
  </MtCountDown>
</PhonePreview>

```vue
<MtCountDown :time="3600 * 1000">
  <template #default="{ time }">
    {{ time.minutes }} min {{ time.seconds }} s left
  </template>
</MtCountDown>
```

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| time | Total duration (milliseconds) | `number` | `0` |
| format | Format template, supports `DD` / `HH` / `mm` / `ss` / `SSS` | `string` | `'HH:mm:ss'` |
| auto-start | Start automatically | `boolean` | `true` |

### Events

| Name | Description | Arguments |
| --- | --- | --- |
| change | Emitted while the countdown ticks | `(current: MtCountDownCurrentTime)` |
| finish | Emitted when the countdown ends | - |

### Slots

| Name | Description |
| --- | --- |
| default | Custom rendering; scoped slot with `{ time: MtCountDownCurrentTime }` |

### Methods

Called on the component instance:

| Method | Description |
| --- | --- |
| start | Start the countdown |
| pause | Pause the countdown |
| reset | Reset to the initial duration (restarts immediately when `auto-start` is `true`) |

### MtCountDownCurrentTime

| Field | Description |
| --- | --- |
| days / hours / minutes / seconds / milliseconds | Remaining amount per unit |
| total | Total remaining milliseconds |
