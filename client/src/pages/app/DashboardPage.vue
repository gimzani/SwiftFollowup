<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import AppLayout from '@/components/layouts/AppLayout.vue'
import BizCardGallery from '@/components/controls/BizCardGallery.vue'
import ContactRequestList from '@/components/lists/ContactRequestList.vue'
import ContactResponseList from '@/components/lists/ContactResponseList.vue'
//----------------------------------------------------------
</script>
<template>
<AppLayout class="dashboard">

  <section>
    <h1 class="h3">Dashboard</h1>
  </section>

  <BizCardGallery></BizCardGallery>

  <ContactRequestList></ContactRequestList>

  <ContactResponseList></ContactResponseList>


</AppLayout>
</template>

<style scoped>
.dashboard {

}
</style>