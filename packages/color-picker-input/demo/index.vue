<script setup>
//----------------------------------------------------------
import { reactive, ref } from 'vue'
//----------------------------------------------------------
import { CodeHighlighter } from '@sf/code-highlighter'
import { ColorPickerInput } from '@sf/color-picker-input'
//----------------------------------------------------------
import 'vue-color/style.css';
//----------------------------------------------------------
const colorValue = ref("#a4a4a4");
//----------------------------------------------------------
</script>
<template>
<div class="demo">

  <h4>Demo: Color Picker Input</h4>

  <div>

    <ColorPickerInput v-model="colorValue" />   

    <div style="margin-top:2rem;">
      Selected Color Value: {{ colorValue }}
    </div>
  </div>

</div>
</template>