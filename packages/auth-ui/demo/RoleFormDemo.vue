<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import RoleForm from '../src/components/RoleForm.vue'
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
  <RoleForm @save="onSubmit"></RoleForm>
</div>
</template>