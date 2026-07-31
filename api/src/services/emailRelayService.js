//---------------------------------------------------
// Email Sender
//   Uses SMTP2GO relay
//--------------------------------------------------------
import { Result } from '@sf/models'
//---------------------------------------------------
const httpHeaders = { "Content-Type": "application/json" };
const supportEmail = process.env.EMAIL_SUPPORT;
//---------------------------------------------------
export default {
  newEnvelope,
  sendEmail,
  sendWelcomeEmail,
  sendAccountConfirmEmail,
  sendForgotPasswordEmail
}
//---------------------------------------------------
//#region Email Sender
//--------------------------------------------------- 
export function newEnvelope(to, from, subject, body) {
  const apiKey = process.env.EMAIL_RELAY_API_KEY;
  from = from || supportEmail;
  return {
    api_key: apiKey,
    to: [to],
    sender: from,
    subject: subject,
    text_body: body
  }
}
//---------------------------------------------------
export async function sendEmail(envelope) {
  const apiRoot = process.env.EMAIL_RELAY_API;
  let json = JSON.stringify(envelope);
  return await fetch(`${apiRoot}/email/send`, { method: 'POST', body: json, headers: httpHeaders });
}
//---------------------------------------------------
//#endregion
//---------------------------------------------------
//#region Email Templates
//---------------------------------------------------  
export async function sendWelcomeEmail(email_address, first_name, last_name) {
  let result = new Result();
  try {
    let envelope = newEnvelope(email_address);
    envelope.subject = "Welcome to SwiftFollowup";
    envelope.template_id = 'sf_welcome';
    envelope.template_data = {
      fullname: `${first_name} ${last_name}`,
      support_email: supportEmail
    };
    await sendEmail(envelope);
    result.setSuccess('Welcome email sent.');
  } catch(error) {
    result.setFailure(`Email sender error: ${error.message}`);
  }
  return result;
}
//---------------------------------------------------
export async function sendAccountConfirmEmail(email_address, rawToken) {
  let result = new Result();
  try {
    let envelope = newEnvelope(email_address);
    envelope.subject = "Activate your SwiftFollowup account";
    envelope.template_id = 'sf_account-activation';
    envelope.template_data = {
      token: rawToken,
      confirm_url: `https://swiftfollowup.com/activate`,
    };
    await sendEmail(envelope);
    result.setSuccess('Account Confirmation email sent.');
  } catch(error) {
    result.setFailure(`Email sender error: ${error.message}`);
  }
  return result;
}
//---------------------------------------------------
export async function sendForgotPasswordEmail(email_address, rawToken) {
  let result = new Result();
  try {
    let envelope = newEnvelope(email_address);
    envelope.subject = "Reset your SwiftFollowup password";
    envelope.template_id = 'sf_reset_password';
    envelope.template_data = {
      token: rawToken,
      confirm_url: `https://swiftfollowup.com/auth-key`,
    };
    await sendEmail(envelope);
    result.setSuccess('Password reset email sent.');
  } catch(error) {
    result.setFailure(`Email sender error: ${error.message}`);
  }
  return result;
}
//---------------------------------------------------
//#endregion
//---------------------------------------------------