<script setup>
//----------------------------------------------------------
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { QrCodeEditor } from '@sf/qr-codes'
//----------------------------------------------------------
import AppLayout from '@/components/layouts/AppLayout.vue'
//----------------------------------------------------------
const router = useRouter();
//----------------------------------------------------------
const qrCodeData = ref(null);
//----------------------------------------------------------
async function saveData(data) {
  if(qrCodeData.value.mode==='template') {
    console.log('save to template', data);
    qrCodeData.value.data.qrcode_data = data;
  }

}
//----------------------------------------------------------
onMounted(() => {
  const jsonString = sessionStorage.getItem('qrcode');
  if(jsonString) {
    qrCodeData.value = JSON.parse(jsonString);
  }
})
//----------------------------------------------------------
</script>
<template>
<AppLayout class="my-account-page">

  <div class="d-flex justify-content-between align-items-center">
    <h1 class="h2">Qr Code Editor</h1>
    <button class="btn btn-info" @click="router.go(-1)">
      <font-awesome-icon icon="chevron-left" /> Back
    </button>
  </div>
  <div class="mt-3">
    <QrCodeEditor 
      v-if="qrCodeData"
      :options="qrCodeData.data.qrcode_data"
      :minSize="100"
      :maxSize="800"
      @save-data="saveData"
    />    
  </div>

</AppLayout>
</template>