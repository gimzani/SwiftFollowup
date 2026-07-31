<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import { useRegle } from '@regle/core';
import { required, withMessage } from '@regle/rules';
//----------------------------------------------------------
const emit = defineEmits(['save', 'cancel', 'form-error']);
//----------------------------------------------------------
const form = ref({ permissionName: '', permissionLabel: ''});
const { r$ } = useRegle(form, {
  permissionName: { 
    required: withMessage(required, 'Please enter Permission Name.'), 
    noSpaces: withMessage((value) => !value.includes(' '), "Permission Name cannot have spaces")
  },
  permissionLabel: { 
    required: withMessage(required, 'Please enter Permission Label.'), 
  }
})
//----------------------------------------------------------
async function formReset() {
  form.value.permissionName='';
  form.value.permissionLabel='';
  await r$.$reset();
}
//----------------------------------------------------------
async function save() {
  const { valid, errors, data } = await r$.$validate();
  if(valid) {
    emit('save', {
      permissionName: data.permissionName,
      permissionLabel: data.permissionLabel
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
<div class="permission-form">

  <div class="panel">

    <div class="h3 mb-2">Permission</div>

    <div class="form-group">
      <label for="permissionName">Permission Name</label>
      <input type="text" name="permissionName" v-model="r$.$value.permissionName" :class="{'invalid': r$.permissionName.$error}" />
      <small class="form-group-error" :class="{'active': r$.$errors.permissionName[0]}">{{ r$.$errors.permissionName[0] }}</small>
    </div>
      
    <div class="form-group">
      <label for="permissionLabel">Permission Label</label>
      <input type="text" name="permissionLabel" v-model="r$.$value.permissionLabel" :class="{'invalid': r$.permissionLabel.$error}" />
      <small class="form-group-error" :class="{'active': r$.$errors.permissionLabel[0]}">{{ r$.$errors.permissionLabel[0] }}</small>
    </div>

    <div class="d-flex justify-content-between mt-3">
      <div class="ps-2">
      </div>
      <div>
        <button class="btn btn-danger me-1" @click="cancel">Cancel</button>
        <button class="btn btn-success" @click="save">Save</button>
      </div>
    </div>
  </div>

</div>
</template>

<style scoped lang="scss">
.permission-form {
  min-width: 300px;
}
</style>