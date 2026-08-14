<script setup>
//----------------------------------------------------------
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/code/useApi';
import { useDelayClose } from '@/code/useDelayClose.js';
import { useDialog } from '@sf/dialogs'
//----------------------------------------------------------
const route = useRoute();
const router = useRouter();
const api = useApi();
const dialog = useDialog();
//----------------------------------------------------------
const userData = ref(null);
//----------------------------------------------------------
const menuItems = [
  { label: 'Dashboard', icon: 'tachometer-alt', to: '/dashboard' },
  { label: 'BizCards', icon: 'address-card', to: '/bizcards' },
  { label: 'QR Codes', icon: 'qrcode', to: '/qrcodes' },
  { label: 'Contacts', icon: 'address-book', to: '/contacts' }
];
const adminMenuItems = [
  { label: 'UserAccounts', icon: 'users', to: '/useraccounts' },
  { label: 'App Settings', icon: 'cogs', to: '/app-settings' }
]
//----------------------------------------------------------
const menuOpen = ref(false);
const appBarMenuOpen = ref(false);
//----------------------------------------------------------
const { startClose, cancelClose } = useDelayClose(() => appBarMenuOpen.value=false);
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
function goToLoc(loc) {
  appBarMenuOpen.value = false;
  router.push({ name: loc});
}
//----------------------------------------------------------
onMounted(async () => {
  let res =  await api.auth.me();
  userData.value = res.data;
});
//----------------------------------------------------------
</script>
<template>
<div id="app-layout">
  <div class="app-bar">
    <div>
      <button class="menu-toggle" @click="menuOpen=!menuOpen">
        <font-awesome-icon icon="bars" title="user menu" />        
      </button>
      <img class="app-bar-logo" src="/svg/Logo-text.svg" />
    </div>
    <div>
      <button class="btn btn-empty" @click="appBarMenuOpen=!appBarMenuOpen">        
        <font-awesome-icon icon="circle-user" />
      </button>
      <div class="app-bar-menu" v-if="appBarMenuOpen" @mouseleave="startClose" @mouseenter="cancelClose">
        <div class="app-bar-menu-username" v-if="userData">
          {{ userData.first_name }} {{ userData.last_name }}
        </div>
        <a class="app-bar-menu-item" href="#" @click.prevent="goToLoc('MyAccountPage')">My Account</a>
        <a class="app-bar-menu-item" href="#" @click.prevent="logout">Logout</a>
      </div>
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
        <RouterLink 
          v-for="m in adminMenuItems"
          class="app-menu-item" 
          :class="{'active': route.path===m.to}"
          :to="m.to" 
        >
          <font-awesome-icon :icon="m.icon" />
          <span>{{ m.label }}</span>
        </RouterLink>

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