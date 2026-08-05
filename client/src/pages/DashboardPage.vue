<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import AppLayout from '@/components/layouts/AppLayout.vue'
//----------------------------------------------------------
const props = defineProps({});
const emit = defineEmits([]);
//----------------------------------------------------------
</script>
<template>
<AppLayout class="dashboard">
  <section>
    <h1 class="h3">Dashboard</h1>
  </section>
  <ul>
    <li>Biz Card gallery - (with default selected)</li>
    <li>Latest Contact requests</li>
    <li>Latest Responses</li>
  </ul>
</AppLayout>
</template>

<style scoped>
.dashboard {

}
</style>