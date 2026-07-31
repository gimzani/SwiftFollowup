<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import ChangePasswordForm from '../src/components/ChangePasswordForm.vue'
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
  <ChangePasswordForm user-id="01KYSH9HPJH6SPNREV6FTJ3NAF" @save="onSubmit"></ChangePasswordForm>
</div>
</template>