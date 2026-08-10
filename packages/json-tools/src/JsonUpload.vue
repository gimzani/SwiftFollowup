<script setup>
//----------------------------------------------------------
import { ref, toRaw } from 'vue'
import { useJsonTools } from './useJsonTools';
//----------------------------------------------------------
const jsonTools = useJsonTools();
//----------------------------------------------------------
const props = defineProps({
  label: { type: String, default: "Upload" }
});
const emit = defineEmits(['uploaded']);
//----------------------------------------------------------
const fileselect = ref(null);
//----------------------------------------------------------
async function importJsonFile(evt) {
  const file = evt.target.files[0];
  let jsonObject = await jsonTools.readJsonFile(file);
  emit('uploaded', toRaw(jsonObject));

}
//----------------------------------------------------------
</script>
<template>
<button v-bind="$attrs" @click="fileselect.click()"><slot>{{ label }}</slot></button>
<input type="file" ref="fileselect" @change="importJsonFile" style="display:none">  
</template>