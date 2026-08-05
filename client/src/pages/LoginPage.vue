<script setup>
//----------------------------------------------------------
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { LoginForm } from "@sf/auth-ui"
import { useApi } from '@/code/useApi';
//----------------------------------------------------------
import ColumnLayout from '@/components/layouts/ColumnLayout.vue';
//----------------------------------------------------------
const api = useApi();
const router = useRouter();
//----------------------------------------------------------
const apiout = ref(null);
//----------------------------------------------------------
async function submit(payload) {
  console.log(payload);
  const res = await api.auth.login({
    email_address: payload.emailAddress,
    password: payload.password
  });
  if(res.success) {
    router.push({name: "DashboardPage"})
  }
  console.log(res);
}
//----------------------------------------------------------
onMounted(async () => {
  let res =  await api.auth.me();
  apiout.value = res;  
  if(res.success) {
    router.push({name: "DashboardPage"})
  }
});
//----------------------------------------------------------
</script>
<template>
<ColumnLayout class="login-page">

  <div class="login-page-container">

    <div class="swift-logo">
      <img src="/svg/Logo-horizontal.svg" />
    </div>

    <LoginForm @submit="submit" />


    <div>
      {{ apiout }}
    </div>


  </div>

</ColumnLayout>
</template>