<script setup>
//----------------------------------------------------------
import { ref, watch } from 'vue'
//----------------------------------------------------------
const props = defineProps({
  modelValue: { type: Number },
  label: { type: String, default: 'Range Input' },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  unit: { type: String, default: 'px' },
});
const emit = defineEmits(['update:modelValue', 'change']);
//----------------------------------------------------------
const rangeValue = ref(props.min);
//----------------------------------------------------------
function updateValue() {
  emit('update:modelValue', parseFloat(rangeValue.value));
  emit('change', parseFloat(rangeValue.value));
}
//----------------------------------------------------------
watch(() => props.modelValue, (newValue) => {
  rangeValue.value = newValue;
}, { immediate: true });
//----------------------------------------------------------
</script>
<template>
<div class="range-slider-panel">
  <div class="range-slider-panel-label">
    <label>{{ label }}</label>
    <div>{{ rangeValue }}{{ unit }}</div>
  </div>
  <div class="range-slider-panel-input">
    <input 
      type="range" 
      :min="min"
      :max="max"
      :step="step"
      v-model="rangeValue" 
      @input="updateValue" />
  </div>
</div>
</template>