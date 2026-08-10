<script setup>
//----------------------------------------------------------
import { ref, reactive, watch, toRaw } from 'vue'
import { QrCodeOptions, DOT_STYLE, CORNER_STYLE, CORNER_DOT_STYLE } from './QrCodeModels.js'
//----------------------------------------------------------
import { ColorPickerInput } from '@sf/color-picker-input'
import { RangeSliderPanel } from '@sf/range-slider'
//----------------------------------------------------------
const props = defineProps({
  modelValue: { type: Object },
  showDownload: { type: Boolean, default: true },
  minSize: { type: Number, default: 200 },
  maxSize: { type: Number, default: 650 },
  url: { type: String }
});
const emit = defineEmits(['update:modelValue', 'save-data', 'download-data']);
//----------------------------------------------------------
const downloadOptions = ['png', 'jpeg', 'webp', 'svg', 'json']
//----------------------------------------------------------
const size = ref(300);
const options = reactive({...new QrCodeOptions()});
const saveType = ref('svg');
const filename = ref('qr-code');
//----------------------------------------------------------
function setWidthHeight() {
  options.width = size.value;
  options.height = size.value;
  updateOptions();
}
//----------------------------------------------------------
function updateOptions() {
  emit('update:modelValue', toRaw(options));
}
//----------------------------------------------------------
function resetData() {
  Object.assign(options, {...new QrCodeOptions()});
  options.data = props.url || options.data;
  emit('update:modelValue', toRaw(options));
}
//----------------------------------------------------------
function downloadData() {
  const dld = { 
    options: toRaw(options), 
    filename: filename.value, 
    type: saveType.value 
  }
  emit('download-data', dld);
}
//----------------------------------------------------------
function saveData() {
  emit('save-data', { options: toRaw(options) });
}
//----------------------------------------------------------
watch(()=> props.modelValue, (val) => {
  if(val) {
    Object.assign(options, val);
    options.data = props.url || options.data;
    size.value = options.width;
  }
}, { immediate: true });
//----------------------------------------------------------
watch(()=> props.url, (val) => {
  if(val) {
    options.data = val;
  }
}, { immediate: true });
//----------------------------------------------------------
</script>
<template>
<div class="qr-code-edit-form">

  <div class="qcef-routing">     
    <div>
      <label>
        <span>Url</span>
        <input type="text" class="qcef-textinput" placeholder="Destination url" v-model="options.data" @change="updateOptions" />
      </label>
    </div>
    <div>
      <label>
        <span>Image</span>
        <input type="text" class="qcef-textinput" placeholder="Image url" v-model="options.image" @change="updateOptions" />
      </label>
    </div>
  </div>

  <div class="qcef-options">

    <div>
      <RangeSliderPanel label="QR Code Size" class="range-element" v-model="size" :min="minSize" :max="maxSize" :step="10" @change="setWidthHeight"></RangeSliderPanel>
      <RangeSliderPanel label="QR Code Margin" class="range-element" v-model="options.margin" :min="5" :max="50" :step="5" @change="updateOptions"></RangeSliderPanel>  
    </div>

    <label for="dots">
      <div>Background</div>
      <ColorPickerInput id="dots" v-model="options.backgroundOptions.color"></ColorPickerInput>
    </label>

    <div class="split-cols">

      <label for="dots">
        <div>Dots</div>
        <ColorPickerInput id="dots" v-model="options.dotsOptions.color"></ColorPickerInput>
      </label>

      <label for="dot-style">
        <div>Dot Style</div>
        <select id="dot-style" v-model="options.dotsOptions.type" @change="updateOptions">
          <option v-for="[key, val] in Object.entries(DOT_STYLE)" :key="val" :value="val">{{ val }}</option>
        </select>
      </label>
    
    </div>

    <div class="split-cols">

      <label for="corners">
        <div>Corners</div>
        <ColorPickerInput id="corners" v-model="options.cornersSquareOptions.color"></ColorPickerInput>
      </label>

      <label for="corner-style">
        <div>Corner Style</div>
        <select id="corner-style" v-model="options.cornersSquareOptions.type" @change="updateOptions">
          <option :value="null">none</option>
          <option v-for="[key, val] in Object.entries(CORNER_STYLE)" :key="val" :value="val">{{ val }}</option>
        </select>
      </label>

    </div>

    <div class="split-cols">
      
      <label for="corner-dots-color">
        <div>Corner Dots</div>
        <ColorPickerInput id="corner-dots-color" v-model="options.cornersDotOptions.color"></ColorPickerInput>
      </label>

      <label for="corner-dots-style">
        <div>Corner Dots Style</div>           
        <select id="corner-dots-style" v-model="options.cornersDotOptions.type" @change="updateOptions">
          <option :value="null">none</option>
          <option v-for="[key, val] in Object.entries(CORNER_DOT_STYLE)" :key="val" :value="val">{{ val }}</option>
        </select>
      </label>

    </div>

  </div>

  <div class="qcef-output">

    <div class="qcef-download" v-if="showDownload">
      <button class="qcef-save-btn" @click="downloadData">Download</button>
      <input style="border-radius: 0;" type="text" placeholder="filename" v-model="filename" />
      <select class="inline" v-model="saveType">
        <option :value="o" v-for="o in downloadOptions">.{{ o }}</option>
      </select>        
    </div>

    <div class="qcef-buttons">
      <button class="qcef-save-btn" @click="saveData">Save</button>
      <button class="qcef-reset-btn" @click="resetData">Reset</button>
    </div>

  </div>
</div>
</template>