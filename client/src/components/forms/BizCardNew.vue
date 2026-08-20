<script setup>
//----------------------------------------------------------
import { ref, reactive, onMounted } from 'vue'
import { useRegle } from '@regle/core';
import { required, url, withMessage } from '@regle/rules';
import { BizCard, BizCardTemplate } from '@sf/models'
import { BizCardImage } from "@sf/bizcards"
import { useApi } from '@/code/app/useApi.js';
import { formatPhone, textTransforms } from '@/code/app/useFormatters.js';
//----------------------------------------------------------
import BizCardDataForm from './BizCardDataForm.vue';
//----------------------------------------------------------
const api = useApi();
//----------------------------------------------------------
const props = defineProps({ userInfo: { type: Object }})
const emit = defineEmits(['save', 'cancel', 'form-error']);
//----------------------------------------------------------
const form = reactive({  name:'', description: '' });
const { r$ } = useRegle(form, {
  name: { 
    required: withMessage(required, 'Please a name for this BizCard.')
  }
})
//----------------------------------------------------------
const bizCardTemplates = ref([]);
const bizCardTemplate = ref(null);
const bizCardTemplateId = ref(null);
//----------------------------------------------------------
async function getBizCardTemplates() {
  let res = await api.bizCardTemplates.list();
  if(res.success) {
    bizCardTemplates.value = res.data;
  }
}
//----------------------------------------------------------
function selectBizCard() {
  const template = bizCardTemplates.value.find(bct => bct.id === bizCardTemplateId.value); 
  if(template) {
    bizCardTemplate.value = { ...template }; 
    for(const element of template.bizcard_data.elements) {
      if(props.userInfo[element.tag]) {
        if(element.tag==='mobile_number') {
          element.text = formatPhone(props.userInfo[element.tag]);
        } else {
          element.text = props.userInfo[element.tag];
        }        
        if(element.modifier) {
          element.text = textTransforms(element.text, element.modifier);
        }
      }
    }
  } else {
    resetQrSelection();  
  }
}
//----------------------------------------------------------
function updateUrl() {
  bizCardTemplate.value.bizcard_data.data = r$.$value.url;
}
//----------------------------------------------------------
async function save() {
  const { valid, errors, data } = await r$.$validate();
  if(valid) {

    const formData = { ...data };
    const bizCard = new BizCard();
    bizCard.useraccount_id = 
    bizCard.bizcard_data = bizCardTemplate.value.bizcard_data;
    bizCard.bizcard_name = formData.name;
    bizCard.bizcard_description = formData.description;

    emit('save', bizCard);
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
  bizCardTemplateId.value = null;
  bizCardTemplate.value = new BizCardTemplate();
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
  getBizCardTemplates();
})
//----------------------------------------------------------
</script>
<template>
<div class="bizcard-new p-1">

  <div class="h3 mb-2">New BizCard</div>    
  
  <div class="p-3">
    <label for="url">Select a Template</label>
    <select v-model="bizCardTemplateId" @change="selectBizCard">
      <option :value="null">NO TEMPLATE</option>
      <option v-for="bct in bizCardTemplates" :value="bct.id" :key="bct.id">{{ bct.bizcard_name }}</option>
    </select>    
  </div>

  <div class="d-flex justify-content-center px-3" v-if="bizCardTemplate">        
    <BizCardImage 
      :card-data="bizCardTemplate.bizcard_data"
    />
  </div>

  <div class="px-3" v-if="bizCardTemplate">

    <div class="form-group">
      <label for="name" class="required">BizCard Name</label>
      <input type="text" name="name" v-model="r$.$value.name" :class="{'invalid': r$.name.$error}" @input="updateUrl" />
      <small class="form-group-error" :class="{'active': r$.$errors.name[0]}">{{ r$.$errors.name[0] }}</small>
    </div>  

    <div class="form-group">
      <label for="description">BizCard Description</label>
      <textarea rows="2" name="description" v-model="r$.$value.description"></textarea>
    </div> 

    <BizCardDataForm 
      v-if="bizCardTemplateId"
      :card-data="bizCardTemplate.bizcard_data"     
    />    

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
.bizcard-new {
  min-width: 400px;
  max-width: 800px;
}
</style>