<script setup>
//----------------------------------------------------------
import { onMounted, ref } from 'vue'
import { useAuthentication } from '@/code/useAuthentication';
//----------------------------------------------------------
import AppLayout from '@/components/layouts/AppLayout.vue'
//----------------------------------------------------------
const auth = useAuthentication();
//----------------------------------------------------------
const output = ref(null);
//----------------------------------------------------------
async function runTest(planName) {
  output.value = await auth.hasPlan(planName);
}
//----------------------------------------------------------
onMounted(async ()=>{
  await auth.getCurrentUser();
})
//----------------------------------------------------------
</script>
<template>
<AppLayout class="my-account-page">

  <div class="p-3 mt-3">
    <button @click="runTest('SF_P_APPADMIN')">Run Test</button>
  </div>

  <div class="p-5 mt-3">
    <h5>Output:</h5>
    {{ output }}
  </div>
  <hr/>
  <div>
    {{ auth.state }}
  </div>

</AppLayout>
</template>