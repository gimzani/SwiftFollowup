<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import { useJsonTools } from './useJsonTools.js'
//----------------------------------------------------------
const { exportJsonFile } = useJsonTools();
//----------------------------------------------------------
const props = defineProps({
  label: { type: String, default: "Download" },
  fileName: { type: String, default: "data.json" },
  data: { type: Object }
});
const emit = defineEmits([]);
//----------------------------------------------------------
async function exportFile() {
  let fileName = prompt("File Name?", props.fileName );
  if(fileName) {      
    await exportJsonFile(fileName, props.data);
  }
}
//----------------------------------------------------------
</script>
<template>
<button @click="exportFile"><slot>{{ label }}</slot></button>
</template>