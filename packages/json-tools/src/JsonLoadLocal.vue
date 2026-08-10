<script setup>
//----------------------------------------------------------
const props = defineProps({
  label: { type: String, default: "Save" },
  keyName: { type: String, default: 'localJsonData' }
});
const emit = defineEmits(['loaded']);
//----------------------------------------------------------
function loadLocal() {
  let json = localStorage.getItem(props.keyName);
  if(json) {
    emit('loaded', JSON.parse(json));
  }
}
//----------------------------------------------------------
</script>
<template>
<button v-bind="$attrs" @click="loadLocal"><slot>{{ label }}</slot></button>
</template>