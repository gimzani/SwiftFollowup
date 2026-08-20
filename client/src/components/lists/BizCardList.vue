<script setup>
//----------------------------------------------------------
import { ref, reactive, onMounted } from 'vue'
import { Modal } from "@sf/dialogs"
import { useApi } from '@/code/app/useApi';
import { useToasts, useDialog } from '@sf/dialogs';
import { BizCardImage } from "@sf/bizcards"
import { useAuthentication } from '@/code/app/useAuthentication.js';
//----------------------------------------------------------
import BizCardNew from '@/components/forms/BizCardNew.vue';
import ContentRequestForm from '@/components/forms/ContentRequestForm.vue';
//----------------------------------------------------------
const api = useApi();
const toasts = useToasts();
const dialog = useDialog();
const newBizCardModal = reactive({ show: false, data: null });
const sendBizCardModal = reactive({ show: false, data: null });
const auth = useAuthentication();
//----------------------------------------------------------
const userData = ref(null);
const bizCards = ref([]);
//----------------------------------------------------------
async function getBizCards() {
  let res = await api.bizCards.list(userData.value.id);
  if(res.success) {
    bizCards.value = res.data;
  }
}
//----------------------------------------------------------
function newBizCard(data) {
  newBizCardModal.show = true;
  newBizCardModal.data = data;
}
//----------------------------------------------------------
function resetModal() {
  newBizCardModal.show = false;
  newBizCardModal.data = null;
  sendBizCardModal.show = false;
  sendBizCardModal.data = null;
}
//----------------------------------------------------------
async function saveBizCard(data) {  
  data.useraccount_id = userData.value.id
  const res = await api.bizCards.create(data);
  if(res.success) {      
    toasts.success(res.message);
    await getBizCards();
  } else {
    toasts.error(res.message);
  }
  resetModal();
}

//----------------------------------------------------------
function sendBizCard(b) {
  sendBizCardModal.data = b;
  sendBizCardModal.show=true;
}

//----------------------------------------------------------
function viewBizCard(b) {
  const url = window.location.href.replace('bizcards', `bizcard/${b.code}`);
  window.open(url);
}
//----------------------------------------------------------
function editBizCard(b) {
  console.log(b)
}
//----------------------------------------------------------
function deleteBizCard(b) {
  console.log(b)
}
//----------------------------------------------------------
async function sendContentRequest(data) {
  console.log(data)
}

//----------------------------------------------------------
onMounted(async () => {
  userData.value = await auth.getCurrentUser();
  await getBizCards();
})
//----------------------------------------------------------
</script>
<template>
<div class="bizcard-list">

  <section class="d-flex justify-content-between align-items-center mb-2">
    <h1 class="h3">My BizCards</h1>
    <button class="btn btn-success" @click="newBizCard">New BizCard</button>
  </section>

  <div>

    <div class="card" v-for="b in bizCards">
      
      <header class="card-header">          
        <h3 class="h4 text-center">{{ b.bizcard_name }}</h3>
      </header>

      <div class="card-body d-flex justify-content-center p-2">
        <BizCardImage 
          :card-data="b.bizcard_data"
        />        
      </div>

      <div class="card-footer p-2">
        <div>
          <button class="btn btn-danger me-1" @click="deleteBizCard(b)">Delete</button>
        </div>
        <div>   
          <button class="btn btn-success ms-1" @click="sendBizCard(b)">Send</button>
          <button class="btn btn-secondary ms-1" @click="viewBizCard(b)">View</button>
          <button class="btn btn-primary ms-1" @click="editBizCard(b)">Edit</button>
        </div>
      </div>
    </div>



  </div>

  <div class="alert alert-info text-center" v-if="bizCards.length===0" >
    You do not have any BizCards yet. Let's create one!
    <div class="mt-3">
      <button class="btn btn-sm btn-success" @click="newBizCard">
        Create New BizCard
      </button>
    </div>
  </div>
  
  
  <Modal :show="newBizCardModal.show" @close="newBizCardModal.show=false">      
    <BizCardNew class="modal-form" :user-info="userData" @cancel="newBizCardModal.show=false" @save="saveBizCard" />
  </Modal>

  <Modal class="modal-lg" :show="sendBizCardModal.show" @close="sendBizCardModal.show=false">      
    <ContentRequestForm class="modal-form" :bizcard="sendBizCardModal.data" @cancel="sendBizCardModal.show=false" @send="sendContentRequest" />
  </Modal>

</div>
</template>