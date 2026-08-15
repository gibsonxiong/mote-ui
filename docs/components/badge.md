# Badge 徽标

出现在图标或文字右上角的徽标，用于展示未读数等数量信息。

## 基础用法

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

## 小红点

`is-dot` 只显示一个红点，适合无需具体数字的场景：

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

## 独立使用与隐藏

不包裹内容时徽标独立展示；`hidden` 可隐藏徽标：

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

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 徽标内容，数字超过 max 显示 `{max}+` | `number \| string` | - |
| max | 数字上限 | `number` | - |
| is-dot | 显示小红点 | `boolean` | `false` |
| hidden | 隐藏徽标 | `boolean` | `false` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 徽标附着的内容 |
