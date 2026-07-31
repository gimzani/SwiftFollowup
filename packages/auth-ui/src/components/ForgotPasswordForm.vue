<script setup>
//----------------------------------------------------------
import { useRegle } from '@regle/core';
import { required, email, withMessage } from '@regle/rules';
//----------------------------------------------------------
const emit = defineEmits(['submit', 'form-error']);
//----------------------------------------------------------
const { r$ } = useRegle({ emailAddress: '' }, {
  emailAddress: { 
    required: withMessage(required, 'Please enter your email address.'), 
    email: withMessage(email, 'Please enter a valid email.'), 
  }
})
//----------------------------------------------------------
async function forgotPassword() {
  const { valid, errors, data } = await r$.$validate();
  if(valid) {
    emit('submit', {
      emailAddress: data.emailAddress
    });
    emit('form-error', null);
  } else {
    emit('form-error', errors);
  }  
}
//----------------------------------------------------------
</script>
<template>
<div class="forgot-password-form">

  <div class="panel">

    <div class="h3 mb-2">Forgot Password</div>
    
    <div class="form-group">
      <label for="emailAddress">Email Address</label>
      <input type="text" name="emailAddress" v-model="r$.$value.emailAddress" :class="{'invalid': r$.emailAddress.$error}" />
      <small class="form-group-error" :class="{'active': r$.$errors.emailAddress[0]}">{{ r$.$errors.emailAddress[0] }}</small>
    </div>
    <div class="d-flex justify-content-between mt-3">
      <div class="ps-2"></div>
      <div>
        <button class="btn btn-primary" @click="forgotPassword">Recover Password</button>
      </div>
    </div>
  </div>

</div>
</template>

<style scoped>
.forgot-password-form {
  width: 400px;
}
</style>