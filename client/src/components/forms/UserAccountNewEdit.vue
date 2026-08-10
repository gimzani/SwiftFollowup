<script setup>
//----------------------------------------------------------
import { ref, watch } from 'vue'
import { useRegle } from '@regle/core';
import { required, email, withMessage } from '@regle/rules';
import { UserAccount } from '@sf/models'
//----------------------------------------------------------
const props = defineProps({
  useraccountData: { type: Object } 
});
const emit = defineEmits(['save', 'cancel', 'form-error']);
//----------------------------------------------------------
const form = ref({ emailAddress: '', plan_code: '', is_active: false });
const { r$ } = useRegle(form, {
  emailAddress: { 
    required: withMessage(required, 'Please enter your email address.'), 
    email: withMessage(email, 'Please enter a valid email address.'), 
  },
  plan_code: { 
    required: withMessage(required, 'Please select a plan.'), 
  }
})
//----------------------------------------------------------
async function save() {
  const { valid, errors, data } = await r$.$validate();
  if(valid) {
      const userAccount = new UserAccount(data);
    emit('save', userAccount);
    emit('form-error', null);
  } else {
    emit('form-error', errors);
  }  
}
//----------------------------------------------------------
function cancel() {
  emit('cancel');
}
//----------------------------------------------------------
watch(() => props.useraccountData, (val) => {
  if(val) {
    Object.assign(form, val);
  }
}, { immediate: true });
//----------------------------------------------------------
</script>
<template>
<div class="registration-form">

  <div class="h3 mb-2">User Account</div>    
  
  <div class="form-group">
    <label for="emailAddress">Email Address</label>
    <input type="text" name="emailAddress" v-model="r$.$value.emailAddress" :class="{'invalid': r$.emailAddress.$error}" />
    <small class="form-group-error" :class="{'active': r$.$errors.emailAddress[0]}">{{ r$.$errors.emailAddress[0] }}</small>
  </div>

  <div class="d-flex justify-content-between mt-3">
    <div class="ps-2"></div>
    <div>
      <button class="btn btn-danger me-1" @click="cancel">Cancel</button>
      <button class="btn btn-success" @click="save">Save</button>
    </div>
  </div> 

</div>
</template>

<style scoped>
.registration-form {
  width: 375px;
}
</style>