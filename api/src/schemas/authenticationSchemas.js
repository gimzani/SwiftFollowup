
//------------------------------------------------------
export const loginSchema = {
  body: {
    type: 'object',
    required: ['email_address', 'password'],
    properties: {
      email_address: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 8 }
    }
  }
}
//------------------------------------------------------
export const registrationRequestSchema = {
  body: {
    type: 'object',
    required: ['email_address', 'password', 'first_name', 'last_name'],
    properties: {
      email_address: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 8 },
      first_name: { type: 'string', minLength: 1 },
      last_name: { type: 'string', minLength: 1 },
      mobile_number: { type: 'string', minLength: 10, maxLength: 15 }        
    }
  }
}
//------------------------------------------------------
export const verifyEmailSchema = {
  body: {
    type: 'object',
    required: ['email_address', 'token'],
    properties: {
      email_address: { type: 'string', format: 'email' },
      token: { type: 'string', minLength: 1 }
    }
  }
}
//------------------------------------------------------
export const forgotPasswordSchema = {
  body: {
    type: 'object',
    required: ['email_address'],
    properties: {
      email_address: { type: 'string', format: 'email' }
    }
  }
}
//------------------------------------------------------
export const resetPasswordSchema = {
  body: {
    type: 'object',
    required: ['token', 'new_password'],
    properties: {
      token: { type: 'string', minLength: 1 },
      new_password: { type: 'string', minLength: 8 }
    }
  }
}
//------------------------------------------------------
export default {
  loginSchema,
  registrationRequestSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema
}