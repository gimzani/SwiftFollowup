<script setup>
//----------------------------------------------------------
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useApi } from '@/code/app/useApi';
//----------------------------------------------------------
const api = useApi();
const route = useRoute();
//----------------------------------------------------------
async function getContentRequest() {
  const code = route.params.code;
  const res = await api.contentRequest.getByCode(code);
  if(res.success) {        
    content.value = res.data;
  }
}
//----------------------------------------------------------
onMounted(async () => {
  await getContentRequest();
}); 
//----------------------------------------------------------
</script>
<template>
<div class="content-request-view">

</div>
</template>

<style scoped>
.content-request-view {

}
</style>