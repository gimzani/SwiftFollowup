<script setup>
//----------------------------------------------------------
import { ref, onMounted } from 'vue'
import { useApi } from '@/code/app/useApi.js';
import { useAuthentication } from '@/code/app/useAuthentication.js';
import { useToasts } from '@sf/dialogs';
//----------------------------------------------------------
import UserprofileEdit from '../forms/UserprofileEdit.vue';
//----------------------------------------------------------
const api = useApi();
const toasts = useToasts();
const auth = useAuthentication();
//----------------------------------------------------------
const userData = ref(null);
//----------------------------------------------------------
async function setProfile(data) {
  console.log(data)
  const res = await api.userProfiles.update(userData.value.id, data);
  console.log(res);
  if(res.success) {
    toasts.success("Profile saved.");
  }
}
//----------------------------------------------------------
onMounted(async () => {
  userData.value = await auth.getCurrentUser();
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
      v-if="userData"
      :userprofile-data="userData"
      @save="setProfile"
    />
  </div>


</div>
</template>

<style scoped>
.my-account {

}
</style>