# Grid 宫格

等宽宫格布局，常用于功能入口、图标导航。

## 基础用法

<PhonePreview>
  <MtGrid :column-num="4">
    <MtGridItem v-for="i in 8" :key="i" icon="success" :text="'宫格 ' + i" />
  </MtGrid>
</PhonePreview>

```vue
<MtGrid :column-num="4">
  <MtGridItem v-for="i in 8" :key="i" icon="success" :text="'宫格 ' + i" />
</MtGrid>
```

## 自定义列数与无边框

<PhonePreview>
  <MtGrid :column-num="3" :border="false">
    <MtGridItem v-for="i in 3" :key="i" icon="arrow-up" :text="'宫格 ' + i" />
  </MtGrid>
</PhonePreview>

```vue
<MtGrid :column-num="3" :border="false">
  <MtGridItem v-for="i in 3" :key="i" icon="arrow-up" :text="'宫格 ' + i" />
</MtGrid>
```

## 正方形格子

<PhonePreview>
  <MtGrid :column-num="3" square>
    <MtGridItem v-for="i in 6" :key="i" icon="success" :text="'宫格 ' + i" />
  </MtGrid>
</PhonePreview>

```vue
<MtGrid :column-num="3" square>
  <MtGridItem v-for="i in 6" :key="i" icon="success" :text="'宫格 ' + i" />
</MtGrid>
```

## 自定义内容

<PhonePreview>
  <MtGrid :column-num="2" :border="false">
    <MtGridItem>
      <div style="color: var(--mt-color-primary); font-size: 14px">完全自定义</div>
    </MtGridItem>
    <MtGridItem>
      <MtButton type="primary" size="small">按钮</MtButton>
    </MtGridItem>
  </MtGrid>
</PhonePreview>

```vue
<MtGrid :column-num="2" :border="false">
  <MtGridItem>
    <div>完全自定义</div>
  </MtGridItem>
</MtGrid>
```

## API

### Grid Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| column-num | 列数 | `number` | `4` |
| square | 格子是否为正方形 | `boolean` | `false` |
| border | 显示宫格边框 | `boolean` | `true` |
| center | 内容居中 | `boolean` | `true` |

### GridItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 图标名 | `string` | - |
| text | 文字 | `string` | - |

### GridItem Events

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| click | 点击宫格时触发 | `(event: MouseEvent) => void` |

### GridItem Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义完整内容 |
| text | 自定义文字 |
