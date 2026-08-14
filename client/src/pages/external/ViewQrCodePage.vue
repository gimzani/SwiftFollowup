<script setup>
//----------------------------------------------------------
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useApi } from '@/code/useApi';
import { QrCodeImage } from "@sf/qr-codes"
//----------------------------------------------------------
import ColumnLayout from '@/components/layouts/ColumnLayout.vue';
//----------------------------------------------------------
const api = useApi();
const route = useRoute();
//----------------------------------------------------------
const qrCode = ref(null);
//----------------------------------------------------------
async function getQrCode() {
  const code = route.params.code;
  const res = await api.qrCodes.getByCode(code);
  if(res.success) {        
    qrCode.value = res.data;
  }
}

//01M00EYA865MHP6BQ8GQZ69PZR

//----------------------------------------------------------
onMounted(async () => {
  await getQrCode();
}); 
//----------------------------------------------------------
</script>
<template>
<ColumnLayout class="view-card-page">
  <div class="text-center" v-if="qrCode">
    <QrCodeImage :options="qrCode.qrcode_data" />
    <a :href="qrCode.qrcode_data.data" target="_blank">Follow Link</a>
  </div>
</ColumnLayout>
</template>