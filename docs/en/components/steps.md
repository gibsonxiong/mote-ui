# Steps

Shows the progress of an operation flow. `active` is the current step index (0-based).

<script setup>
import { ref } from 'vue'

const active = ref(1)

function next() {
  active.value = (active.value + 1) % 4
}
</script>

## Basic Usage

Steps before `active` render as finished (with a check mark); the current step is highlighted:

<PhonePreview>
  <MtSteps :active="1">
    <MtStep title="Order" description="Submit the order" />
    <MtStep title="Payment" description="Complete payment" />
    <MtStep title="Shipping" description="Seller ships" />
    <MtStep title="Delivery" description="Confirm receipt" />
  </MtSteps>
</PhonePreview>

```vue
<MtSteps :active="1">
  <MtStep title="Order" description="Submit the order" />
  <MtStep title="Payment" description="Complete payment" />
  <MtStep title="Shipping" description="Seller ships" />
  <MtStep title="Delivery" description="Confirm receipt" />
</MtSteps>
```

## Dynamic Switching

<PhonePreview>
  <MtSteps :active="active">
    <MtStep title="Order" />
    <MtStep title="Payment" />
    <MtStep title="Shipping" />
  </MtSteps>
  <div style="margin-top: 12px">
    <MtButton size="small" @click="next">Next</MtButton>
  </div>
</PhonePreview>

```vue
<script setup>
const active = ref(0)

function next() {
  active.value = (active.value + 1) % 4
}
</script>

<template>
  <MtSteps :active="active">
    <MtStep title="Order" />
    <MtStep title="Payment" />
    <MtStep title="Shipping" />
  </MtSteps>
  <MtButton size="small" @click="next">Next</MtButton>
</template>
```

## Vertical Direction

<PhonePreview>
  <MtSteps :active="1" direction="vertical">
    <MtStep title="Order" description="2026-08-01 10:00 order submitted" />
    <MtStep title="Payment" description="2026-08-01 10:05 payment completed" />
    <MtStep title="Shipping" description="Waiting for the seller to ship" />
  </MtSteps>
</PhonePreview>

```vue
<MtSteps :active="1" direction="vertical">
  <MtStep title="Order" description="2026-08-01 10:00 order submitted" />
  <MtStep title="Payment" description="2026-08-01 10:05 payment completed" />
  <MtStep title="Shipping" description="Waiting for the seller to ship" />
</MtSteps>
```

## API

### MtSteps Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| active | Current step index (0-based) | `number` | `0` |
| direction | Layout direction | `'horizontal' \| 'vertical'` | `'horizontal'` |

### MtStep Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| title | Step title | `string` | - |
| description | Step description | `string` | - |

### MtStep Slots

| Name | Description |
| --- | --- |
| title | Custom title |
| description | Custom description |
