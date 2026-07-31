<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import ForgotPasswordForm from '../src/components/ForgotPasswordForm.vue'
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
  <ForgotPasswordForm @submit="onSubmit"></ForgotPasswordForm>
</div>
</template>