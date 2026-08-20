<script setup>
//----------------------------------------------------------
import { ref, reactive, onMounted } from 'vue'
import { useApi } from '@/code/app/useApi';
import { useAuthentication } from '@/code/app/useAuthentication.js';
//----------------------------------------------------------
const api = useApi();
const auth = useAuthentication();
//----------------------------------------------------------
const userData = ref(null);
const contentRequests = ref([]);
//----------------------------------------------------------
async function getContacts() {
  let res = await api.contentRequests.list(userData.value.id);
  console.log(res)
  if(res.success) {
    contentRequests.value = res.data;
  }
}
//----------------------------------------------------------
onMounted(async () => {
  userData.value = await auth.getCurrentUser();
  await getContacts();
})
//----------------------------------------------------------
</script>
<template>
<div class="contact-request-list">

  CONTENT REQUEST LIST

   <div>
    <div v-for="c in contentRequests">
      {{ c }}
    </div>
  </div>

</div>
</template>