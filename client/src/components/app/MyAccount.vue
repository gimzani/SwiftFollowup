<script setup>
//----------------------------------------------------------
import { ref, onMounted } from 'vue'
import { useApi } from '@/code/useApi';
import { useToasts } from '@sf/dialogs';
//----------------------------------------------------------
import UserprofileEdit from '../forms/UserprofileEdit.vue';
//----------------------------------------------------------
const api = useApi();
const toasts = useToasts();
const userprofileData = ref(null);
//----------------------------------------------------------
const props = defineProps({});
const emit = defineEmits([]);
//----------------------------------------------------------
async function setProfile(data) {
  console.log(data)
  const res = await api.userProfiles.update(userprofileData.value.id, data);
  console.log(res);
  if(res.success) {
    toasts.success("Profile saved.");
  }
}
//----------------------------------------------------------
onMounted(async () => {
  let res =  await api.auth.me();
  console.log(res)

  userprofileData.value = res.data;
});
//----------------------------------------------------------
</script>
<template>
<div class="my-account">

  <section class="d-flex justify-content-between align-items-center">
    <h1 class="h3">My Account</h1>
  </section>

  <article class="alert alert-info">
    Your profile information is used to quickly fill out forms and to 
    generate personalized content quickly. Plase make sure it is accurate 
    and make any adjustments. 
  </article>

  <div class="card card-body mt-3">

    <UserprofileEdit 
      v-if="userprofileData"
      :userprofile-data="userprofileData"
      @save="setProfile"
    />
  </div>


</div>
</template>

<style scoped>
.my-account {

}
</style>