<script setup>
//----------------------------------------------------------
import { ref, watch } from 'vue'
//----------------------------------------------------------
const props = defineProps({
	modelValue: { type: [String, Number], default: '' },
	min: { type: Number, default: 0 },
	max: { type: Number, default: 10 },
	step: { type: Number, default: 0.01 }
});
const emit = defineEmits(['update:modelValue', 'input']);
//----------------------------------------------------------
const numericValue = ref(0);
const unitValue = ref('');
const directEdit = ref(false);
//----------------------------------------------------------
function parseModelValue(value) {
	if(typeof value === 'string') {
		const stringValue = `${value ?? ''}`.trim();
		const match = stringValue.match(/^(-?\d*\.?\d+)([a-z%]*)$/i);
		if (!match) { return null; }  //escape hatch
		return {
			value: Number.parseFloat(match[1]),
			unit: match[2] || '',
		};
	} else {
		return {
			value: Number.parseFloat(value), unit:''
		};
	}
}
//----------------------------------------------------------
function emitModelValue(value) {
	const nextValue = Number.parseFloat(`${value}`);
	if (Number.isNaN(nextValue)) {
		return;
	}
	numericValue.value = nextValue;
	let formattedValue = null;
	if(typeof props.modelValue === 'string') { 		
		formattedValue = `${nextValue}${unitValue.value}`;
	} else {
		formattedValue = nextValue
	}
	emit('input', formattedValue);
	emit('update:modelValue', formattedValue);
}
//----------------------------------------------------------
watch(() => props.modelValue, (newVal) => {	
	const parsedValue = parseModelValue(newVal);
	if (!parsedValue) {
		return;
	}
	numericValue.value = parsedValue.value;
	unitValue.value = parsedValue.unit;
}, { immediate: true });
//----------------------------------------------------------
</script>
<template>
<div class="range-slider">
	<input
		type="range"
		:min="min"
		:max="max"
		:step="step"
		:value="numericValue"
		@input="emitModelValue($event.target.value)"
	/>
  <span style="display: flex;" v-if="directEdit">
    <input    
      type="number"
      :min="min"
      :max="max"
      :step="step"
      :value="numericValue"
      @input="emitModelValue($event.target.value)"
    />
    <button @click="directEdit=false">X</button>
  </span>

  <span v-if="!directEdit" @click="directEdit=true">{{ numericValue }}{{ unitValue }}</span>
</div>
</template>
<style>
@import "./range-slider.css";
</style>