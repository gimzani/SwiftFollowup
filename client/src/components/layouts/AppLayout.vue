<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
//----------------------------------------------------------
const props = defineProps({});
const emit = defineEmits([]);
//----------------------------------------------------------
</script>
<template>
<div id="app-layout">
  <div class="app-bar">
    <div>
      <button class="menu-toggle">☰</button>
      <span>App Name</span>
    </div>
    <div>
      ICON MENU
    </div>
  </div>
  <div id="app-main">
    <div id="app-menu">
      <div>
        top items
      </div>
      <div>
        bottom items
      </div>
    </div>
    <div class="app-content">
      <slot></slot>
    </div>
  </div>
</div>
</template>