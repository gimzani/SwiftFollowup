<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
//----------------------------------------------------------
import AppLayout from '@/components/layouts/AppLayout.vue'
import BizCardTemplateList from '@/components/lists/BizCardTemplateList.vue';
import QrCodeTemplateList from '@/components/lists/QrCodeTemplateList.vue';
//----------------------------------------------------------
const activeTool = ref('bizcardtemplates')
//----------------------------------------------------------
</script>
<template>
<AppLayout class="useraccounts-page">
 
  <div class="mb-3 d-flex justify-content-between align-items-center">
    <h1 class="h2">App Settings</h1>
    <div>
      <select v-model="activeTool">
        <option value="bizcardtemplates">BizCard Templates</option>
        <option value="qrcodetemplates">QR Code Templates</option>
        <option value="plans">Plans and Permissions</option>
      </select>
    </div>
  </div>

  <div v-if="activeTool === 'bizcardtemplates'">
    <BizCardTemplateList></BizCardTemplateList>
  </div>
  <div v-if="activeTool === 'qrcodetemplates'">
    <QrCodeTemplateList></QrCodeTemplateList>
  </div>
  <div v-if="activeTool === 'plans'">
    PLANS AND PERMISSIONS
  </div>

</AppLayout>
</template>