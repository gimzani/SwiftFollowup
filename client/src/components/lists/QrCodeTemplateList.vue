<script setup>
//----------------------------------------------------------
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '@/code/app/useApi';
import { QrCodeImage } from "@sf/qr-codes"
//----------------------------------------------------------
const api = useApi();
const router = useRouter()
//----------------------------------------------------------
const qrCodeTemplates = ref([]);
//----------------------------------------------------------
async function getQrCodeTemplates() {
  let res = await api.qrCodeTemplates.list();
  console.log('res', res);
  if(res.success) {    
    qrCodeTemplates.value = res.data;
  }
}
//----------------------------------------------------------
function editQrTemplate(qr) {
  let qrData = JSON.stringify({
    mode: "template",
    data: qr
  });
  sessionStorage.setItem('qrcode', qrData);
  router.push({ name: "QrCodeEditorPage" })
}
//----------------------------------------------------------
onMounted(() => {
  getQrCodeTemplates();
})
//----------------------------------------------------------
</script>
<template>
<div class="qrcode-template-list">

  <div class="row g-3">

    <div class="col-xl-6 col-xxl-4 text-center" v-for="qr in qrCodeTemplates">

      <div class="card">

        <header class="card-header">          
          <h3 class="h4 text-center">{{ qr.qrcode_name }}</h3>
        </header>
        <div class="card-body p-2">
          <QrCodeImage :options="qr.qrcode_data" />
          <div>
            {{ qr.qrcode_description }}
          </div>
        </div>

        <div class="card-footer p-2">
          <button class="btn btn-primary" @click="editQrTemplate(qr)">Edit</button>
        </div>

      </div>

    </div>

  </div>

</div>
</template>