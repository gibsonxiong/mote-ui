# Sticky 粘性布局

用于将元素在滚动时固定在屏幕顶部或底部。

## 基础用法

默认吸附在顶部，`offset` 设置吸附后的偏移距离。下方以商品详情页为例，标题栏会一直吸在顶部：

<PhonePreview>
  <div style="height: 360px; overflow: auto">
    <MtSticky :offset="0">
      <div style="display: flex; align-items: center; justify-content: space-between; height: 44px; padding: 0 12px; background: var(--mt-color-primary); color: #fff">
        <span>商品详情</span>
        <span>收藏</span>
      </div>
    </MtSticky>
    <div style="padding: 16px 12px; line-height: 1.6; font-size: 16px; font-weight: 600">Mote UI 移动端组件库</div>
    <div style="padding: 0 12px 12px; line-height: 1.8; color: var(--mt-text-color-secondary); font-size: 14px">
      一套借鉴 Element Plus 设计 token 的轻量级 Vue 3 移动端组件库，提供 60+ 组件，覆盖表单、反馈、导航、展示等场景。向下滚动，顶部标题栏会吸附在容器顶部。
    </div>
    <div style="padding: 12px; margin: 0 12px 12px; background: var(--mt-bg-color); border-radius: 8px; line-height: 1.8; color: var(--mt-text-color-regular); font-size: 14px">
      核心特性<br />· 基于 Vue 3 + TypeScript<br />· 按需引入，支持 tree-shaking<br />· 暗色模式自适应<br />· 完善的单元测试
    </div>
    <div style="padding: 0 12px 12px; line-height: 1.8; color: var(--mt-text-color-secondary); font-size: 14px">
      继续滚动查看更多内容，标题栏始终保持可见。这是粘性布局最典型的应用场景。
    </div>
  </div>
</PhonePreview>

```vue
<div style="height: 360px; overflow: auto">
  <MtSticky :offset="0">
    <div style="background: var(--mt-color-primary); color: #fff">商品详情</div>
  </MtSticky>
  <!-- 详情内容 -->
</div>
```

## 自定义偏移

`offset` 控制吸附后距离容器顶部的距离，常用于顶部有其他固定元素时留出空隙：

<PhonePreview>
  <div style="height: 360px; overflow: auto">
    <div style="height: 48px; display: flex; align-items: center; padding: 0 12px; background: var(--mt-bg-color); font-size: 15px; font-weight: 600; border-bottom: 1px solid var(--mt-border-color)">顶部固定栏</div>
    <MtSticky :offset="48">
      <div style="height: 40px; display: flex; align-items: center; padding: 0 12px; background: var(--mt-color-warning); color: #fff">吸顶标签（距顶 48px）</div>
    </MtSticky>
    <div v-for="i in 10" :key="i" style="line-height: 40px; padding: 0 12px; border-bottom: 1px solid var(--mt-border-color); color: var(--mt-text-color-regular)">
      列表项 {{ i }}
    </div>
  </div>
</PhonePreview>

```vue
<MtSticky :offset="48">
  <div>吸顶内容</div>
</MtSticky>
```

## 底部吸附

`position="bottom"` 吸附在容器底部，常用于购物车结算栏：

<PhonePreview>
  <div style="height: 360px; overflow: auto">
    <div v-for="item in 8" :key="item" style="display: flex; align-items: center; justify-content: space-between; height: 52px; padding: 0 12px; border-bottom: 1px solid var(--mt-border-color)">
      <span style="color: var(--mt-text-color-regular)">商品 {{ item }}</span>
      <span style="color: var(--mt-color-danger)">¥{{ item * 10 }}.00</span>
    </div>
    <MtSticky position="bottom" :offset="0">
      <div style="display: flex; align-items: center; justify-content: space-between; height: 52px; padding: 0 12px; background: var(--mt-bg-color); border-top: 1px solid var(--mt-border-color)">
        <span style="color: var(--mt-color-danger); font-size: 16px; font-weight: 600">合计 ¥360.00</span>
        <span style="display: inline-block; height: 36px; line-height: 36px; padding: 0 20px; background: var(--mt-color-danger); color: #fff; border-radius: 18px">立即结算</span>
      </div>
    </MtSticky>
  </div>
</PhonePreview>

```vue
<MtSticky position="bottom" :offset="0">
  <div>结算栏</div>
</MtSticky>
```

## 多个吸顶元素

同一页面可以放置多个 `Sticky`，各自独立吸附。常用于长列表的分组标题：滚动时当前分组标题会把上一个「顶」上去。注意每个分组需要用容器包裹，标题吸附的约束范围才是该分组：

<PhonePreview>
  <div style="height: 360px; overflow: auto">
    <div>
      <MtSticky :offset="0">
        <div style="height: 40px; display: flex; align-items: center; padding: 0 12px; background: var(--mt-color-primary); color: #fff; font-size: 15px">分组 A</div>
      </MtSticky>
      <div v-for="i in 4" :key="'a' + i" style="line-height: 44px; padding: 0 12px; border-bottom: 1px solid var(--mt-border-color); color: var(--mt-text-color-regular)">
        分组 A · 成员 {{ i }}
      </div>
    </div>
    <div>
      <MtSticky :offset="0">
        <div style="height: 40px; display: flex; align-items: center; padding: 0 12px; background: var(--mt-color-primary); color: #fff; font-size: 15px">分组 B</div>
      </MtSticky>
      <div v-for="i in 4" :key="'b' + i" style="line-height: 44px; padding: 0 12px; border-bottom: 1px solid var(--mt-border-color); color: var(--mt-text-color-regular)">
        分组 B · 成员 {{ i }}
      </div>
    </div>
    <div>
      <MtSticky :offset="0">
        <div style="height: 40px; display: flex; align-items: center; padding: 0 12px; background: var(--mt-color-primary); color: #fff; font-size: 15px">分组 C</div>
      </MtSticky>
      <div v-for="i in 4" :key="'c' + i" style="line-height: 44px; padding: 0 12px; border-bottom: 1px solid var(--mt-border-color); color: var(--mt-text-color-regular)">
        分组 C · 成员 {{ i }}
      </div>
    </div>
  </div>
</PhonePreview>

```vue
<div style="height: 360px; overflow: auto">
  <div>
    <MtSticky :offset="0">
      <div>分组 A</div>
    </MtSticky>
    <!-- 分组 A 成员 -->
  </div>
  <div>
    <MtSticky :offset="0">
      <div>分组 B</div>
    </MtSticky>
    <!-- 分组 B 成员 -->
  </div>
</div>
```

## 事件监听

`change` 在吸附状态变化时触发，`scroll` 在滚动时触发并携带滚动位置：

<PhonePreview>
  <div style="height: 360px; overflow: auto">
    <MtSticky @change="(fixed) => fixed && console.log('fixed')" @scroll="(top) => console.log(top)">
      <div style="height: 44px; display: flex; align-items: center; padding: 0 12px; background: var(--mt-color-primary); color: #fff">吸顶标题</div>
    </MtSticky>
    <div v-for="i in 10" :key="i" style="line-height: 40px; padding: 0 12px; border-bottom: 1px solid var(--mt-border-color)">
      内容行 {{ i }}
    </div>
  </div>
</PhonePreview>

```vue
<MtSticky @change="onChange" @scroll="onScroll">
  <div>吸顶内容</div>
</MtSticky>
```

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| offset | 吸附距离，`position` 为 `top` 时距离顶部、`bottom` 时距离底部 | `number` | `0` |
| position | 吸附位置 | `'top' \| 'bottom'` | `'top'` |
| target | 滚动容器选择器，不传时监听 `window` | `string` | `''` |
| z-index | 层级 | `number` | `100` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 吸附状态变化时触发 | `(fixed: boolean)` |
| scroll | 滚动时触发 | `(scrollTop: number, fixed: boolean)` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 需要吸附的内容 |
