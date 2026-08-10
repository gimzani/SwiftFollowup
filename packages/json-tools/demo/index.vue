
<script setup>
//----------------------------------------------------------
import { ref, toRaw } from 'vue'
//----------------------------------------------------------
import { JsonEditor, JsonDownload, JsonUpload, JsonSaveLocal, JsonLoadLocal } from '@sf/json-tools';
//----------------------------------------------------------
const jsonData = ref({});
const keyName = ref("local-store-name");
//----------------------------------------------------------
function jsonUploaded(evt) {
  jsonData.value = evt;
}
//----------------------------------------------------------
function clearEditor() {
  jsonData.value = null;
}
//----------------------------------------------------------
function clearStorage() {
  localStorage.clear();
}
//----------------------------------------------------------
function toConsole() {
  console.log(toRaw(jsonData.value));
}
//----------------------------------------------------------
</script>
<template>
<div class="demo">

  <h4>Demo: JSON Tools</h4>

  <p>
    The <strong>Upload</strong> and <strong>Download</strong> buttons will load and export data that appears in the <strong>Editor</strong>.
    You can then store and retrieve that data using the <strong>Save</strong> and <strong>Load</strong> buttons.
  </p>

  <div>

    <div>
      <JsonUpload
        style="width:200px; margin-bottom: 3px;"
        @uploaded="jsonUploaded"
      >
        <i class="fa-solid fa-upload"></i> Upload JSON File
      </JsonUpload>
      <JsonDownload 
        :data="jsonData"
        style="width:200px; margin-bottom: 3px;"
      >
        <i class="fa-solid fa-download"></i> Download JSON File
      </JsonDownload>
    </div>

    <div style="width:100%; height: 400px;">
      <JsonEditor v-model="jsonData"></JsonEditor>
    </div>

    <div>
 
      <input type="text" v-model="keyName" placeholder="key name" />

      <JsonSaveLocal
        style="width:200px; margin-bottom: 3px;"
        :key-name="keyName"
        :data="jsonData"
      >
        <i class="fa-solid fa-floppy-disk"></i> Save JSON Data
      </JsonSaveLocal>

      <JsonLoadLocal
        style="width:200px; margin-bottom: 3px;"
        :key-name="keyName"
        @loaded="jsonUploaded"
      >
        <i class="fa-solid fa-database"></i> Load JSON Data
      </JsonLoadLocal>

      <hr />

      <button 
        style="width:200px; margin-bottom: 3px;"
        @click="clearEditor"
      >
        <i class="fa-solid fa-terminal"></i> Clear Editor
      </button>
      <button 
        style="width:200px; margin-bottom: 3px;"
        @click="clearStorage"
      >
        <i class="fa-solid fa-terminal"></i> Clear Storage
      </button>
      <button 
        style="width:200px; margin-bottom: 3px;"
        @click="toConsole"
      >
        <i class="fa-solid fa-terminal"></i> Send to Console
      </button>
    </div>

  </div>

</div>
</template>