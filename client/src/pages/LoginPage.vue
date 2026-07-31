<script setup>
//----------------------------------------------------------
import { onMounted, ref } from 'vue'
import { LoginForm } from "@sf/auth-ui"
import { useApi } from '@/code/useApi';

//----------------------------------------------------------
const api = useApi();
//----------------------------------------------------------
const apiout = ref(null);
//----------------------------------------------------------
async function submit(payload) {
  console.log(payload);
  const res = await api.auth.login({
    email_address: payload.emailAddress,
    password: payload.password
  });
  console.log(res);
}
//----------------------------------------------------------
onMounted(async () => {
  let res =  await api.auth.me();
  apiout.value = res;  
});
//----------------------------------------------------------
</script>
<template>
<div class="login-page">

  <div class="login-page-container">

    <div class="swift-logo">
      <img src="/svg/Logo-horizontal.svg" />
    </div>

    <LoginForm @submit="submit" />


    <div>
      {{ apiout }}
    </div>


  </div>

</div>
</template>