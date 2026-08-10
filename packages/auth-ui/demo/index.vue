<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import LoginFormDemo from './LoginFormDemo.vue';
import RegistrationFormDemo from './RegistrationFormDemo.vue';
import ForgotPasswordFormDemo from './ForgotPasswordFormDemo.vue';
import SetPasswordFormDemo from './SetPasswordFormDemo.vue';
import ChangePasswordFormDemo from './ChangePasswordFormDemo.vue';
import ConfirmationCodeFormDemo from './ConfirmationCodeFormDemo.vue';
import RoleFormDemo from './RoleFormDemo.vue';
import PermissionFormDemo from './PermissionFormDemo.vue';
//----------------------------------------------------------
import { JsonEditor } from '@sf/json-tools'
import '@sf/stylebase'
//----------------------------------------------------------
const loginData = ref({});
const registrationData = ref({});
const forgotPasswordData = ref({});
const setPasswordData = ref({});
const changePasswordData = ref({});
const confirmationData = ref({});
const roleData = ref({});
const permissionData = ref({});
//----------------------------------------------------------
</script>
<template>
<div class="demo">

  <h4>Login UI</h4>
  <div class="row">
    <div class="col-auto">
      <LoginFormDemo @output="(data) => loginData=data" />
    </div>
    <div class="col px-4">  
      <JsonEditor v-model="loginData" />
    </div>
  </div>

  <h4 class="mt-4">Registration UI</h4>
  <div class="row">
    <div class="col-auto">
      <RegistrationFormDemo @output="(data) => registrationData=data" />
    </div>
    <div class="col px-4">
      <JsonEditor v-model="registrationData" />
    </div>
  </div>

  <h4 class="mt-4">Forgot Password UI</h4>
  <div class="row">
    <div class="col-auto">
      <ForgotPasswordFormDemo @output="(data) => forgotPasswordData=data" />
    </div>
    <div class="col px-4">
      <JsonEditor v-model="forgotPasswordData" />
    </div>
  </div>


  <h4 class="mt-4">Set Password UI</h4>
  <div class="row">
    <div class="col-auto">
      <SetPasswordFormDemo @output="(data) => setPasswordData=data" />
    </div>
    <div class="col px-4">
      <JsonEditor v-model="setPasswordData" />
    </div>
  </div>

  <h4 class="mt-4">Change Password UI</h4>
  <div class="row">
    <div class="col-auto">
      <ChangePasswordFormDemo @output="(data) => changePasswordData=data" />
    </div>
    <div class="col px-4">
      <JsonEditor v-model="changePasswordData" />
    </div>
  </div>

  <h4 class="mt-4">Confirmation Code UI</h4>
  <div class="row">
    <div class="col-auto">
      <ConfirmationCodeFormDemo @output="(data) => confirmationData = { value: data }" />
    </div>
    <div class="col px-4">
      <JsonEditor v-model="confirmationData" />
    </div>
  </div>





  <hr class="mt-4" />

  <em>Additional Auth components</em>


  <h4 class="mt-4">Role Creation Form UI</h4>
  <div class="row">
    <div class="col-auto">
      <RoleFormDemo @output="(data) => roleData=data" />
    </div>
    <div class="col px-4">
      <JsonEditor v-model="roleData" />
    </div>
  </div>


  <h4 class="mt-4">Permission Creation Form UI</h4>
  <div class="row">
    <div class="col-auto">
      <PermissionFormDemo @output="(data) => permissionData=data" />
    </div>
    <div class="col px-4">
      <JsonEditor v-model="permissionData" />
    </div>
  </div>






</div>
</template>