<script setup>
//----------------------------------------------------------
import { ref, onMounted } from 'vue'
import { useApi } from '@/code/app/useApi';
//----------------------------------------------------------
const api = useApi();
//----------------------------------------------------------
const plans = ref([]);
//----------------------------------------------------------
async function getPlans() {
  let res = await api.plans.list();
  console.log('res', res);
  if(res.success) {    
    plans.value = res.data;
  }
}
//----------------------------------------------------------
onMounted(() => {
  getPlans();
})
//----------------------------------------------------------
</script>
<template>
<div class="plans-list">

  <div class="card p-2" v-for="p in plans">
    <div class="d-flex justify-content-between align-items-center">      
      <div>{{ p.plan_name }}</div>
      <div>{{ p.code }}</div>
    </div>
    <div>{{ p.plan_description }}</div>
    <div>{{ p.plan_cost }}</div>    
  </div>

</div>
</template>

<style scoped>
.plans-list {

}
</style>