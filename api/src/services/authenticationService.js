//-------------------------------------------------------------------------
import fp from 'fastify-plugin'
import crypto from 'node:crypto'
import argon2 from 'argon2'
//-------------------------------------------------------------------------
import schemas from '../schemas/authenticationSchemas.js'
import emailRelay from './emailRelayService.js'
import { ok, unauthorized, badRequest, serverError, notFound } from '../utils/apiResponses.js'
//-------------------------------------------------------------------------
import useraccountsService from '../modules/useraccounts/useraccountsService.js'
import sessionsService from '../modules/sessions/sessionsService.js'
import emailverificationtokensService from '../modules/emailverificationtokens/emailverificationtokensService.js'
import passwordresettokensService from '../modules/passwordresettokens/passwordresettokensService.js'
import userprofilesService from '../modules/userprofiles/userprofilesService.js'
//-------------------------------------------------------------------------
import { UserAccount } from '@sf/models'
//-------------------------------------------------------------------------
export default fp(async function authPlugin(fastify, opts) {
  //--------------------------------------------------
  const SESSION_COOKIE_NAME = 'session'
  const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7 // 7 days
  //--------------------------------------------------
  fastify.decorateRequest('useraccount', null)
  fastify.decorate('authenticate', async function (req, reply) {
    const session = await getSessionFromRequest(req)
    if (!session) {
      return reply.code(401).send({ error: 'Unauthorized' })
    }
    const useraccount = await findUserById(session.useraccount_id)
    if (!useraccount) {
      return reply.code(401).send({ error: 'Unauthorized' })
    }
    req.useraccount = useraccount
  })
  //------------------------------------------------------
  //#region AUTHENTICATION FLOW
  //------------------------------------------------------
  //--------------------------------------------------
  fastify.post('/api/auth/login',     
    { schema: schemas.loginSchema },
    async (req, reply) => 
  {
    try {
      //--------------------------------
      const { email_address, password } = req.body
      const useraccount = await findUseraccountByEmail(email_address)
      //--------------------------------
      if (!useraccount) {
        return unauthorized(reply, 'Invalid credentials')
      }
      const valid = await verifyPassword(useraccount.password_hash, password)
      if (!valid) {
        return unauthorized(reply, 'Invalid credentials')
      }
      //--------------------------------
      useraccount.login_count++
      useraccount.login_on = new Date();
      useraccountsService.updateUserAccount(fastify.pg, useraccount);
      //--------------------------------

      //todo: look for an active session OR delete it before creating a new one (optional)

      //--------------------------------
      await createSessionForUser(req, reply, useraccount)
      //--------------------------------
      return ok(reply, useraccount, 1, "Login successful")
      //--------------------------------
     } catch(err) {
      return serverError(reply, err)
    }
  })
  //--------------------------------------------------
  fastify.get('/api/auth/logout', async (req, reply) => {    
    try {
      const rawToken = req.cookies[SESSION_COOKIE_NAME]
      if (rawToken) {
        const tokenHash = sha256(rawToken)
        await sessionsService.deleteSessionByToken(fastify.pg, tokenHash)
      }
      reply.clearCookie(SESSION_COOKIE_NAME, { path: '/' })
      return ok(reply, null, 0, "Logout successful")
    } catch(err) {
      return serverError(reply, err)
    }
  })
  //--------------------------------------------------
  fastify.get('/api/auth/me', {
    preHandler: fastify.authenticate
  }, async (req, reply) => { 

    const userAccountResponse = {
      id: parseInt(req.useraccount.id),
      code: req.useraccount.code,
      email_address: req.useraccount.email_address,
      plan_code: req.useraccount.plan_code,
      login_on: req.useraccount.login_on,
      login_count: req.useraccount.login_count,

      first_name: req.useraccount.first_name,
      last_name: req.useraccount.last_name,
      middle_name: req.useraccount.middle_name,
      title: req.useraccount.title,
      suffix: req.useraccount.suffix,
      company: req.useraccount.company,
      job_title: req.useraccount.job_title,
      web_address: req.useraccount.web_address,
      mobile_number: req.useraccount.mobile_number,
      avatar_url: req.useraccount.avatar_url,
      preferences: req.useraccount.preferences,

      is_active: req.useraccount.is_active
    }

    return ok(reply, userAccountResponse, 1, "User account retrieved successfully")
  })
  //------------------------------------------------------
  //#endregion
  //------------------------------------------------------
  //#region REGISTRATION / CONFIRMATION
  //----------------------------------------------------------------------------------------
  fastify.post('/api/auth/register', 
    { schema: schemas.registrationRequestSchema }, 
    async (req, reply) => 
  {
    try {
      // -------------------------------
      const registerRequest = req.body
      // ------------------------------- exists?
      const existing = await findUseraccountByEmail(registerRequest.email_address)
      if (existing) {
        return badRequest(reply, 'User already exists')
      }
      //-------------------------------------- create useraccount
      const passwordHash = await hashPassword(registerRequest.password)
      const useraccount = await createUseraccount({
        email_address: registerRequest.email_address,
        password_hash: passwordHash
      })
      //--------------------------------------
      if(!useraccount) {
        throw new Error('User account creation failed')
      }
      //-------------------------------------- create user profile
      const userProfile = {
        useraccount_id: useraccount.id,
        first_name: registerRequest.first_name,
        last_name: registerRequest.last_name,
        mobile_number: registerRequest.mobile_number
      }
      const createdProfile = await userprofilesService.createUserProfile(fastify.pg, userProfile)
      if (!createdProfile || !createdProfile.rows || !createdProfile.rows[0]) {
        throw new Error('User profile creation failed')
      }
      //-------------------------------------- create email verification token
      const rawToken = generateToken()
      const tokenHash = sha256(rawToken)
      const expiresOn = addMs(now(), 1000 * 60 * 15) // 15 minutes
      await createEmailVerificationToken({
        useraccount_id: useraccount.id,
        token: tokenHash,
        expires_on: expiresOn
      });
      //-------------------------------------- send email verification
      await emailRelay.sendWelcomeEmail(registerRequest.email_address, registerRequest.first_name, registerRequest.last_name)
      await emailRelay.sendAccountConfirmEmail(registerRequest.email_address, rawToken)
      //-------------------------------------- 
      return ok(reply, null, 0, "User registered successfully. Please check your email to verify your account.");
      //-------------------------------------- 
     } catch(err) {
      return serverError(reply, err)
    }
  }) 
  //----------------------------------------------------------------------------------------
  fastify.post('/api/auth/verify-email', 
    { schema: schemas.verifyEmailSchema }, 
    async (req, reply) =>       
  {
    // -------------------------------
    const { email_address, token } = req.body
    const useraccount = await findUseraccountByEmail(email_address);
    if (useraccount) {
      // Hash the submitted token before lookup
      const tokenHash = sha256(token);
      const emailVerification = await findEmailVerificationToken(tokenHash);
      if (emailVerification && new Date(emailVerification.expires_on) > now()) {
        await useraccountsService.activateUserAccount(fastify.pg, useraccount.id);
        await emailverificationtokensService.deleteEmailVerificationToken(fastify.pg, emailVerification);
        // -------------------------------
        return ok(reply, null, 0, "Email verified successfully.");
        // -------------------------------
      } else {
        return badRequest(reply, 'Invalid or expired token');
      }
    } else {
      return badRequest(reply, 'User Account not found.');
    }
  })  
  //----------------------------------------------------------------------------------------
  fastify.post('/api/auth/forgot-password', 
    { schema: schemas.forgotPasswordSchema }, 
    async (req, reply) => {
      try {
        const { email_address } = req.body;
        const useraccount = await findUseraccountByEmail(email_address);
        if (!useraccount) {
          return notFound(reply, 'User not found');
        }
        const rawToken = generateToken();
        const tokenHash = sha256(rawToken);
        const expiresOn = addMs(now(), 1000 * 60 * 15); // 15 minutes
        await createPasswordResetToken({
          useraccount_id: useraccount.id,
          token: tokenHash,
          expires_on: expiresOn
        });
        await emailRelay.sendForgotPasswordEmail(email_address, rawToken);
        return ok(reply, null, 0, 'Password reset email sent successfully.');
      } catch (err) {
        return serverError(reply, err);
      }
    });
  //------------------------------------------------------
  fastify.post('/api/auth/reset-password', 
    { schema: schemas.resetPasswordSchema }, 
    async (req, reply) => {
      try {
        const { token, new_password } = req.body;
        const tokenHash = sha256(token);
        const resetToken = await findPasswordResetToken(tokenHash);
        if (!resetToken || resetToken.expires_on < now()) {
          return badRequest(reply, 'Invalid or expired token');
        }
        const passwordHash = await hashPassword(new_password);
        await updateUserPassword(resetToken.useraccount_id, passwordHash);
        await deletePasswordResetToken(tokenHash);
        return ok(reply, null, 0, 'Password reset successfully.');
      } catch (err) {
        return serverError(reply, err);
      }
    });
  //------------------------------------------------------
  //#endregion
  //------------------------------------------------------
  //#region UTILS
  //------------------------------------------------------ 
  async function createSessionForUser(req, reply, useraccount) {

    const rawToken = generateToken()
    const tokenHash = sha256(rawToken)
    const expiresOn = addMs(now(), SESSION_TTL_MS)

    await createSession({
      useraccount_id: useraccount.id,
      session_token: tokenHash,
      expires_on: expiresOn,
      ip_address: req.ip,
      user_agent: req.headers['user-agent']
    })

    reply.setCookie(SESSION_COOKIE_NAME, rawToken, {
      httpOnly: true,
      secure: false, // set to true in production (HTTPS only)
      sameSite: 'lax',
      path: '/',
      expires: expiresOn
    })
  }
  //--------------------------------------------------
  async function getSessionFromRequest(req) {
    const rawToken = req.cookies[SESSION_COOKIE_NAME]
    if (!rawToken) return null

    const tokenHash = sha256(rawToken)
    const session = await findSessionByTokenHash(tokenHash)

    if (!session) return null
    if (new Date(session.expires_on) < now()) return null

    return session
  }
  // --------------------------------------------------
  // UTILS
  // --------------------------------------------------
  function sha256(input) {
    return crypto.createHash('sha256').update(input).digest('hex')
  }
  //--------------------------------------------------
  async function hashPassword(password) {
    return argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1
    })
  }
  //--------------------------------------------------
  async function verifyPassword(hash, password) {
    return argon2.verify(hash, password)
  }
  //--------------------------------------------------
  function generateToken() {
    return crypto.randomBytes(32).toString('hex')
  }
  //--------------------------------------------------
  function now() {
    return new Date()
  }
  //--------------------------------------------------
  function addMs(date, ms) {
    return new Date(date.getTime() + ms)
  }

  // --------------------------------------------------
  // DATABASE HELPERS (ASSUMED IMPLEMENTATION)
  // --------------------------------------------------

  // ⚠️ These are intentionally abstracted — replace with your DB layer

  //--------------------------------------------------
  async function findUseraccountByEmail(email_address) {
    let result = await useraccountsService.getUserAccountByEmail(fastify.pg, email_address);
    return result.rows[0] || null;
  }
  //--------------------------------------------------
  async function findUserById(id) {
    let result = await useraccountsService.getUserAccountById(fastify.pg, id);
    return result.rows[0] || null;
  }
  //--------------------------------------------------
  async function createUseraccount(useraccount) {

    const userAccount = new UserAccount({
      plan_code: 'SF_P_FREE',
      email_address: useraccount.email_address,
      password_hash: useraccount.password_hash,
      is_active: false
    });


    let result = await useraccountsService.createUserAccount(fastify.pg, userAccount);
    return result.rows[0] || null;
  }
  //--------------------------------------------------
  async function createSession(session) {
    let result = await sessionsService.createSession(fastify.pg, session);
    return result.rows[0] || null;
  }
  //--------------------------------------------------
  async function findSessionByTokenHash(token) {
    let result = await sessionsService.getSessionByToken(fastify.pg, token);
    return result.rows[0] || null;
  }

  // --------------------------------------------------
  // PASSWORD RESET DB HELPERS
  // --------------------------------------------------
  async function createPasswordResetToken(passwordResetToken) {    
    let result = await passwordresettokensService.createPasswordResetToken(fastify.pg, passwordResetToken);
    return result.rows[0] || null;
  }
  //--------------------------------------------------
  async function findPasswordResetToken(token) {  
    let result = await passwordresettokensService.getPasswordResetToken(fastify.pg, token);
    return result.rows[0] || null;
  }
  //--------------------------------------------------
  async function createEmailVerificationToken(emailVerificationToken) {    
    let result = await emailverificationtokensService.createEmailVerificationToken(fastify.pg, emailVerificationToken);
    return result.rows[0] || null;
  }
  //--------------------------------------------------
  async function findEmailVerificationToken(token) {  
    let result = await emailverificationtokensService.getEmailVerificationToken(fastify.pg, token);
    return result.rows[0] || null;
  }
  //--------------------------------------------------
  async function updateUserPassword(useraccount_id, newPasswordHash) {
    let result = await useraccountsService.changePassword(fastify.pg, {useraccount_id, password: newPasswordHash});
    return result.rows[0] || null;
  }
  // --------------------------------------------------
  async function deletePasswordResetToken(token) {
    let result = await passwordresettokensService.deletePasswordResetToken(fastify.pg, token);
    return result;
  }
  // --------------------------------------------------
  // OPTIONAL: CLEANUP HOOK (expired sessions)
  // --------------------------------------------------
  async function deleteExpiredSessions() {
    let result = await sessionsService.deleteExpiredSessions(fastify.pg);
    return result;
  }
  // ...you could run this on an interval if desired
  //------------------------------------------------------
  //#endregion
  //------------------------------------------------------
})