<script setup>
//----------------------------------------------------------
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { LoginForm } from "@sf/auth-ui"
import { useAuthentication } from '@/code/app/useAuthentication.js';
//----------------------------------------------------------
import ColumnLayout from '@/components/layouts/ColumnLayout.vue';
import SwiftFollowupLogo from '@/components/app/SwiftFollowupLogo.vue';
//----------------------------------------------------------
const allowRegistration = import.meta.env.VITE_ALLOW_REGISTRATION==='true' ? true: false;
//----------------------------------------------------------
const router = useRouter();
const auth = useAuthentication();
//----------------------------------------------------------
const userData = ref(null);
const registrationUrl = ref('/register');
//----------------------------------------------------------
async function submit(payload) {
  const res = await auth.login(payload);
  if(res.success) {
    router.push({name: "DashboardPage"})
  }
}
//----------------------------------------------------------
onMounted(async () => {  
  userData.value = await auth.getCurrentUser();
  if(userData.value) {
    router.push({name: "DashboardPage"})
  }
});
//----------------------------------------------------------
</script>
<template>
<ColumnLayout class="login-page">

  <div class="login-page-container">

    <SwiftFollowupLogo
      class="my-3"  
    />

    <LoginForm 
      @submit="submit" 
      :allowRegistration="allowRegistration"
      :registration-url="registrationUrl" 
    />

  </div>

</ColumnLayout>
</template>