<script setup>
//----------------------------------------------------------
import { RegistrationForm } from "@sf/auth-ui"
//----------------------------------------------------------
import ColumnLayout from '@/components/layouts/ColumnLayout.vue';
import SwiftFollowupLogo from '@/components/app/SwiftFollowupLogo.vue';
//----------------------------------------------------------
async function submit(formData) {
  console.log(formData)
}
//----------------------------------------------------------
</script>
<template>
<ColumnLayout class="registration-page">

  <SwiftFollowupLogo
    class="my-2"  
  />

  <RegistrationForm 
    class="mt-2" 
    @submit="submit"  
  />

</ColumnLayout>
</template>