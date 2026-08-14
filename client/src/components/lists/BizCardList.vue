<script setup>
//----------------------------------------------------------
import { ref, onMounted } from 'vue'
import { useApi } from '@/code/useApi';
//----------------------------------------------------------
const api = useApi();
//----------------------------------------------------------
const userId = ref(null);
const bizCards = ref([]);
//----------------------------------------------------------
async function getBizCards() {
  let res = await api.bizCards.list(userId.value);
  console.log('res', res);
  if(res.success) {    
    bizCards.value = res.data;
  }
}
//----------------------------------------------------------
onMounted(async () => {
  let res =  await api.auth.me();
  console.log(res);
  userId.value = res.data.id;
  await getBizCards();
})
//----------------------------------------------------------
</script>
<template>
<div class="bizcard-list">

  <section class="d-flex justify-content-between align-items-center mb-2">
    <h1 class="h3">My BizCards</h1>
    <button class="btn btn-success">New BizCard</button>
  </section>

  <div>
    {{ bizCards }}
  </div>

  <div class="alert alert-info text-center" v-if="bizCards.length===0" >
    You do not have any BizCards yet. Let's create one!
    <div class="mt-3">
      <button class="btn btn-sm btn-success">
        Create New BizCard
      </button>
    </div>
  </div>
  
</div>
</template>

<style scoped>
.bizcard-list {

}
</style>