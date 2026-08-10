<script setup>
//----------------------------------------------------------
const props = defineProps({
  data: { type: Object },
  label: { type: String, default: "Save" },
  keyName: { type: String, default: 'localJsonData' }
});
const emit = defineEmits(['saved']);
//----------------------------------------------------------
function saveLocal() {
  localStorage.setItem(props.keyName, JSON.stringify(props.data));
  emit('saved');
}
//----------------------------------------------------------
</script>
<template>
<button v-bind="$attrs" @click="saveLocal"><slot>{{ label }}</slot></button>
</template>