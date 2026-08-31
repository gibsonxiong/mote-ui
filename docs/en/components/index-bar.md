# IndexBar

An alphabetical index for contacts, city lists, and similar scenarios. Clicking a letter on the right jumps to the corresponding anchor.

## Basic Usage

Uses `A-Z` as the default index list, with a full contact list so the body scrolls well past one screen:

<PhonePreview>
  <MtIndexBar>
    <MtIndexAnchor index="A">
      <MtCellGroup>
        <MtCell title="Alice" />
        <MtCell title="Aaron" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="B">
      <MtCellGroup>
        <MtCell title="Bella" />
        <MtCell title="Brian" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="C">
      <MtCellGroup>
        <MtCell title="Chloe" />
        <MtCell title="Carl" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="D">
      <MtCellGroup>
        <MtCell title="Daisy" />
        <MtCell title="Dylan" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="E">
      <MtCellGroup>
        <MtCell title="Emma" />
        <MtCell title="Eric" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="F">
      <MtCellGroup>
        <MtCell title="Fiona" />
        <MtCell title="Frank" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="G">
      <MtCellGroup>
        <MtCell title="Grace" />
        <MtCell title="George" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="H">
      <MtCellGroup>
        <MtCell title="Hannah" />
        <MtCell title="Henry" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="I">
      <MtCellGroup>
        <MtCell title="Ivy" />
        <MtCell title="Ian" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="J">
      <MtCellGroup>
        <MtCell title="Julia" />
        <MtCell title="Jack" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="K">
      <MtCellGroup>
        <MtCell title="Kate" />
        <MtCell title="Kevin" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="L">
      <MtCellGroup>
        <MtCell title="Lily" />
        <MtCell title="Leo" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="M">
      <MtCellGroup>
        <MtCell title="Mia" />
        <MtCell title="Mark" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="N">
      <MtCellGroup>
        <MtCell title="Nora" />
        <MtCell title="Nick" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="O">
      <MtCellGroup>
        <MtCell title="Olivia" />
        <MtCell title="Oscar" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="P">
      <MtCellGroup>
        <MtCell title="Penny" />
        <MtCell title="Paul" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="Q">
      <MtCellGroup>
        <MtCell title="Quinn" />
        <MtCell title="Quincy" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="R">
      <MtCellGroup>
        <MtCell title="Rose" />
        <MtCell title="Ryan" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="S">
      <MtCellGroup>
        <MtCell title="Sophia" />
        <MtCell title="Sam" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="T">
      <MtCellGroup>
        <MtCell title="Tina" />
        <MtCell title="Tom" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="U">
      <MtCellGroup>
        <MtCell title="Uma" />
        <MtCell title="Ulysses" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="V">
      <MtCellGroup>
        <MtCell title="Vera" />
        <MtCell title="Victor" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="W">
      <MtCellGroup>
        <MtCell title="Wendy" />
        <MtCell title="Will" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="X">
      <MtCellGroup>
        <MtCell title="Xena" />
        <MtCell title="Xavier" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="Y">
      <MtCellGroup>
        <MtCell title="Yara" />
        <MtCell title="Yuri" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="Z">
      <MtCellGroup>
        <MtCell title="Zoe" />
        <MtCell title="Zach" />
      </MtCellGroup>
    </MtIndexAnchor>
  </MtIndexBar>
</PhonePreview>

```vue
<MtIndexBar>
  <MtIndexAnchor index="A">
    <MtCellGroup>
      <MtCell title="Alice" />
      <MtCell title="Aaron" />
    </MtCellGroup>
  </MtIndexAnchor>
  <!-- ... one anchor per letter, A-Z -->
  <MtIndexAnchor index="Z">
    <MtCellGroup>
      <MtCell title="Zoe" />
      <MtCell title="Zach" />
    </MtCellGroup>
  </MtIndexAnchor>
</MtIndexBar>
```

## Custom Index List

Use `index-list` to define custom index characters:

<PhonePreview>
  <MtIndexBar :index-list="['Hot', 'New', 'Top', 'Pick']">
    <MtIndexAnchor index="Hot">
      <MtCellGroup>
        <MtCell title="Hot Topic 1" />
        <MtCell title="Hot Topic 2" />
        <MtCell title="Hot Topic 3" />
        <MtCell title="Hot Topic 4" />
        <MtCell title="Hot Topic 5" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="New">
      <MtCellGroup>
        <MtCell title="New Arrival 1" />
        <MtCell title="New Arrival 2" />
        <MtCell title="New Arrival 3" />
        <MtCell title="New Arrival 4" />
        <MtCell title="New Arrival 5" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="Top">
      <MtCellGroup>
        <MtCell title="Editor's Pick 1" />
        <MtCell title="Editor's Pick 2" />
        <MtCell title="Editor's Pick 3" />
        <MtCell title="Editor's Pick 4" />
        <MtCell title="Editor's Pick 5" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="Pick">
      <MtCellGroup>
        <MtCell title="For You 1" />
        <MtCell title="For You 2" />
        <MtCell title="For You 3" />
        <MtCell title="For You 4" />
        <MtCell title="For You 5" />
      </MtCellGroup>
    </MtIndexAnchor>
  </MtIndexBar>
</PhonePreview>

```vue
<MtIndexBar :index-list="['Hot', 'New', 'Top', 'Pick']">
  <MtIndexAnchor index="Hot">
    <MtCellGroup>
      <MtCell title="Hot Topic 1" />
      <MtCell title="Hot Topic 2" />
    </MtCellGroup>
  </MtIndexAnchor>
  <!-- ... -->
</MtIndexBar>
```

## Sticky and Offset

`sticky` controls whether anchor headers stick while scrolling, and `sticky-offset-top` sets the sticky offset:

<PhonePreview>
  <MtIndexBar :sticky="true" :sticky-offset-top="0">
    <MtIndexAnchor index="A">
      <MtCellGroup>
        <MtCell title="Apple" />
        <MtCell title="Apricot" />
        <MtCell title="Avocado" />
        <MtCell title="Asparagus" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="B">
      <MtCellGroup>
        <MtCell title="Banana" />
        <MtCell title="Blueberry" />
        <MtCell title="Blackberry" />
        <MtCell title="Broccoli" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="C">
      <MtCellGroup>
        <MtCell title="Cherry" />
        <MtCell title="Coconut" />
        <MtCell title="Cranberry" />
        <MtCell title="Cucumber" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="D">
      <MtCellGroup>
        <MtCell title="Durian" />
        <MtCell title="Dragonfruit" />
        <MtCell title="Date" />
        <MtCell title="Dill" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="E">
      <MtCellGroup>
        <MtCell title="Elderberry" />
        <MtCell title="Eggplant" />
        <MtCell title="Endive" />
        <MtCell title="Edamame" />
      </MtCellGroup>
    </MtIndexAnchor>
  </MtIndexBar>
</PhonePreview>

```vue
<MtIndexBar :sticky-offset-top="0">
  <MtIndexAnchor index="A">
    <MtCellGroup>
      <MtCell title="Apple" />
      <MtCell title="Apricot" />
    </MtCellGroup>
  </MtIndexAnchor>
  <!-- ... -->
</MtIndexBar>
```

## Highlight Color

`highlight-color` customizes the color of the active index and anchor header:

<PhonePreview>
  <MtIndexBar highlight-color="#07c160">
    <MtIndexAnchor index="A">
      <MtCellGroup>
        <MtCell title="Apple" />
        <MtCell title="Apricot" />
        <MtCell title="Avocado" />
        <MtCell title="Asparagus" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="B">
      <MtCellGroup>
        <MtCell title="Banana" />
        <MtCell title="Blueberry" />
        <MtCell title="Blackberry" />
        <MtCell title="Broccoli" />
      </MtCellGroup>
    </MtIndexAnchor>
    <MtIndexAnchor index="C">
      <MtCellGroup>
        <MtCell title="Cherry" />
        <MtCell title="Coconut" />
        <MtCell title="Cranberry" />
        <MtCell title="Cucumber" />
      </MtCellGroup>
    </MtIndexAnchor>
  </MtIndexBar>
</PhonePreview>

```vue
<MtIndexBar highlight-color="#07c160">
  <MtIndexAnchor index="A">
    <MtCellGroup>
      <MtCell title="Apple" />
      <MtCell title="Apricot" />
    </MtCellGroup>
  </MtIndexAnchor>
  <!-- ... -->
</MtIndexBar>
```

## API

### IndexBar Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| index-list | Index character list | `(string \| number)[]` | `A-Z` |
| z-index | Stacking order of sidebar and sticky headers | `number` | `1` |
| sticky | Whether anchor headers stick while scrolling | `boolean` | `true` |
| sticky-offset-top | Sticky offset from the top (px) | `number` | `0` |
| highlight-color | Highlight color of the active index and anchor | `string` | - |

### IndexBar Events

| Name | Description | Arguments |
| --- | --- | --- |
| select | Emitted when an index is clicked | `(index: string \| number)` |
| change | Emitted when the active index changes | `(index: string \| number)` |

### IndexBar Methods

Available through the component instance:

| Method | Description | Arguments |
| --- | --- | --- |
| scrollTo | Scroll to the anchor of a given index | `(index: string \| number)` |

### IndexAnchor Props

| Name | Description | Type | Default |
| --- | --- | --- |
| index | Index character of the anchor | `string \| number` | - |
