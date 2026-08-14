<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import AppLayout from '@/components/layouts/AppLayout.vue'
import BizCardList from '@/components/lists/BizCardList.vue';
//----------------------------------------------------------
</script>
<template>
<AppLayout class="bizcards-page">

  <ul>
    <li>Biz Card gallery - (with default selected)</li>
    <li>Biz Card List</li>
    <li>List of 'collected' BizCards</li>
  </ul>

  <BizCardList />

</AppLayout>
</template>

<style scoped>
.bizcards-page {

}
</style>