<script setup>
//----------------------------------------------------------
import { reactive, ref } from 'vue'
import { RangeSlider, RangeSliderPanel } from '@sf/range-slider'
//----------------------------------------------------------
const sliderStringValue = ref("1.2rem");
const sliderNumberValue = ref(50);
const sliderPanelValue = ref(250);

const s1Props = reactive({ min: 1, max: 100, step: 1 });
const s2Props = reactive({ min: 0.1, max: 10, step: 0.01 });
const s3Props = reactive({ min: 100, max: 600, step: 10, label: 'Cell Size' });


//----------------------------------------------------------
function setSize(val) {
  console.log(val)
}
//----------------------------------------------------------
</script>
<template>
<div class="demo">

  <h4>Demo: RangeSlider</h4>

  <div>
    <RangeSlider 
      v-model="sliderNumberValue"
      :min="s1Props.min" 
      :max="s1Props.max" 
      :step="s1Props.step" 
    />
    <div>
      <label>Slider Value: </label> ({{ typeof(sliderNumberValue) }}) => {{ sliderNumberValue }} 
    </div>    
  </div>

  <div class="inline-flex-form">
    <div><label>min = </label> <input type="number" style="width:60px;" v-model="s1Props.min" /></div>
    <div><label>max = </label> <input type="number" style="width:60px;" v-model="s1Props.max" /></div>
    <div><label>step = </label> <input type="number" style="width:60px;" v-model="s1Props.step" /></div>
  </div>

  <div>
      <RangeSlider 
        v-model="sliderStringValue"
        :min="s2Props.min" 
        :max="s2Props.max" 
        :step="s2Props.step" 
      />
    <div>
      <label>Slider Value: </label> ({{ typeof(sliderStringValue) }}) => {{ sliderStringValue }}
    </div>
  </div>

  <div class="inline-flex-form">
    <div><label>min = </label> <input type="number" style="width:60px;" v-model="s2Props.min" /></div>
    <div><label>max = </label> <input type="number" style="width:60px;" v-model="s2Props.max" /></div>
    <div><label>step = </label> <input type="number" style="width:60px;" v-model="s2Props.step" /></div>
  </div>

  <h4>Demo: RangeSliderPanel</h4>
  <div>
      <RangeSliderPanel 
        class="range-element" 
        :label="s3Props.label" 
        v-model="sliderPanelValue" 
        :min="s3Props.min" 
        :max="s3Props.max" 
        :step="s3Props.step" 
        @change="setSize">

      </RangeSliderPanel>
   
    <div class="inline-flex-form">
      <div><label>label = </label> <input type="text" style="width:90px;" v-model="s3Props.label" /></div>
      <div><label>min = </label> <input type="number" style="width:60px;" v-model="s3Props.min" /></div>
      <div><label>max = </label> <input type="number" style="width:60px;" v-model="s3Props.max" /></div>
      <div><label>step = </label> <input type="number" style="width:60px;" v-model="s3Props.step" /></div>
    </div>
  </div>

</div>
</template>