<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/code/useApi';
import { useDialog } from '@sf/dialogs'
//----------------------------------------------------------
const route = useRoute();
const router = useRouter();
const api = useApi();
const dialog = useDialog();
//----------------------------------------------------------
const menuItems = [
  { label: 'Dashboard', icon: 'tachometer-alt', to: '/dashboard' },
  { label: 'BizCards', icon: 'address-card', to: '/bizcards' },
  { label: 'QR Codes', icon: 'qrcode', to: '/qrcodes' },
  { label: 'Contacts', icon: 'users', to: '/contacts' }
];
//----------------------------------------------------------
const menuOpen = ref(false);
//----------------------------------------------------------
async function logout() {
  let result = await dialog.confirm({
    title: "Logout?",
    text: "You sure you want to log out?"
  });
  console.log(result)
  if(result.isConfirmed) {
    const res = await api.auth.logout();
    if(res.success) {
      router.push({name: "LoginPage"})
    }
  } 
}
//----------------------------------------------------------
</script>
<template>
<div id="app-layout">
  <div class="app-bar">
    <div>
      <button class="menu-toggle" @click="menuOpen=!menuOpen">
        <font-awesome-icon icon="bars" />        
      </button>
      <img class="app-bar-logo" src="/svg/Logo-text.svg" />
    </div>
    <div>
      <font-awesome-icon icon="circle-user" />   
    </div>
  </div>
  <div id="app-main" :class="{'menu-open': menuOpen}">
    <div id="app-menu">
      <div class="upper-menuitems">
        <RouterLink 
          v-for="m in menuItems"
          class="app-menu-item" 
          :class="{'active': route.path===m.to}"
          :to="m.to" 
        >
          <font-awesome-icon :icon="m.icon" />
          <span>{{ m.label }}</span>
        </RouterLink>
      </div>
      <div class="lower-menuitems">
        <button class="app-menu-item" @click="logout">
          <font-awesome-icon icon="power-off" />
          <span>Logout</span>
        </button>
      </div>
    </div>
    <div class="app-content">
      <slot></slot>
    </div>
  </div>
</div>
</template>