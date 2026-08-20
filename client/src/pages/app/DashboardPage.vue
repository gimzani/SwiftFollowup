<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import AppLayout from '@/components/layouts/AppLayout.vue'
import BizCardGallery from '@/components/controls/BizCardGallery.vue'
import ContentRequestList from '@/components/lists/ContentRequestList.vue'
import ContactResponseList from '@/components/lists/ContactResponseList.vue'
//----------------------------------------------------------
</script>
<template>
<AppLayout class="dashboard">

  <section>
    <h1 class="h3">Dashboard</h1>
  </section>

  <BizCardGallery></BizCardGallery>

  <ContentRequestList></ContentRequestList>

  <ContactResponseList></ContactResponseList>


</AppLayout>
</template>

<style scoped>
.dashboard {

}
</style>