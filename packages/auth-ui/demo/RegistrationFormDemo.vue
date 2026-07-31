<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import RegistrationForm from '../src/components/RegistrationForm.vue'
//----------------------------------------------------------
const emit = defineEmits(['output']);
//----------------------------------------------------------
function onSubmit(data) {
  emit('output', data)
}
//----------------------------------------------------------
</script>
<template>
<div class="registration-form-demo">
  <RegistrationForm @submit="onSubmit"></RegistrationForm>
</div>
</template>