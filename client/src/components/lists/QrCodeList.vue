<script setup>
//----------------------------------------------------------
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Modal } from "@sf/dialogs"
import { useApi } from '@/code/useApi';
import { useToasts, useDialog } from '@sf/dialogs';
import { QrCodeImage } from "@sf/qr-codes"
//----------------------------------------------------------
import QrCodeNew from '@/components/forms/QrCodeNew.vue';
//----------------------------------------------------------
const api = useApi();
const router = useRouter()
const toasts = useToasts();
const dialog = useDialog();
//----------------------------------------------------------
const userId = ref(null);
const qrCodes = ref([]);
const qrImageRefs = ref([]);
const newQrCodeModal = reactive({ show: false, data: null });
//----------------------------------------------------------
async function getQrCodes() {
  let res = await api.qrCodes.list(userId.value);
  console.log('res', res);
  if(res.success) {    
    qrCodes.value = res.data;
  }
}
//----------------------------------------------------------
function newQrCode(data) {
  newQrCodeModal.show = true;
  newQrCodeModal.data = data;
}
//----------------------------------------------------------
async function saveQrCode(data) {
  console.log('SAVE', data);
  data.useraccount_id = userId.value;
  if(data.id===0) {
    const res = await api.qrCodes.create(data);
    if(res.success) {      
      toasts.success(res.message);
      await getQrCodes();
    } else {
      toasts.error(res.message);
    }
  }
  resetModal();
}
//----------------------------------------------------------
function downloadQrCode(ind) {
  let qrFileName = qrCodes.value[ind].qrcode_name.replaceAll(' ','');
  qrImageRefs.value[ind].downloadQrCode({ name: qrFileName, extension: 'png'});
}
//----------------------------------------------------------
function viewQrCode(qr) {
  const url = window.location.href.replace('qrcodes', `qrcode/${qr.code}`);
  window.open(url);
}
//----------------------------------------------------------
function editQrCode(qr) {
  let qrData = JSON.stringify({
    mode: "qrcode",
    data: qr
  });
  sessionStorage.setItem('qrcode', qrData);
  router.push({ name: "QrCodeEditorPage" })
}
//----------------------------------------------------------
async function deleteQrCode(qr) {
  let result = await dialog.confirm({
    title: `Delete ${ qr.qrcode_name}?`,
    text: `You sure you want to delete this QR Code?`
  });
  if(result.isConfirmed) {
    const res = await api.qrCodes.delete(qr.id);
    if(res.success) {
      toasts.success(res.message);
      await getQrCodes();
    } else {
      toasts.error(res.message);
    }
  } 
}
//----------------------------------------------------------
function resetModal() {
  newQrCodeModal.show = false;
  newQrCodeModal.data = null;
}
//----------------------------------------------------------
onMounted(async () => {
  let res =  await api.auth.me();
  console.log(res);
  userId.value = res.data.id;
  await getQrCodes();
})
//----------------------------------------------------------
</script>
<template>
<div class="qrcodes-list">

  <section class="d-flex justify-content-between align-items-center mb-2">
    <h1 class="h3">My Qr Codes</h1>
    <button class="btn btn-success" @click="newQrCode">New Qr Code</button>
  </section>

  <div class="col-xl-6 col-xxl-4 text-center" v-for="(qr, index) in qrCodes">

    <div class="card">

      <header class="card-header">          
        <h3 class="h4 text-center">{{ qr.qrcode_name }}</h3>
      </header>
      <div class="card-body p-2">
        <QrCodeImage ref="qrImageRefs" :options="qr.qrcode_data" />
        <div>
          {{ qr.qrcode_description }}
        </div>
      </div>

      <div class="card-footer p-2">
        <div>
          <button class="btn btn-danger me-1" @click="deleteQrCode(qr)">Delete</button>
        </div>
        <div>          
          <button class="btn btn-info ms-1" @click="downloadQrCode(index)">Download</button>
          <button class="btn btn-secondary ms-1" @click="viewQrCode(qr)">View</button>
          <button class="btn btn-primary ms-1" @click="editQrCode(qr)">Edit</button>
        </div>
      </div>

    </div>

  </div>

  <div class="alert alert-info text-center" v-if="qrCodes.length===0" >
    You do not have any QrCodes yet. Let's create one!
    <div class="mt-3">
      <button class="btn btn-sm btn-success" @click="newQrCode">
        Create New Qr Code
      </button>
    </div>
  </div>

   <Modal :show="newQrCodeModal.show" @close="newQrCodeModal.show=false">      
    <QrCodeNew @cancel="newQrCodeModal.show=false" @save="saveQrCode" />
  </Modal>

</div>
</template>