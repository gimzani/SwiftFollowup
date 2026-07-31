<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import LoginForm from '../src/components/LoginForm.vue'
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
  <LoginForm @submit="onSubmit"></LoginForm>
</div>
</template>