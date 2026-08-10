# Range Slider

The Range Slider package comes with two variations:

1. RangeSlider
2. RangeSliderPanel

### RangeSlider

The **RangeSlider** is a simple slider with a value at the end. The value can be a ```string``` or a ```number```. If it is a string, it is returned as a string and if a number, it is returned as a number.

**Props:**

Prop | type | description |
|----|----|----|
| v-model | number / string | numeric or string value |
| min | number / float | minimum value |
| max | number / float | maximum value |
| step | number / float | step value |


**Usage:**

```js
import { RangeSlider } from '@sf/range-slider'
```

```html
<RangeSlider 
  v-model="sliderNumberValue"
  :min="1" 
  :max="100" 
  :step="1" 
/>
```

### RangeSliderPanel

The **RangeSliderPanel** is a labelled component and is a bit more suited to control-panels and block forms

**Props:**

Prop | type | description |
|----|----|----|
| v-model | number | numeric value |
| min | number / float | minimum value |
| max | number / float | maximum value |
| step | number / float | step value |
| @change | :number | change event |

**Usage:**

```js
import { RangeSliderPanel } from '@sf/range-slider'
```

```html
<RangeSliderPanel 
  class="range-element" 
  label="My Slider Label" 
  v-model="sliderPanelValue" 
  :min="100" 
  :max="600" 
  :step="10" 
  @change="setSize"
/>
```