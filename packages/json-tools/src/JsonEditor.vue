<script setup>
//----------------------------------------------------------
import { ref, watch, onMounted, onBeforeUnmount, shallowReactive } from 'vue'
import * as cm from './CodeMirrorJson.js'
//----------------------------------------------------------
const props = defineProps({
  modelValue: { type: Object },
  readOnly: { type: Boolean },
  expanded: { type: Boolean, default: false }
});
const emit = defineEmits(['focus', 'blur', 'update', 'change', 'update:modelValue']);
//----------------------------------------------------------
const jsonEditor = ref(null);
const jsonContent = ref(null);
const isValid = ref(true);
const invalidMessage = ref(null);
//----------------------------------------------------------
const editor = shallowReactive({
  state: null,
  view: null
});
//----------------------------------------------------------
watch(() => props.modelValue, ()=> {
  jsonContent.value = JSON.stringify(props.modelValue, null, 2);
}, { immediate: true });
//----------------------------------------------------------
onMounted(() => {

  editor.state = cm.createEditorState({
    content: jsonContent.value,
    onFocus: (viewUpdate) => emit('focus', viewUpdate),
    onBlur: (viewUpdate) => emit('blur', viewUpdate),
    onUpdate: (viewUpdate) => emit('update', viewUpdate),
    onChange: (newDoc, viewUpdate) => {
      if (!props.readOnly && newDoc !== props.modelValue) {
        try {
          let obj = JSON.parse(newDoc);
          emit('change', obj, viewUpdate)
          emit('update:modelValue', obj, viewUpdate)
          invalidMessage.value = null;
          isValid.value = true;
        } catch(err) {
          invalidMessage.value = err;
          isValid.value = false;
        }
      }
    }
  });

  editor.view = cm.createEditorView({
    state: editor.state,
    parent: jsonEditor.value
  });

  const controller = cm.getEditorController(editor.view);

  watch(
    () => jsonContent.value,
    (newValue) => {
      if (newValue !== controller.getDoc()) {
        controller.setDoc(newValue)
      }
    }
  );

  watch(() => props.readOnly, (newValue) => {
    controller.toggleDisabled(newValue);
  });

  watch(() => props.expanded, (newValue) => {
    controller.toggleCodeFolding(newValue);
  });



});
//----------------------------------------------------------
onBeforeUnmount(() => {
  if (editor.view) {
    cm.destroyEditorView(editor.view);
  }
});
//----------------------------------------------------------
</script>
<template>
<div class="json-editor">
  <div ref="jsonEditor" class="json-editor-body"></div>
  <div class="error-message" v-if="!isValid">{{ invalidMessage }}</div>
</div>
</template>

<style>
@import './json-tools.css';
</style>