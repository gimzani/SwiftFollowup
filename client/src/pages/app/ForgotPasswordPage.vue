<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import { ForgotPasswordForm } from "@sf/auth-ui"
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
  const res = await auth.forgotPassword(formData);
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

  <ForgotPasswordForm 
    v-if="!requestSent"
    class="mt-2" 
    @submit="submit"  
  />

  <div class="alert alert-info mt-3" style="max-width:375px" v-if="requestSent">
    <h3 class="h3">Password Reset Sent</h3>
    <p>
      It happens...
    </p>
    <p>
      We sent an email to you with a link to reset your password. But if you suddenly remember, 
      <a href="/">click here</a>
    </p>
  </div>

</ColumnLayout>
</template>