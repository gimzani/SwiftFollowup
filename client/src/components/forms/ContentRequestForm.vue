<script setup>
//----------------------------------------------------------
import { onMounted, nextTick, watch, reactive, ref } from 'vue'
import { useRegle } from '@regle/core';
import { required, requiredIf, regex, email, withMessage } from '@regle/rules';
import { useAuthentication } from '@/code/app/useAuthentication.js';
import { ContentRequest, Contact } from "@sf/models"
//----------------------------------------------------------
import ToggleSwitch from '@/components/controls/ToggleSwitch.vue';
//----------------------------------------------------------
const MAX_LENGTH = 160;
//----------------------------------------------------------
const props = defineProps({
  bizcard: { type: Object },
  message: { type: String, default: "Hello, this is {name}. It was great meeting you!"},
  cardshareMessage: { type: String, default: "Here's a link to my business card:" }
});
const emit = defineEmits(['cancel', 'send']);
//----------------------------------------------------------
const auth = useAuthentication();
//----------------------------------------------------------
const userData = ref(null);
//----------------------------------------------------------
const SMS_REGEX = /^(\+?1[\s.-]?)?(\(?[2-9][0-9]{2}\)?[\s.-]?)?[2-9][0-9]{2}[\s.-]?[0-9]{4}$/g;
//----------------------------------------------------------
const form = reactive({ first_name: '', last_name: '', mobile_number: '', email_address:'', message: '', sendToSms: true  });
const { r$ } = useRegle(form, {
  first_name: { 
    required: withMessage(required, 'Please enter your First Name.'), 
  },
  last_name: { 
    required: withMessage(required, 'Please enter your Last Name.'), 
  },
  mobile_number: { 
    required: withMessage(requiredIf(() => form.sendToSms), 'Please enter a mobile number.'), 
    regex: withMessage(regex(SMS_REGEX), 'Please enter a valid mobile number.')
  },
  email_address: { 
    required: withMessage(requiredIf(() => !form.sendToSms), 'Please enter an email address.'), 
    email: withMessage(email, 'Please enter a valid email address.'), 
  },
  message: { 
    required: withMessage(required, 'You must have a message to send, preferably with a link to your card.'), 
  }
});
//----------------------------------------------------------
async function sendSmsMessage() {
  const { valid, data} = await r$.$validate();
  if(valid) {
    let cmd = `sms:${data.mobile_number}?body=${data.message}`;

    //window.open(cmd);

    //TODO: incorporate the old logic into the new...

    emit('send', data);
  }
}
//----------------------------------------------------------
function cancel() {
  emit('cancel');
}
//----------------------------------------------------------
function processMessage() {  
  let fullName = `${userData.value.first_name} ${userData.value.last_name}`;

  // create a new content request...
  //... set the code


  
  let msg = props.message.replaceAll("{name}", fullName);
  r$.$value.message = msg;
}
//----------------------------------------------------------
watch(() => props.bizcard, async (val) => {
  userData.value = await auth.getCurrentUser();
  if(val) {
    processMessage();
  }
}, { immediate: true });
//----------------------------------------------------------
</script>
<template>
<div class="content-view-request">

  <div class="d-flex justify-content-between mb-3">
    <h2 class="h3">Send My Card To:</h2>
    
    <div class="d-flex align-items-center">
      <span>Email</span>
      <ToggleSwitch class="mx-1" v-model="form.sendToSms" />
      <span>SMS</span>
    </div>
  </div>

  <div class="row g-2">
    <div class="col-sm-6">
      <div class="form-group">
        <label for="first_name">First Name</label>
        <input type="text" name="first_name" v-model="r$.$value.first_name" :class="{'invalid': r$.first_name.$error}" />
        <small class="form-group-error" :class="{'active': r$.$errors.first_name[0]}">{{ r$.$errors.first_name[0] }}</small>
      </div>
    </div>
    <div class="col-sm-6">
      <div class="form-group">
        <label for="last_name">Last Name</label>
        <input type="text" name="last_name" v-model="r$.$value.last_name" :class="{'invalid': r$.last_name.$error}" />
        <small class="form-group-error" :class="{'active': r$.$errors.last_name[0]}">{{ r$.$errors.last_name[0] }}</small>
      </div>      
    </div>
  </div>     

  <div class="form-group" v-if="form.sendToSms">
    <label for="mobile_number">Send To (Mobile)</label>
    <input type="text" name="mobile_number" v-model="r$.$value.mobile_number" :class="{'invalid': r$.mobile_number.$error}" />
    <small class="form-group-error" :class="{'active': r$.$errors.mobile_number[0]}">{{ r$.$errors.mobile_number[0] }}</small>
  </div>
    
  <div class="form-group" v-if="!form.sendToSms">
    <label for="email_address">Send To (Email Address)</label>
    <input type="text" name="email_address" v-model="r$.$value.email_address" :class="{'invalid': r$.email_address.$error}" />
    <small class="form-group-error" :class="{'active': r$.$errors.email_address[0]}">{{ r$.$errors.email_address[0] }}</small>
  </div>

  <div class="form-group">
    <label>Message:</label>
    <textarea name="message" v-model="r$.$value.message" :is-valid="!r$.message.$error" :showMaxlength="true" :maxlength="MAX_LENGTH" rows="4" ></textarea>
    <small class="form-group-error" :class="{'active': r$.$errors.message[0]}">{{ r$.$errors.message[0] }}</small>
  </div>

  <div class="form-group text-right mt-3">
    <button class="btn btn-danger" @click="cancel">Cancel</button>
    <button class="btn btn-success ms-1" @click="sendSmsMessage">Send</button>
  </div>

</div>
</template>