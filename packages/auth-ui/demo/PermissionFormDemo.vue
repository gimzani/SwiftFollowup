<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import PermissionForm from '../src/components/PermissionForm.vue'
//----------------------------------------------------------
const emit = defineEmits(['output']);
//----------------------------------------------------------
function onSubmit(data) {
  emit('output', data)
}
//----------------------------------------------------------
</script>
<template>
<div class="login-form-demo">
  <PermissionForm @save="onSubmit"></PermissionForm>
</div>
</template>