<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import { useRegle } from '@regle/core';
import { required, withMessage, sameAs } from '@regle/rules';
//----------------------------------------------------------
const props = defineProps({
  userId: { type: [ Number, String ], required: true }
});
const emit = defineEmits(['save', 'cancel', 'form-error']);
//----------------------------------------------------------
const form = ref({ oldPassword: '', newPassword: '', passwordConfirm: '' });
const { r$ } = useRegle(form, {
  oldPassword: { 
    required: withMessage(required, 'Please enter your previous password.'), 
  },
  newPassword: { 
    required: withMessage(required, 'Please enter your new password.'), 
  },
  passwordConfirm: { 
    required: withMessage(required, 'Please confirm your password.'), 
    sameAs: withMessage(sameAs(() => form.value.newPassword), 'Passwords must match.')
  }
})
//----------------------------------------------------------
async function save() {
  const { valid, errors, data } = await r$.$validate();
  if(valid) {
    emit('save', {
      userId: props.userId,
      newPassword: data.newPassword
    });
    emit('form-error', null);
  } else {
    emit('form-error', errors);
  }  
}
//----------------------------------------------------------
function cancel() {
  formReset();
  emit('cancel');
}
//----------------------------------------------------------
</script>
<template>
<div class="forgot-password-form">

  <div class="panel">

    <div class="h3 mb-2">Change Password</div>

    <div class="form-group">
      <label for="oldPassword">Password</label>
      <input type="password" name="oldPassword" v-model="r$.$value.oldPassword" :class="{'invalid': r$.oldPassword.$error}" />
      <small class="form-group-error" :class="{'active': r$.$errors.oldPassword[0]}">{{ r$.$errors.oldPassword[0] }}</small>
    </div>

    <div class="form-group">
      <label for="newPassword">Password</label>
      <input type="password" name="newPassword" v-model="r$.$value.newPassword" :class="{'invalid': r$.newPassword.$error}" />
      <small class="form-group-error" :class="{'active': r$.$errors.newPassword[0]}">{{ r$.$errors.newPassword[0] }}</small>
    </div>

    <div class="form-group">
      <label for="passwordConfirm">Confirm Password</label>      
      <input type="password" name="passwordConfirm" v-model="r$.$value.passwordConfirm" :class="{'invalid': r$.passwordConfirm.$error}" />
      <small class="form-group-error" :class="{'active': r$.$errors.passwordConfirm[0]}">{{ r$.$errors.passwordConfirm[0] }}</small>
    </div>


    <div class="d-flex justify-content-between mt-3">
      <div class="ps-2"></div>
      <div>
        <button class="btn btn-danger me-1" @click="cancel">Cancel</button>
        <button class="btn btn-success" @click="save">Save</button>
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