<script setup>
//----------------------------------------------------------
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '@/code/useApi';
import { BizCardImage } from '@sf/bizcards'
//----------------------------------------------------------
const api = useApi();
const router = useRouter()
//----------------------------------------------------------
const bizCardTemplates = ref([]);
//----------------------------------------------------------
async function getBizCardTemplates() {
  let res = await api.bizCardTemplates.list();
  console.log('res', res);
  if(res.success) {    
    bizCardTemplates.value = res.data;
  }
}
//----------------------------------------------------------
function editBizCardTemplate(bizcard) {
  let bizcardData = JSON.stringify({
    mode: "template",
    data: bizcard
  });
  sessionStorage.setItem('bizcard', bizcardData);
  router.push({ name: "BizCardEditorPage" })
}
//----------------------------------------------------------
onMounted(() => {
  getBizCardTemplates();
})
//----------------------------------------------------------
</script>
<template>
<div class="bizcard-template-list">
  

  <div class="card my-2" v-for="bc in bizCardTemplates">

    <header class="card-header d-flex justify-content-between align-items-center">
      <h3>{{ bc.bizcard_name }} Template</h3>   
      <button class="btn btn-sm btn-primary" @click="editBizCardTemplate(bc)">Edit</button>
    </header>

    <div class="p-3 d-flex justify-content-center align-items-center">
      <BizCardImage :card-data="bc.bizcard_data" />
    </div>
    
    <div class="p-2">{{ bc.bizcard_description }}</div>    
    
  </div>  

</div>
</template>

<style scoped>
.bizcard-template-list {

}
</style>