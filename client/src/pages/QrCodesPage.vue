<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import AppLayout from '@/components/layouts/AppLayout.vue'
//----------------------------------------------------------
</script>
<template>
<AppLayout class="qrcodes-page">

  <section class="d-flex justify-content-between align-items-center">
    <h1 class="h3">My QR Codes</h1>
    <button class="btn btn-success">New Qr</button>
  </section>
  
  <ul>
    <li>QrCode List</li>
    <li>Scanner</li>
  </ul>

</AppLayout>
</template>

<style scoped>
.qrcodes-page {

}
</style>