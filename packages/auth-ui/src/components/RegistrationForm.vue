<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import { useRegle } from '@regle/core';
import { required, email, withMessage, sameAs } from '@regle/rules';
//----------------------------------------------------------
const emit = defineEmits(['submit', 'form-error']);
//----------------------------------------------------------
const form = ref({ emailAddress: '', password: '', passwordConfirm:'', firstName: '', lastName: '' });
const { r$ } = useRegle(form, {
  firstName: { 
    required: withMessage(required, 'Please enter your First Name.'), 
  },
  lastName: { 
    required: withMessage(required, 'Please enter your Last Name.'), 
  },
  emailAddress: { 
    required: withMessage(required, 'Please enter your email address.'), 
    email: withMessage(email, 'Please enter a valid email address.'), 
  },
  password: { 
    required: withMessage(required, 'Please enter your password.'), 
  },
  passwordConfirm: { 
    required: withMessage(required, 'Please confirm your password.'), 
    sameAs: withMessage(sameAs(() => form.value.password), 'Passwords must match.')
  }
})
//----------------------------------------------------------
async function register() {
  const { valid, errors, data } = await r$.$validate();
  if(valid) {
    emit('submit', {
      firstName: data.firstName,
      LastName: data.lastName,
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
<div class="registration-form">

  <div class="panel">

    <div class="h3 mb-2">Register</div>
        
    <div class="form-group">
      <label for="firstName">First Name</label>
      <input type="text" name="firstName" v-model="r$.$value.firstName" :class="{'invalid': r$.firstName.$error}" />
      <small class="form-group-error" :class="{'active': r$.$errors.firstName[0]}">{{ r$.$errors.firstName[0] }}</small>
    </div>
    
    <div class="form-group">
      <label for="lastName">Last Name</label>
      <input type="text" name="lastName" v-model="r$.$value.lastName" :class="{'invalid': r$.lastName.$error}" />
      <small class="form-group-error" :class="{'active': r$.$errors.lastName[0]}">{{ r$.$errors.lastName[0] }}</small>
    </div>
    
    <div class="form-group">
      <label for="emailAddress">Email Address</label>
      <input type="text" name="emailAddress" v-model="r$.$value.emailAddress" :class="{'invalid': r$.emailAddress.$error}" />
      <small class="form-group-error" :class="{'active': r$.$errors.emailAddress[0]}">{{ r$.$errors.emailAddress[0] }}</small>
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" name="password" v-model="r$.$value.password" :class="{'invalid': r$.password.$error}" />
      <small class="form-group-error" :class="{'active': r$.$errors.password[0]}">{{ r$.$errors.password[0] }}</small>
    </div>

    <div class="form-group">
      <label for="passwordConfirm">Confirm Password</label>      
      <input type="password" name="passwordConfirm" v-model="r$.$value.passwordConfirm" :class="{'invalid': r$.passwordConfirm.$error}" />
      <small class="form-group-error" :class="{'active': r$.$errors.passwordConfirm[0]}">{{ r$.$errors.passwordConfirm[0] }}</small>
    </div>

    <div class="d-flex justify-content-between mt-3">
      <div class="ps-2"></div>
      <div>
        <button class="btn btn-primary" @click="register">Register</button>
      </div>
    </div>
  </div>

</div>
</template>

<style scoped>
.registration-form {
  width: 375px;
}
</style>