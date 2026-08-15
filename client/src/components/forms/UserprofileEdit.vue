<script setup>
//----------------------------------------------------------
import { reactive, watch } from 'vue'
import { useRegle } from '@regle/core';
import { required, email, withMessage } from '@regle/rules';
import { UserProfile } from '@sf/models'
//----------------------------------------------------------
const props = defineProps({
  userprofileData: { type: Object } 
});
const emit = defineEmits(['save', 'form-error']);
//----------------------------------------------------------
const form = reactive(new UserProfile());
const { r$ } = useRegle(form, {
  first_name: { 
    required: withMessage(required, 'Please enter your First Name.'), 
  },
  last_name: { 
    required: withMessage(required, 'Please enter your Last Name.'), 
  }  
})
//----------------------------------------------------------
async function save() {
  const { valid, errors, data } = await r$.$validate();
  if(valid) {
      const userProfile = new UserProfile(data);
    emit('save', userProfile);
    emit('form-error', null);
  } else {
    emit('form-error', errors);
  }  
}
//----------------------------------------------------------
watch(() => props.userprofileData, (val) => {
  if(val) {
    Object.assign(form, val);
  }
}, { immediate: true });
//----------------------------------------------------------
</script>
<template>
<div class="userprofile-form">

  <div class="h3 mb-2">User Profile</div>    
  
  <div class="form-group">
    <label for="first_name">First Name</label>
    <input type="text" name="first_name" v-model="r$.$value.first_name" :class="{'invalid': r$.first_name.$error}" />
    <small class="form-group-error" :class="{'active': r$.$errors.first_name[0]}">{{ r$.$errors.first_name[0] }}</small>
  </div>
  
  <div class="form-group">
    <label for="last_name">Last Name</label>
    <input type="text" name="last_name" v-model="r$.$value.last_name" :class="{'invalid': r$.last_name.$error}" />
    <small class="form-group-error" :class="{'active': r$.$errors.last_name[0]}">{{ r$.$errors.last_name[0] }}</small>
  </div>
  
  <div class="form-group">
    <label for="middle_name">Middle Name</label>
    <input type="text" name="middle_name" v-model="r$.$value.middle_name" :class="{'invalid': r$.middle_name.$error}" />
    <small class="form-group-error" :class="{'active': r$.$errors.middle_name[0]}">{{ r$.$errors.middle_name[0] }}</small>
  </div>
  
  <div class="form-group">
    <label for="title">Title</label>
    <input type="text" name="title" v-model="r$.$value.title" :class="{'invalid': r$.title.$error}" />
    <small class="form-group-error" :class="{'active': r$.$errors.title[0]}">{{ r$.$errors.title[0] }}</small>
  </div>
  
  <div class="form-group">
    <label for="suffix">Suffix</label>
    <input type="text" name="suffix" v-model="r$.$value.suffix" :class="{'invalid': r$.suffix.$error}" />
    <small class="form-group-error" :class="{'active': r$.$errors.suffix[0]}">{{ r$.$errors.suffix[0] }}</small>
  </div>
  
  <div class="form-group">
    <label for="company">Company</label>
    <input type="text" name="company" v-model="r$.$value.company" :class="{'invalid': r$.company.$error}" />
    <small class="form-group-error" :class="{'active': r$.$errors.company[0]}">{{ r$.$errors.company[0] }}</small>
  </div>
  
  <div class="form-group">
    <label for="job_title">Job Title</label>
    <input type="text" name="job_title" v-model="r$.$value.job_title" :class="{'invalid': r$.job_title.$error}" />
    <small class="form-group-error" :class="{'active': r$.$errors.job_title[0]}">{{ r$.$errors.job_title[0] }}</small>
  </div>
  
  <div class="form-group">
    <label for="mailing_address">Mailing Address</label>
    <textarea rows="3" name="mailing_address" v-model="r$.$value.mailing_address" :class="{'invalid': r$.mailing_address.$error}" ></textarea>
    <small class="form-group-error" :class="{'active': r$.$errors.mailing_address[0]}">{{ r$.$errors.mailing_address[0] }}</small>
  </div>

  <div class="form-group">
    <label for="web_address">Web Address</label>
    <input type="text" name="web_address" v-model="r$.$value.web_address" :class="{'invalid': r$.web_address.$error}" />
    <small class="form-group-error" :class="{'active': r$.$errors.web_address[0]}">{{ r$.$errors.web_address[0] }}</small>
  </div>
  
  <div class="form-group">
    <label for="mobile_number">Mobile Number</label>
    <input type="text" name="mobile_number" v-model="r$.$value.mobile_number" :class="{'invalid': r$.mobile_number.$error}" />
    <small class="form-group-error" :class="{'active': r$.$errors.mobile_number[0]}">{{ r$.$errors.mobile_number[0] }}</small>
  </div>

  <div class="d-flex justify-content-between mt-3">
    <div class="ps-2"></div>
    <div>
      <button class="btn btn-success" @click="save">Save</button>
    </div>
  </div> 

</div>
</template>