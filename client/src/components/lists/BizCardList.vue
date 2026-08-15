<script setup>
//----------------------------------------------------------
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Modal } from "@sf/dialogs"
import { useApi } from '@/code/useApi';
import { useToasts, useDialog } from '@sf/dialogs';
import { BizCardImage } from "@sf/bizcards"
//----------------------------------------------------------
import BizCardNew from '@/components/forms/BizCardNew.vue';
//----------------------------------------------------------
const api = useApi();
const router = useRouter()
const toasts = useToasts();
const dialog = useDialog();
const newBizCardModal = reactive({ show: false, data: null });
//----------------------------------------------------------
const userInfo = ref(null);
const bizCards = ref([]);
//----------------------------------------------------------
async function getBizCards() {
  let res = await api.bizCards.list(userInfo.value.id);
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
}
//----------------------------------------------------------
async function saveBizCard(data) {
  console.log(data);
}

//----------------------------------------------------------
onMounted(async () => {
  let res =  await api.auth.me();
  userInfo.value = res.data;
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
    {{ bizCards }}
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
    <BizCardNew :user-info="userInfo" @cancel="newBizCardModal.show=false" @save="saveBizCard" />
  </Modal>

</div>
</template>

<style scoped>
.bizcard-list {

}
</style>