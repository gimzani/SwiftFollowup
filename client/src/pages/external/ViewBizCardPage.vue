<script setup>
//----------------------------------------------------------
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useApi } from '@/code/app/useApi';
import { BizCardImage } from "@sf/bizcards"
//----------------------------------------------------------
import ColumnLayout from '@/components/layouts/ColumnLayout.vue';
//----------------------------------------------------------
const api = useApi();
const route = useRoute();
//----------------------------------------------------------
const bizcard = ref(null);
//----------------------------------------------------------
async function getBizCard() {
  const code = route.params.code;
  const res = await api.bizCards.getByCode(code);
  if(res.success) {        
    bizcard.value = res.data;
  }
}
//----------------------------------------------------------
onMounted(async () => {
  await getBizCard();
}); 
//----------------------------------------------------------
</script>
<template>
<ColumnLayout class="view-card-page">

  <BizCardImage 
    v-if="bizcard"
    :card-data="bizcard.bizcard_data"
  />
  <div class="view-card-page-buttons">
    BUTTON ROW
  </div>

  <div>{{bizcard}}</div>

</ColumnLayout>
</template>