<script setup>
//----------------------------------------------------------
import { ref, watch } from 'vue'
import { useGoogleFonts } from './useGoogleFonts';
//----------------------------------------------------------
const googleFonts = useGoogleFonts();
//----------------------------------------------------------
const props = defineProps({
  fonts: { type: [String, Array] },
  displayText: { type: String, default: "My Fair Lady" },
  fontSize: { type: String, default: '1.5rem'}
});
const emit = defineEmits([]);
//----------------------------------------------------------
const fontList = ref([]);
//----------------------------------------------------------
watch(() => props.fonts, (val) => {
  if(val) {
    if(!Array.isArray(val)) {
      fontList.value = [];
      fontList.value.push(val);
    } else {
      fontList.value = val;
    }
    if(fontList.value.length>0) {    
      googleFonts.setGoogleFontsHeaderTags(fontList.value);
    }
  }
}, { immediate: true })
//----------------------------------------------------------
</script>
<template>
<div class="google-font-display" v-if="fontList.length>0">

  <div class="google-font-display-text" v-for="f in fontList" :style="{'font-family': f, 'font-size': fontSize }">
    {{ displayText }}
  </div>
  
</div>
</template>

<style>
@import './google-fonts-tools.css';
</style>