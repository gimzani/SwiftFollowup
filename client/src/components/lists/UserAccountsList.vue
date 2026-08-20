<script setup>
//----------------------------------------------------------
import { reactive, ref, onMounted } from 'vue'
import { Modal } from "@sf/dialogs"
import { useApi } from '@/code/app/useApi';
import { formatDate } from '@/code/app/useFormatters';
import { DataGrid } from '@sf/data-grid'
//----------------------------------------------------------
import UserAccountNewEdit from '@/components/forms/UserAccountNewEdit.vue';
//----------------------------------------------------------
const api = useApi();
//----------------------------------------------------------
const useraccounts = ref([]);
const useraccountModal = reactive({ show: false, data: null });
//----------------------------------------------------------
const headers = [
  { label: "Email Address", tag: "email_address" },
  { label: "Plan", tag: "plan_code" },
  { label: "Login Count", tag: "login_count" },
  { label: "Last Login", tag: "login_on" },
  { label: "Active", tag: "is_active" },
  { label: "", tag: "command" }
]
//----------------------------------------------------------
async function listUserAccounts() {
  const res = await api.userAccounts.list();
  useraccounts.value = res.data;

}
//----------------------------------------------------------
function newEditUserAccount(data) {
  useraccountModal.show = true;
  useraccountModal.data = data;
}
//----------------------------------------------------------
onMounted(() => {
  listUserAccounts();
});
//----------------------------------------------------------
</script>
<template>
<div class="useraccounts-list">

  <section class="d-flex justify-content-between align-items-center">
    <h1 class="h3">User Accounts</h1>
    <button class="btn btn-success" @click="newEditUserAccount">New UserAccount</button>
  </section>

  <DataGrid 
    class="mt-3"
    :headers="headers"    
    :items="useraccounts" 
  >

  <template #header-login_count>
    <div class="text-center">Login Count</div>
  </template>
  <template #header-login_on>
    <div class="text-center">Last Login</div>
  </template>
  <template #header-is_active>
    <div class="text-center">Active</div>
  </template>

  <template #body-login_on="{ item }">
    <div class="text-center">{{ formatDate(item.login_on, 'MM/dd/yyyy') }}</div>
  </template>
  <template #body-login_count="{ item }">
    <div class="text-center">{{ item.login_count }}</div>
  </template>
  <template #body-is_active="{ item }">
    <div class="text-center">
      <font-awesome-icon icon="check" class="text-success" v-if="item.is_active" />
      <font-awesome-icon icon="times" class="text-danger" v-if="!item.is_active" />
    </div>
  </template>
  <template #body-command="{ item }">
    <div class="text-right">
      <button class="btn btn-xs btn-primary ms-1">Edit</button>
    </div>
  </template>

  </DataGrid>


  <p>
    Edit Useraccount panel ==>
  </p>
  <ul>
    <li>Set Plan</li>
    <li>Set Password</li>
    <li>Reset Password - (send pwd token)</li>
  </ul>



  <Modal :show="useraccountModal.show" @close="useraccountModal.show=false">      
    <UserAccountNewEdit @cancel="useraccountModal.show=false" />
  </Modal>

</div>
</template>