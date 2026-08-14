<script setup>
//----------------------------------------------------------
import { ref, watch } from 'vue'
import { QrCodeData } from '@sf/models'
import { useJsonTools } from '@sf/json-tools'
//----------------------------------------------------------
import QrCodeEditForm from './QrCodeEditForm.vue'
import QrCodeImage from './QrCodeImage.vue';
//----------------------------------------------------------
const { exportJsonFile } = useJsonTools();
//----------------------------------------------------------
import 'vue-color/style.css';
//----------------------------------------------------------
const props = defineProps({
  options: { type: Object },
  showDownload: { type: Boolean },
  minSize: { type: Number, default: 200 },
  maxSize: { type: Number, default: 650 },
});
const emit = defineEmits(['save-data']);
//----------------------------------------------------------
const qrCodeRef = ref(null);
const qrOptions = ref(new QrCodeData());
//----------------------------------------------------------
function saveData(data) {
  emit('save-data', data.options);
}
//----------------------------------------------------------
async function downloadData(obj) {
  if(obj.type==='json') {
    await exportJsonFile(obj.filename, obj.data);
  } else {
    await qrCodeRef.value.downloadQrCode({ name: obj.filename, extension: obj.type });
  }
}
//----------------------------------------------------------
watch(() => props.options, (val) => {
  if(val) {
    qrOptions.value = new QrCodeData(val);
  }  
}, { immediate: true });
//----------------------------------------------------------
</script>
<template>
<div class="qr-code-editor">
  <div class="qr-code-container">
    <QrCodeImage 
      ref="qrCodeRef"
      :options="qrOptions"
    />
  </div>
  <div class="qr-form-container">
    <QrCodeEditForm 
      v-model="qrOptions" 
      :minSize="minSize"
      :maxSize="maxSize"
      :showDownload="showDownload"
      @save-data="saveData"
      @download-data="downloadData"
    />
  </div>
</div>
</template>