<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import ConfirmationCodeForm from '../src/components/ConfirmationCodeForm.vue'
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
  <ConfirmationCodeForm @submit="onSubmit"></ConfirmationCodeForm>
</div>
</template>