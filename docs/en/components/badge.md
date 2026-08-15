# Badge

A badge placed at the top-right corner of an icon or text, for showing counts such as unread messages.

## Basic Usage

<PhonePreview>
  <div style="display: flex; align-items: center; gap: 24px">
    <MtBadge :value="8">
      <div style="width: 40px; height: 40px; background: var(--mt-fill-color-light); border-radius: 8px"></div>
    </MtBadge>
    <MtBadge :value="120" :max="99">
      <div style="width: 40px; height: 40px; background: var(--mt-fill-color-light); border-radius: 8px"></div>
    </MtBadge>
    <MtBadge value="new">
      <div style="width: 40px; height: 40px; background: var(--mt-fill-color-light); border-radius: 8px"></div>
    </MtBadge>
  </div>
</PhonePreview>

```vue
<MtBadge :value="8">
  <div class="icon" />
</MtBadge>
<MtBadge :value="120" :max="99">
  <div class="icon" />
</MtBadge>
```

## Dot

`is-dot` shows only a small red dot — suited for cases without an exact count:

<PhonePreview>
  <MtBadge is-dot>
    <div style="width: 40px; height: 40px; background: var(--mt-fill-color-light); border-radius: 8px"></div>
  </MtBadge>
</PhonePreview>

```vue
<MtBadge is-dot>
  <div class="icon" />
</MtBadge>
```

## Standalone and Hidden

Without wrapped content the badge renders standalone; `hidden` hides it:

<PhonePreview>
  <div style="display: flex; align-items: center; gap: 16px">
    <MtBadge :value="6" />
    <MtBadge :value="6" hidden />
  </div>
</PhonePreview>

```vue
<MtBadge :value="6" />
<MtBadge :value="6" hidden />
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| value | Badge content; numbers above `max` render as `{max}+` | `number \| string` | - |
| max | Upper bound for numeric values | `number` | - |
| is-dot | Shows a small red dot | `boolean` | `false` |
| hidden | Hides the badge | `boolean` | `false` |

### Slots

| Slot | Description |
| --- | --- |
| default | Content the badge attaches to |
