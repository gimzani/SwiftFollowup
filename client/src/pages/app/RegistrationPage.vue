<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import { RegistrationForm } from "@sf/auth-ui"
import { useAuthentication } from '@/code/useAuthentication.js';
//----------------------------------------------------------
import ColumnLayout from '@/components/layouts/ColumnLayout.vue';
import SwiftFollowupLogo from '@/components/app/SwiftFollowupLogo.vue';
//----------------------------------------------------------
const auth = useAuthentication();
//----------------------------------------------------------
const requestSent = ref(false);
//----------------------------------------------------------
async function submit(formData) {
  const res = await auth.register(formData);
  if(res.success) {    
    requestSent.value = true; 
  } else {
    console.error(res);
  }
}
//----------------------------------------------------------
</script>
<template>
<ColumnLayout class="registration-page">

  <SwiftFollowupLogo
    class="my-3"  
  />

  <RegistrationForm 
    v-if="!requestSent"
    class="mt-2" 
    @submit="submit"  
  />

  <div class="alert alert-info mt-3" style="max-width:375px" v-if="requestSent">
    <h3 class="h3">Registration sent!</h3>
    <p>
      We just sent you an email to verify your account. Please check the email account 
      you used to register and follow the instructions therein to activate your account.
    </p>
    <p>
      When you have done this, you should be taken to the login page, but if not, 
      <a href="/">click here</a>
    </p>
  </div>

</ColumnLayout>
</template>