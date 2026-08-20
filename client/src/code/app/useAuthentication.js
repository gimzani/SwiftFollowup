//------------------------------------------------------------- TODO: Finish !!!
import { reactive } from 'vue'
import { useApi } from '@/code/app/useApi'
import { useDialog } from '@sf/dialogs'
//-------------------------------------------------------------
const api = useApi();
const dialog = useDialog();
//-------------------------------------------------------------
const state = reactive({
  userData: null
});
//-------------------------------------------------------------
export function useAuthentication() {
  return {
    login,
    logout,
    register,
    forgotPassword,
    resetPassword,
    changePassword,
    hasPlan,
    verifyEmail,
    resendVerificationEmail,
    getCurrentUser,
    state
  }

  //-------------------------------------------------------------
  async function login(payload) {
    return await api.auth.login({
      email_address: payload.emailAddress,
      password: payload.password
    });
  }
  //-------------------------------------------------------------
  async function logout() {
    let result = await dialog.confirm({
      title: "Logout?",
      text: "You sure you want to log out?"
    });
    if(result.isConfirmed) {
      state.userData = null;
      return await api.auth.logout();
    } else {
      return { success: false, message: "Logout cancelled" };
    }
  }
  //-----------------------------------------------
  async function getCurrentUser() {

    //escape valve
    if(state.userData) {
      if(state.userData.expires_on && new Date(state.userData.expires_on) < new Date()) {
        state.userData = null;
      }      
      return state.userData;
    } 
    
    const res =  await api.auth.me();
    state.userData = res.success ? res.data : null;
    return state.userData;
  }
  //-----------------------------------------------
  function hasPlan(planNames) {
    return planNames.includes(state.userData?.plan_code);
  }
  //-------------------------------------------------------------
  async function register(payload) {
    console.log("NIY Registration", payload)
    return { success: true, message: "Registration not implemented yet" };
  }
  //-------------------------------------------------------------
  async function forgotPassword(payload) {
    console.log("NIY ForgotPassword", payload)
    return { success: true, message: "Forgot password not implemented yet" };
  }
  //-------------------------------------------------------------
  async function resetPassword(payload) {
    console.log("NIY ResetPassword", payload)
    return { success: true, message: "Reset password not implemented yet" };
  }
  //-------------------------------------------------------------
  async function changePassword(payload) {
    console.log("NIY ChangePassword", payload)
    return { success: true, message: "Change password not implemented yet" };
  }
  //-------------------------------------------------------------
  async function verifyEmail(payload) {
    console.log("NIY VerifyEmail", payload)
    return { success: true, message: "Verify email not implemented yet" };
  }
  //-------------------------------------------------------------
  async function resendVerificationEmail(payload) {
    console.log("NIY ResendVerificationEmail", payload)
    return { success: true, message: "Resend verification email not implemented yet" };
  }
  //-----------------------------------------------
}