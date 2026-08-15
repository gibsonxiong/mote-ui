# Grid

Equal-width grid layout, commonly used for feature entries and icon navigation.

## Basic Usage

<PhonePreview>
  <MtGrid :column-num="4">
    <MtGridItem v-for="i in 8" :key="i" icon="success" :text="'Item ' + i" />
  </MtGrid>
</PhonePreview>

```vue
<MtGrid :column-num="4">
  <MtGridItem v-for="i in 8" :key="i" icon="success" :text="'Item ' + i" />
</MtGrid>
```

## Custom Columns and Borderless

<PhonePreview>
  <MtGrid :column-num="3" :border="false">
    <MtGridItem v-for="i in 3" :key="i" icon="arrow-up" :text="'Item ' + i" />
  </MtGrid>
</PhonePreview>

```vue
<MtGrid :column-num="3" :border="false">
  <MtGridItem v-for="i in 3" :key="i" icon="arrow-up" :text="'Item ' + i" />
</MtGrid>
```

## Square Items

<PhonePreview>
  <MtGrid :column-num="3" square>
    <MtGridItem v-for="i in 6" :key="i" icon="success" :text="'Item ' + i" />
  </MtGrid>
</PhonePreview>

```vue
<MtGrid :column-num="3" square>
  <MtGridItem v-for="i in 6" :key="i" icon="success" :text="'Item ' + i" />
</MtGrid>
```

## Custom Content

<PhonePreview>
  <MtGrid :column-num="2" :border="false">
    <MtGridItem>
      <div style="color: var(--mt-color-primary); font-size: 14px">Fully custom</div>
    </MtGridItem>
    <MtGridItem>
      <MtButton type="primary" size="small">Button</MtButton>
    </MtGridItem>
  </MtGrid>
</PhonePreview>

```vue
<MtGrid :column-num="2" :border="false">
  <MtGridItem>
    <div>Fully custom</div>
  </MtGridItem>
</MtGrid>
```

## API

### Grid Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| column-num | Number of columns | `number` | `4` |
| square | Whether items are square | `boolean` | `false` |
| border | Shows grid borders | `boolean` | `true` |
| center | Centers content | `boolean` | `true` |

### GridItem Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| icon | Icon name | `string` | - |
| text | Text | `string` | - |

### GridItem Events

| Event | Description | Type |
| --- | --- | --- |
| click | Emitted when the item is clicked | `(event: MouseEvent) => void` |

### GridItem Slots

| Slot | Description |
| --- | --- |
| default | Fully custom content |
| text | Custom text |
