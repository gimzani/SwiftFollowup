<script setup>
//----------------------------------------------------------
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '@/code/app/useApi';
import { useToasts } from '@sf/dialogs';
import { QrCodeEditor } from '@sf/qr-codes'
import { QrCode, QrCodeTemplate } from '@sf/models'
//----------------------------------------------------------
import AppLayout from '@/components/layouts/AppLayout.vue'
//----------------------------------------------------------
const router = useRouter();
const api = useApi();
const toasts = useToasts();
//----------------------------------------------------------
const qrCodeData = ref(null);
//----------------------------------------------------------
async function saveData(data) {

  let res = { success: false };

  if(qrCodeData.value.mode==='template') {
    qrCodeData.value.data.qrcode_data = data;
    const dbRecord = new QrCodeTemplate(qrCodeData.value.data);
    console.log('save to template', dbRecord);
    res = await api.qrCodeTemplates.update(dbRecord.id, dbRecord);
  }

  if(qrCodeData.value.mode==='qrcode') {
    qrCodeData.value.data.qrcode_data = data;
    const dbRecord = new QrCode(qrCodeData.value.data);
    console.log('save to template', dbRecord);
    res = await api.qrCodes.update(dbRecord.id, dbRecord);
  }

  if(res.success) {      
    toasts.success(res.message);
  } else {
    toasts.error(res.message);
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