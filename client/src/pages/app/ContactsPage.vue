<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
//----------------------------------------------------------
import AppLayout from '@/components/layouts/AppLayout.vue'
import ContactsList from '@/components/lists/ContactsList.vue';
//----------------------------------------------------------
</script>
<template>
<AppLayout class="contacts-page">

  <section class="d-flex justify-content-between align-items-center mb-2">
    <h1 class="h3">My Contacts</h1>
  </section>

  <div>
    <ContactsList />
  </div>

  <hr/>
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