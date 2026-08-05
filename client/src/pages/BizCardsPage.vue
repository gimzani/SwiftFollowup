<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import AppLayout from '@/components/layouts/AppLayout.vue'
//----------------------------------------------------------
</script>
<template>
<AppLayout class="bizcards-page">

  <section class="d-flex justify-content-between align-items-center">
    <h1 class="h3">My BizCards</h1>
    <button class="btn btn-success">New BizCard</button>
  </section>

  <ul>
    <li>Biz Card gallery - (with default selected)</li>
    <li>Biz Card List</li>
    <li>List of 'collected' BizCards</li>
  </ul>

</AppLayout>
</template>

<style scoped>
.bizcards-page {

}
</style>