<script setup>
//----------------------------------------------------------
import { ref, reactive, onMounted } from 'vue'
import { useRegle } from '@regle/core';
import { required, url, withMessage } from '@regle/rules';
import { QrCode, QrCodeTemplate } from '@sf/models'
import { QrCodeImage } from "@sf/qr-codes"
import { useApi } from '@/code/app/useApi';
//----------------------------------------------------------
const api = useApi();
//----------------------------------------------------------
const emit = defineEmits(['save', 'cancel', 'form-error']);
//----------------------------------------------------------
const form = reactive({ url: '', name:'', description: '' });
const { r$ } = useRegle(form, {
  name: { 
    required: withMessage(required, 'Please a name for this Qr Code.')
  },
  url: { 
    required: withMessage(required, 'Please a web address.'), 
    url: withMessage(url, 'Please enter a valid web address.'), 
  }
})
//----------------------------------------------------------
const qrCodeTemplates = ref([]);
const qrCodeTemplate = ref(null);
const qrCodeTemplateId = ref(null);
//----------------------------------------------------------
async function getQrCodeTemplates() {
  let res = await api.qrCodeTemplates.list();
  console.log('res', res);
  if(res.success) {
    console.log('qr code template', res.data)
    qrCodeTemplates.value = res.data;
  }
}
//----------------------------------------------------------
function selectQrCode() {
  const template = qrCodeTemplates.value.find(qrt => qrt.id === qrCodeTemplateId.value); 
  if(template) {
    qrCodeTemplate.value = { ...template };
    r$.$value.url = qrCodeTemplate.value.qrcode_data.data;    
  } else {
    resetQrSelection();  
  }
}
//----------------------------------------------------------
function updateUrl() {
  qrCodeTemplate.value.qrcode_data.data = r$.$value.url;
}
//----------------------------------------------------------
async function save() {
  const { valid, errors, data } = await r$.$validate();
  if(valid) {

    const formData = { ...data };
    const qrCode = new QrCode();
    qrCode.qrcode_data = qrCodeTemplate.value.qrcode_data;
    qrCode.qrcode_name = formData.name;
    qrCode.qrcode_description = formData.description;

    emit('save', qrCode);
    emit('form-error', null);
    resetForm();
  } else {
    emit('form-error', errors);
  }  
}
//----------------------------------------------------------
function cancel() {
  emit('cancel');
  resetForm();
}
//----------------------------------------------------------
function resetQrSelection() {
  qrCodeTemplateId.value = null;
  qrCodeTemplate.value = new QrCodeTemplate();
  r$.$value.url = qrCodeTemplate.value.qrcode_data.data;  
}
//----------------------------------------------------------
function resetForm() {
  setTimeout(() => {
    Object.assign(form, { url: '', name:'', description: '' });
    resetQrSelection();
    r$.$reset();
  }, 1000);
}
//----------------------------------------------------------
onMounted(() => {
  getQrCodeTemplates();
  selectQrCode();
})
//----------------------------------------------------------
</script>
<template>
<div class="qrcode-new p-1">

  <div class="h3 mb-2">New Qr Code</div>    
  
  <div class="p-3">
    <label for="url">Select a Template</label>
    <select v-model="qrCodeTemplateId" @change="selectQrCode">
      <option :value="null">NO TEMPLATE</option>
      <option v-for="qt in qrCodeTemplates" :value="qt.id" :key="qt.id">{{ qt.qrcode_name }}</option>
    </select>    
  </div>

  <div class="text-center" v-if="qrCodeTemplate">        
    <QrCodeImage :options="qrCodeTemplate.qrcode_data" />
  </div>

  <div class="px-3">
    <div class="form-group">
      <label for="name" class="required">Qr Code Name</label>
      <input type="text" name="name" v-model="r$.$value.name" :class="{'invalid': r$.name.$error}" @input="updateUrl" />
      <small class="form-group-error" :class="{'active': r$.$errors.name[0]}">{{ r$.$errors.name[0] }}</small>
    </div>    
    <div class="form-group">
      <label class="required" for="url">Qr Code Target Url</label>
      <input type="text" name="url" v-model="r$.$value.url" :class="{'invalid': r$.url.$error}" @input="updateUrl" />
      <small class="form-group-error" :class="{'active': r$.$errors.url[0]}">{{ r$.$errors.url[0] }}</small>
    </div>    
    <div class="form-group">
      <label for="description">Qr Code Description</label>
      <textarea rows="2" name="description" v-model="r$.$value.description"></textarea>
    </div> 
  </div>

  <div class="d-flex justify-content-between mt-3">
    <div class="ps-2"></div>
    <div>
      <button class="btn btn-danger me-1" @click="cancel">Cancel</button>
      <button class="btn btn-success" @click="save">Save</button>
    </div>
  </div> 

</div>
</template>

<style scoped>
.qrcode-new {
  min-width: 400px;
}
</style>