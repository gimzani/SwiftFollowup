<script setup>
//----------------------------------------------------------
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/code/app/useApi';
import { useDelayClose } from '@/code/app/useDelayClose.js';
import { useDialog } from '@sf/dialogs'
import { useAuthentication } from '@/code/app/useAuthentication.js';
//----------------------------------------------------------
const route = useRoute();
const router = useRouter();
const api = useApi();
const dialog = useDialog();
const auth = useAuthentication();
//----------------------------------------------------------
const userData = ref(null);
//----------------------------------------------------------
const menuItems = [
  { label: 'Dashboard', icon: 'tachometer-alt', to: '/dashboard' },
  { label: 'BizCards', icon: 'address-card', to: '/bizcards' },
  { label: 'QR Codes', icon: 'qrcode', to: '/qrcodes' },
  { label: 'Contacts', icon: 'address-book', to: '/contacts', plan:"SF_P_CONNECTIONS,SF_P_APPADMIN" }
];
const adminMenuItems = [
  { label: 'UserAccounts', icon: 'users', to: '/useraccounts', plan:"SF_P_APPADMIN" },
  { label: 'App Settings', icon: 'cogs', to: '/app-settings', plan:"SF_P_APPADMIN" }
]
//----------------------------------------------------------
const menuOpen = ref(false);
const appBarMenuOpen = ref(false);
//----------------------------------------------------------
const { startClose, cancelClose } = useDelayClose(() => appBarMenuOpen.value=false);
//----------------------------------------------------------
async function logout() {
  const res = await auth.logout();
  if(res.success) {
    router.push('/');
  }  
}
//----------------------------------------------------------
function goToLoc(loc) {
  appBarMenuOpen.value = false;
  router.push({ name: loc});
}
//----------------------------------------------------------
function checkPlan(m) {
  if(m.plan) {
    return auth.hasPlan(m.plan.split(','));
  } else {
    return true;
  }
}
//----------------------------------------------------------
onMounted(async () => {
  userData.value = await auth.getCurrentUser();
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
        <div v-for="m in menuItems">
          <RouterLink         
            v-if="checkPlan(m)"    
            class="app-menu-item" 
            :class="{'active': route.path===m.to}"
            :to="m.to" 
          >
            <font-awesome-icon :icon="m.icon" />
            <span>{{ m.label }}</span>
          </RouterLink>          
        </div>

      </div>
      <div class="lower-menuitems">
        <div v-for="m in adminMenuItems">
          <RouterLink 
            v-if="checkPlan(m)"
            class="app-menu-item" 
            :class="{'active': route.path===m.to}"
            :to="m.to" 
          >
            <font-awesome-icon :icon="m.icon" />
            <span>{{ m.label }}</span>
          </RouterLink>
        </div>


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