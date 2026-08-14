<script setup>
//----------------------------------------------------------
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { BizCardEditor } from '@sf/bizcards'
//----------------------------------------------------------
import AppLayout from '@/components/layouts/AppLayout.vue'
//----------------------------------------------------------
const router = useRouter();
//----------------------------------------------------------
const bizCardData = ref(null);
//----------------------------------------------------------
async function saveData(data) {
  if(bizCardData.value.mode==='template') {
    console.log('save to template', data);
    bizCardData.value.data.bizcard_data = data;
  }

}
//----------------------------------------------------------
onMounted(() => {
  const jsonString = sessionStorage.getItem('bizcard');
  if(jsonString) {
    bizCardData.value = JSON.parse(jsonString);
    console.log(bizCardData.value)
  }
})
//----------------------------------------------------------
</script>
<template>
<AppLayout class="my-account-page">

  <div class="d-flex justify-content-between align-items-center">
    <h1 class="h2">BizCard Editor</h1>
    <button class="btn btn-info" @click="router.go(-1)">
      <font-awesome-icon icon="chevron-left" /> Back
    </button>
  </div>
  <div class="mt-3" v-if="bizCardData">
    <BizCardEditor :card-data="bizCardData.data.bizcard_data" />
  </div>

</AppLayout>
</template>