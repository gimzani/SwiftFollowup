<script setup>
//---------------------------------------------------------------
import { ref, watch, useAttrs } from 'vue';
import { SketchPicker } from 'vue-color'
//---------------------------------------------------------------
const props = defineProps({
  modelValue: { type: String },
  isValid: { type: Boolean, default: true },
});
defineOptions({ inheritAttrs: false });
const emit = defineEmits(['update:modelValue','input']);
//---------------------------------------------------------------
const HIDE_MODAL_TIMEOUT = 500;
//---------------------------------------------------------------
const inputField = ref(null);
const inputFieldValue = ref(null);
const colorModel = ref(null);
const expanded = ref(false);
const expandedTimeout = ref(null);
//---------------------------------------------------------------
function setFocus() {
  inputField.value.focus();
}
//---------------------------------------------------------------
function setColorValue(evt) {
  let targetVal = evt.target.value;
  colorModel.value = targetVal;
  setModelValue();
}
//---------------------------------------------------------------
function setModelValue() {
  emit('input', colorModel.value)
  emit('update:modelValue', colorModel.value);
}
//---------------------------------------------------------------
function handleMouseEnter() {
  if (expanded.value) {
    clearTimeout(expandedTimeout.value);
  }
}
//---------------------------------------------------------------
function handleMouseLeave() {
  if (expanded.value) {
    expandedTimeout.value = setTimeout(() => {
      expanded.value = false;
    }, HIDE_MODAL_TIMEOUT);
  }
}
//---------------------------------------------------------------
//---------------------------------------------------------------
watch(() => props.modelValue, (newVal) => {
  if(newVal) {
    colorModel.value = newVal;
    inputFieldValue.value = newVal;
  } else {
    colorModel.value = '#ffffff';
    inputFieldValue.value = '#ffffff';
  }
}, { immediate: true });
//---------------------------------------------------------------
</script>

<template>
<div class="color-input">
  <div class="color-input-field" 
    :class="$attrs.class, { 'invalid': !isValid }" 
    @click="setFocus"
  >
    <div class="field-color-chip" :style="{'background-color': colorModel}" @click="expanded=!expanded"></div>
    <input ref="inputField" 
      type="text" 
      :name="$attrs.name"  
      :placeholder="$attrs.placeholder" 
      :value="colorModel" 
      @input="setColorValue"
      @click="expanded=false"
      @keyup.enter="expanded=false"
    />

  </div>
  <div class="field-color-select" v-if="expanded" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <SketchPicker v-model="colorModel"
      @update:modelValue="setModelValue" />  
  </div>
</div>
</template>

<style>
@import './color-picker-input.css';
</style>