<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import { useRegle } from '@regle/core';
import { required, email, withMessage } from '@regle/rules';
//----------------------------------------------------------
const props = defineProps({
  registrationLabel: { type: String, default: "Register for FREE" },
  registrationUrl: { type: String }
});
const emit = defineEmits(['submit', 'form-error']);
//----------------------------------------------------------
const form = ref({ emailAddress: '', password: '' });
const { r$ } = useRegle(form, {
  emailAddress: { 
    required: withMessage(required, 'Please enter your email address.'), 
    email: withMessage(email, 'Please enter a valid email.'), 
  },
  password: { 
    required: withMessage(required, 'Please enter your password.'), 
  }
})
//----------------------------------------------------------
async function login() {
  const { valid, errors, data } = await r$.$validate();
  if(valid) {
    emit('submit', {
      emailAddress: data.emailAddress,
      password: data.password
    });
    emit('form-error', null);
  } else {
    emit('form-error', errors);
  }  
}
//----------------------------------------------------------
</script>
<template>
<div class="login-form">

  <div class="panel">

    <div class="h3 mb-2">Sign In</div>
    
    <div class="form-group">
      <label for="emailAddress">Email Address</label>      
      <input type="text" name="emailAddress" v-model="r$.$value.emailAddress" :class="{'invalid': r$.emailAddress.$error}" />
      <small class="form-group-error" :class="{'active': r$.$errors.emailAddress[0]}">{{ r$.$errors.emailAddress[0] }}</small>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" name="password" v-model="r$.$value.password" :class="{'invalid': r$.password.$error}"  @keyup.enter="login" />
      <small class="form-group-error" :class="{'active': r$.$errors.password[0]}">{{ r$.$errors.password[0] }}</small>
    </div>
    <div class="d-flex justify-content-between mt-3">
      <div class="ps-2">
        <a :href="registrationUrl" v-if="registrationUrl">{{ registrationLabel }}</a>
      </div>
      <div>
        <button class="btn btn-primary" @click="login">Login</button>
      </div>
    </div>
  </div>

</div>
</template>

<style scoped>
.login-form {
  width: 325px;
}
</style>