<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import { useRegle } from '@regle/core';
import { required, withMessage } from '@regle/rules';
//----------------------------------------------------------
const emit = defineEmits(['save', 'cancel', 'form-error']);
//----------------------------------------------------------
const form = ref({ roleName: '', roleLabel: '', roleAuthority: 0});
const { r$ } = useRegle(form, {
  roleName: { 
    required: withMessage(required, 'Please enter Role Name.'), 
    noSpaces: withMessage((value) => !value.includes(' '), "Role Name cannot have spaces")
  },
  roleLabel: { 
    required: withMessage(required, 'Please enter Role Label.'), 
  }
})
//----------------------------------------------------------
async function formReset() {
  form.value.roleName='';
  form.value.roleLabel='';
  form.value.roleLabel='';
  await r$.$reset();
}
//----------------------------------------------------------
async function save() {
  const { valid, errors, data } = await r$.$validate();
  if(valid) {
    emit('save', {
      roleName: data.roleName,
      roleLabel: data.roleLabel,
      roleAuthority: data.roleAuthority
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
<div class="role-form">

  <div class="panel">

    <div class="h3 mb-2">Role</div>

    <div class="form-group">
      <label for="roleName">Role Name</label>
      <input type="text" name="roleName" v-model="r$.$value.roleName" :class="{'invalid': r$.roleName.$error}" />
      <small class="form-group-error" :class="{'active': r$.$errors.roleName[0]}">{{ r$.$errors.roleName[0] }}</small>
    </div>
      
    <div class="form-group">
      <label for="roleLabel">Role Label</label>
      <input type="text" name="roleLabel" v-model="r$.$value.roleLabel" :class="{'invalid': r$.roleLabel.$error}" />
      <small class="form-group-error" :class="{'active': r$.$errors.roleLabel[0]}">{{ r$.$errors.roleLabel[0] }}</small>
    </div>

    <div class="form-group">
      <label for="roleAuthority">Role Authority</label>
      <input type="number" name="roleAuthority" v-model.number="r$.$value.roleAuthority" :class="{'invalid': r$.roleAuthority.$error}" />
      <small class="form-group-error" :class="{'active': r$.$errors.roleAuthority[0]}">{{ r$.$errors.roleAuthority[0] }}</small>
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
.role-form {
  min-width: 300px;
}
</style>