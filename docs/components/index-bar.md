# IndexBar 索引栏

用于通讯录、城市列表等场景的字母索引，点击右侧字母可快速跳转到对应分组。

## 基础用法

默认使用 `A-Z` 作为索引列表，并内置完整通讯录使内容超过一屏，方便体验滚动与跳转：

<PhonePreview>
  <MtIndexBar>
    <MtIndexAnchor index="A">
      <MtCellGroup>
        <MtCell title="阿峰" />
        <MtCell title="阿龙" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="B">
      <MtCellGroup>
        <MtCell title="白云" />
        <MtCell title="白鹿" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="C">
      <MtCellGroup>
        <MtCell title="陈晨" />
        <MtCell title="陈曦" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="D">
      <MtCellGroup>
        <MtCell title="邓超" />
        <MtCell title="丁当" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="E">
      <MtCellGroup>
        <MtCell title="二宝" />
        <MtCell title="尔康" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="F">
      <MtCellGroup>
        <MtCell title="范晓" />
        <MtCell title="方圆" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="G">
      <MtCellGroup>
        <MtCell title="高远" />
        <MtCell title="郭靖" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="H">
      <MtCellGroup>
        <MtCell title="何欢" />
        <MtCell title="黄蓉" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="I">
      <MtCellGroup>
        <MtCell title="艾琳" />
        <MtCell title="依琳" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="J">
      <MtCellGroup>
        <MtCell title="江川" />
        <MtCell title="金铭" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="K">
      <MtCellGroup>
        <MtCell title="孔明" />
        <MtCell title="康凯" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="L">
      <MtCellGroup>
        <MtCell title="林晓" />
        <MtCell title="刘洋" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="M">
      <MtCellGroup>
        <MtCell title="马可" />
        <MtCell title="莫然" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="N">
      <MtCellGroup>
        <MtCell title="宁宁" />
        <MtCell title="牛牛" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="O">
      <MtCellGroup>
        <MtCell title="欧阳" />
        <MtCell title="欧文" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="P">
      <MtCellGroup>
        <MtCell title="彭湃" />
        <MtCell title="平凡" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="Q">
      <MtCellGroup>
        <MtCell title="秦风" />
        <MtCell title="秦朗" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="R">
      <MtCellGroup>
        <MtCell title="任达" />
        <MtCell title="若曦" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="S">
      <MtCellGroup>
        <MtCell title="宋佳" />
        <MtCell title="苏苏" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="T">
      <MtCellGroup>
        <MtCell title="唐糖" />
        <MtCell title="田甜" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="U">
      <MtCellGroup>
        <MtCell title="尤娜" />
        <MtCell title="宇文" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="V">
      <MtCellGroup>
        <MtCell title="维嘉" />
        <MtCell title="魏巍" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="W">
      <MtCellGroup>
        <MtCell title="王伟" />
        <MtCell title="吴桐" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="X">
      <MtCellGroup>
        <MtCell title="徐霞" />
        <MtCell title="许诺" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="Y">
      <MtCellGroup>
        <MtCell title="杨阳" />
        <MtCell title="叶青" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="Z">
      <MtCellGroup>
        <MtCell title="周舟" />
        <MtCell title="张哲" />
      </MtCellGroup>
    </MtIndexAnchor>
  </MtIndexBar>
</PhonePreview>

```vue
<MtIndexBar>
  <MtIndexAnchor index="A">
    <MtCellGroup>
      <MtCell title="阿峰" />
      <MtCell title="阿龙" />
    </MtCellGroup>
  </MtIndexAnchor>
  <!-- 每个字母一个锚点，A-Z 依次排列 -->
  <MtIndexAnchor index="Z">
    <MtCellGroup>
      <MtCell title="周舟" />
      <MtCell title="张哲" />
    </MtCellGroup>
  </MtIndexAnchor>
</MtIndexBar>
```

## 自定义索引列表

通过 `index-list` 自定义索引字符：

<PhonePreview>
  <MtIndexBar :index-list="['热', '新', '推', '选']">
    <MtIndexAnchor index="热">
      <MtCellGroup>
        <MtCell title="热门话题 1" />
        <MtCell title="热门话题 2" />
        <MtCell title="热门话题 3" />
        <MtCell title="热门话题 4" />
        <MtCell title="热门话题 5" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="新">
      <MtCellGroup>
        <MtCell title="最近上新 1" />
        <MtCell title="最近上新 2" />
        <MtCell title="最近上新 3" />
        <MtCell title="最近上新 4" />
        <MtCell title="最近上新 5" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="推">
      <MtCellGroup>
        <MtCell title="编辑精选 1" />
        <MtCell title="编辑精选 2" />
        <MtCell title="编辑精选 3" />
        <MtCell title="编辑精选 4" />
        <MtCell title="编辑精选 5" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="选">
      <MtCellGroup>
        <MtCell title="你可能喜欢 1" />
        <MtCell title="你可能喜欢 2" />
        <MtCell title="你可能喜欢 3" />
        <MtCell title="你可能喜欢 4" />
        <MtCell title="你可能喜欢 5" />
      </MtCellGroup>
    </MtIndexAnchor>
  </MtIndexBar>
</PhonePreview>

```vue
<MtIndexBar :index-list="['热', '新', '推', '选']">
  <MtIndexAnchor index="热">
    <MtCellGroup>
      <MtCell title="热门话题 1" />
      <MtCell title="热门话题 2" />
    </MtCellGroup>
  </MtIndexAnchor>
  <!-- ... -->
</MtIndexBar>
```

## 吸顶与偏移

`sticky` 控制锚点标题是否吸顶，`sticky-offset-top` 设置吸顶偏移距离：

<PhonePreview>
  <MtIndexBar :sticky="true" :sticky-offset-top="0">
    <MtIndexAnchor index="A">
      <MtCellGroup>
        <MtCell title="苹果" />
        <MtCell title="杏子" />
        <MtCell title="牛油果" />
        <MtCell title="芦笋" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="B">
      <MtCellGroup>
        <MtCell title="香蕉" />
        <MtCell title="蓝莓" />
        <MtCell title="黑莓" />
        <MtCell title="西兰花" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="C">
      <MtCellGroup>
        <MtCell title="车厘子" />
        <MtCell title="椰子" />
        <MtCell title="蔓越莓" />
        <MtCell title="黄瓜" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="D">
      <MtCellGroup>
        <MtCell title="冬瓜" />
        <MtCell title="火龙果" />
        <MtCell title="枣子" />
        <MtCell title="茴香" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="E">
      <MtCellGroup>
        <MtCell title="接骨木莓" />
        <MtCell title="茄子" />
        <MtCell title="菊苣" />
        <MtCell title="毛豆" />
      </MtCellGroup>
    </MtIndexAnchor>
  </MtIndexBar>
</PhonePreview>

```vue
<MtIndexBar :sticky-offset-top="0">
  <MtIndexAnchor index="A">
    <MtCellGroup>
      <MtCell title="苹果" />
      <MtCell title="杏子" />
    </MtCellGroup>
  </MtIndexAnchor>
  <!-- ... -->
</MtIndexBar>
```

## 高亮颜色

`highlight-color` 自定义激活索引与锚点标题的颜色：

<PhonePreview>
  <MtIndexBar highlight-color="#07c160">
    <MtIndexAnchor index="A">
      <MtCellGroup>
        <MtCell title="苹果" />
        <MtCell title="杏子" />
        <MtCell title="牛油果" />
        <MtCell title="芦笋" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="B">
      <MtCellGroup>
        <MtCell title="香蕉" />
        <MtCell title="蓝莓" />
        <MtCell title="黑莓" />
        <MtCell title="西兰花" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="C">
      <MtCellGroup>
        <MtCell title="车厘子" />
        <MtCell title="椰子" />
        <MtCell title="蔓越莓" />
        <MtCell title="黄瓜" />
      </MtCellGroup>
    </MtIndexAnchor>
  </MtIndexBar>
</PhonePreview>

```vue
<MtIndexBar highlight-color="#07c160">
  <MtIndexAnchor index="A">
    <MtCellGroup>
      <MtCell title="苹果" />
      <MtCell title="杏子" />
    </MtCellGroup>
  </MtIndexAnchor>
  <!-- ... -->
</MtIndexBar>
```

## API

### IndexBar Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| index-list | 索引字符列表 | `(string \| number)[]` | `A-Z` |
| z-index | 侧边栏与吸顶标题的层级 | `number` | `1` |
| sticky | 锚点标题是否吸顶 | `boolean` | `true` |
| sticky-offset-top | 吸顶偏移距离（px） | `number` | `0` |
| highlight-color | 激活索引与锚点的高亮颜色 | `string` | - |

### IndexBar Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| select | 点击索引时触发 | `(index: string \| number)` |
| change | 当前激活索引变化时触发 | `(index: string \| number)` |

### IndexBar 方法

通过组件实例调用：

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| scrollTo | 滚动到指定索引的锚点 | `(index: string \| number)` |

### IndexAnchor Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- |
| index | 锚点对应的索引字符 | `string \| number` | - |
