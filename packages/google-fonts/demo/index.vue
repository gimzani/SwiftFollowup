<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import { GoogleFontsSelect, GoogleFontsDisplay } from '@sf/google-fonts'
//----------------------------------------------------------
const props = defineProps({
  cfg: { type: Object }              // client config object
});
//----------------------------------------------------------
const selectedFont = ref('Style Script');
const selectedFonts = ref([]);
const inputText = ref("The quick brown fox jumps over the lazy dogs.");
const fontSize = ref("2rem")
//----------------------------------------------------------
function selectFont(font) {
  selectedFont.value = font.family;
}
//----------------------------------------------------------
function addFont(font) {
  let fontsArray = [...selectedFonts.value];
  fontsArray.push(font.family);
  selectedFonts.value = fontsArray;
}
//----------------------------------------------------------
//----------------------------------------------------------
</script>
<template>
<div class="demo">

  <h4>Demo: GoogleFonts Tools</h4>

  <div>
    <GoogleFontsSelect 
      v-model="selectedFont"
      :api-key="cfg.googleFontsKey" 
      :multiselect="true"
      :showLabels="true"
      @selected="selectFont"
      @added="addFont"
    />

    <div class="mt-3 d-flex">
      <div>
        <label class="d-block">Display Text</label>
        <input type="text" v-model="inputText" style="width: 400px" />
      </div>
      <div>
        <label class="d-block">Font Size</label>
        <input type="text" v-model="fontSize" style="width: 75px" />
      </div>
    </div>

    <div style="margin: 1rem;">        
      <GoogleFontsDisplay :fonts="selectedFont" :display-text="inputText" :font-size="fontSize"  />
    </div>
    <div style="margin: 1rem;">        
      <GoogleFontsDisplay :fonts="selectedFonts" :display-text="inputText" :font-size="fontSize" />
    </div>

  </div>

</div>
</template>