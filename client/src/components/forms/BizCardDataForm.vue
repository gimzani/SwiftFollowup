<script setup>
//----------------------------------------------------------
// NOTE: This should handle 'text' types only, but should edit the bizcard data elements
//----------------------------------------------------------
import { ref, watch } from 'vue'
//----------------------------------------------------------
const props = defineProps({
  cardData: { type: Object }
});
const emit = defineEmits([]);
//----------------------------------------------------------
const textElements = ref([]);
//----------------------------------------------------------
watch(() => props.cardData, (data) => {
  if(data) {
    textElements.value = props.cardData.elements.filter(e => e.type==='text');
  }
}, { immediate: true })
//----------------------------------------------------------
</script>
<template>
<div class="bizcard-data-form">
  <div class="row g-2">
    <div class="col-md-4" v-for="t in textElements">
      <div class="form-group">
        <label for="text" class="required">{{ t.tag }}</label>
        <textarea rows="2" name="text" v-model="t.text" @input="update" />
      </div>        
    </div>
  </div>
</div>
</template>