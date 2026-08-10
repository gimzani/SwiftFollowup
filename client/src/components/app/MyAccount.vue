<script setup>
//----------------------------------------------------------
import { ref, onMounted } from 'vue'
import { useApi } from '@/code/useApi';
//----------------------------------------------------------
import UserprofileEdit from '../forms/UserprofileEdit.vue';
//----------------------------------------------------------
const api = useApi();
const userprofileData = ref(null);
//----------------------------------------------------------
const props = defineProps({});
const emit = defineEmits([]);
//----------------------------------------------------------
async function setProfile(data) {
  console.log(data)
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

  <UserprofileEdit 
    v-if="userprofileData"
    :userprofile-data="userprofileData"
    @save="setProfile"
  />

</div>
</template>

<style scoped>
.my-account {

}
</style>