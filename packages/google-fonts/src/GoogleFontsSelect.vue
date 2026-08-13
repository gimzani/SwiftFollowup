<script setup>
//----------------------------------------------------------
import { ref, computed, toRaw, onMounted, onUnmounted, watch } from 'vue'
import { useGoogleFonts } from './useGoogleFonts';
//----------------------------------------------------------
const props = defineProps({
  modelValue: {type: String },
  apiKey: { type: String, default: 'AIzaSyDVNI3A3oXbO7CFlQSksJld-gCqcfIXMJY' },
  addLabel: { type: String, default: 'Add' },
  multiselect: { type: Boolean, default: false },
  showLabels: { type: Boolean, default: false  }
});
const emit = defineEmits(['update:modelValue','selected', 'added']);
//----------------------------------------------------------
const googleFonts = useGoogleFonts();
//----------------------------------------------------------
const fonts = ref([]);
const selectedCategory = ref(null);
const selectedFont = ref(null);
let demoLink = null;
//----------------------------------------------------------
const filteredFonts = computed(() => {
  if(selectedCategory.value) {    
    return fonts.value.filter(f => f.category===selectedCategory.value);
  }
  return fonts.value;
});
//----------------------------------------------------------
function fontSelect() {
  const googleFont = fonts.value.find(f => f.family===selectedFont.value);
  emit('update:modelValue', toRaw(googleFont));
  emit('selected', toRaw(googleFont));
}
//----------------------------------------------------------
function fontAdd() {
  const googleFont = fonts.value.find(f => f.family===selectedFont.value);
  emit('added', toRaw(googleFont));
}
//----------------------------------------------------------
function findFont(fontFamily) {
  const font = fonts.value.find(f => f.family===fontFamily);
  if(font) {
    selectedCategory.value = font.category;
    selectedFont.value = font.family;    
  }
}
//----------------------------------------------------------
watch(() => props.modelValue, (val) => {
  selectedFont.value = val;
  findFont(selectedFont.value);
}, { immediate: true });
//----------------------------------------------------------
onMounted(async () => {
  googleFonts.setApiKey(props.apiKey);
  fonts.value = await googleFonts.getGoogleFontsList();
  if(selectedFont.value) {
    findFont(selectedFont.value);
  }
});
//----------------------------------------------------------
onUnmounted(() => {  
  if(demoLink) { demoLink.remove() }
})
//----------------------------------------------------------
</script>
<template>
<div class="google-font-loader">
  <div>
    <label v-if="showLabels">Category</label>
    <select class="gfl-category-select" v-model="selectedCategory" @change="selectedFont=null">
      <option :value="null">All</option>
      <option v-for="c in googleFonts.categories" :value="c" :key="c">{{ c }}</option>
    </select>
  </div>
  <div style="flex: 1">
    <label v-if="showLabels">Font Family</label>
    <select class="gfl-family-select" v-model="selectedFont" @change="fontSelect">
      <option :value="null">None Selected</option>
      <option v-for="f in filteredFonts" :value="f.family" :key="f.family">{{ f.family }}</option>
    </select>   
  </div>    
  <button @click="fontAdd" v-if="multiselect">
    <span>{{ addLabel }}</span>
  </button>
</div>
</template>

<style>
@import './google-fonts-tools.css';
</style>