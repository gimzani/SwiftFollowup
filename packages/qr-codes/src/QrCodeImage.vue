<script setup>
//----------------------------------------------------------
import { ref, watch, onMounted } from 'vue'
import QRCodeStyling from 'qr-code-styling'
//----------------------------------------------------------
const props = defineProps({
  options: { type: Object }
});
//----------------------------------------------------------
const qrCode = ref(null);
const qrImage = ref(null);
//----------------------------------------------------------
//----------------------------------------------------------
function generateQr() {
  if(!qrImage.value) { return; }
  qrCode.value = new QRCodeStyling(props.options);
  qrImage.value.innerHTML = ''; // Clear previous QR code
  qrCode.value.append(qrImage.value);
}
//----------------------------------------------------------
async function downloadQrCode(downloadOptions) {
  await qrCode.value.download(downloadOptions);
}
//----------------------------------------------------------
defineExpose({
  downloadQrCode
});
//----------------------------------------------------------
watch(() => props.options, (val) => {
  if(val) {
    generateQr();
  }
}, { deep: true });
//----------------------------------------------------------
onMounted(() => {
  generateQr();
});
//----------------------------------------------------------
</script>

<template>
<div ref="qrImage"> </div>
</template>
