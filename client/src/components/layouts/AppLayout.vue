<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
//----------------------------------------------------------
const menuOpen = ref(false);
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
      <div>
        <RouterLink to="/dashboard" class="app-menu-item">
          <font-awesome-icon icon="tachometer-alt" />
          <span>Dashboard</span>
        </RouterLink>
        <RouterLink to="/bizcards" class="app-menu-item mt-1">
          <font-awesome-icon icon="address-card" />
          <span>BizCards</span>
        </RouterLink>
        <RouterLink to="/qrcodes" class="app-menu-item mt-1">
          <font-awesome-icon icon="qrcode" />
          <span>QR Codes</span>
        </RouterLink>
        <RouterLink to="/contacts" class="app-menu-item mt-1">
          <font-awesome-icon icon="users" />
          <span>Contacts</span>
        </RouterLink>
      </div>
      <div>
        <button class="app-menu-item">
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