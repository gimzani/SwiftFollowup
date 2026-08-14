<script setup>
//----------------------------------------------------------
import { ref, onMounted } from 'vue'
import { useApi } from '@/code/useApi';
//----------------------------------------------------------
const api = useApi();
//----------------------------------------------------------
const userId = ref(null);
const qrCodes = ref([]);
//----------------------------------------------------------
async function getQrCodes() {
  let res = await api.qrCodes.list(userId.value);
  console.log('res', res);
  if(res.success) {    
    qrCodes.value = res.data;
  }
}
//----------------------------------------------------------
onMounted(async () => {
  let res =  await api.auth.me();
  console.log(res);
  userId.value = res.data.id;
  await getQrCodes();
})
//----------------------------------------------------------
</script>
<template>
<div class="qrcodes-list">
  <div>QR CODES</div>
  <div>
    {{ qrCodes }}
  </div>
  <div class="alert alert-info text-center" v-if="qrCodes.length===0" >
    You do not have any QrCodes yet. Let's create one!
    <div class="mt-3">
      <button class="btn btn-sm btn-success">
        Create New QrCode
      </button>
    </div>
  </div>
</div>
</template>

<style scoped>
.qrcodes-list {

}
</style>