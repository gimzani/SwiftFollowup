<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import SetPasswordForm from '../src/components/SetPasswordForm.vue'
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
  <SetPasswordForm user-id="01KYSH9HPJH6SPNREV6FTJ3NAF" @submit="onSubmit"></SetPasswordForm>
</div>
</template>