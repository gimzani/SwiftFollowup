<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import AppLayout from '@/components/layouts/AppLayout.vue'
//----------------------------------------------------------
</script>
<template>
<AppLayout class="contacts-page">
  <section>
    <h1 class="h3">My Contacts</h1>
  </section>
  <ul>
    <li>Prospects</li>
    <li>Interested</li>
    <li>Not Interested</li>
    <li>Customers</li>
    <li>Vendors</li>
    <li>Partners</li>
  </ul>
</AppLayout>
</template>

<style scoped>
.contacts-page {

}
</style>