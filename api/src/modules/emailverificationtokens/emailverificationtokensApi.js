//---------------------------------------------------------------
import EmailVerificationToken from '@models/models/EmailVerificationToken'
import emailverificationtokensService from './emailverificationtokensService.js'
import { ok, serverError, notFound } from '../../utils/apiResponses.js'
//---------------------------------------------------------------
/**
 * Encapsulates the emailverificationtokens routes
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
export default async function routes (fastify) {

  //-------------------------------------------------------- LIST
  fastify.get('/api/emailverificationtokens/:useraccount_id', async (request, reply) => {
    try {
      let result = await emailverificationtokensService.getAllEmailVerificationTokens(fastify.pg, request.params.useraccount_id)
      ok(reply, result.rows, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- GET
  fastify.get('/api/emailverificationtoken/:id', async (request, reply) => {
    try {
      let result = await emailverificationtokensService.getEmailVerificationTokenById(fastify.pg, request.params.id)
      ok(reply, result.rows[0] || null, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- CREATE
  fastify.post('/api/emailverificationtokens', async (request, reply) => {
    try {
      const emailVerificationToken = new EmailVerificationToken(request.body)
      let result = await emailverificationtokensService.createEmailVerificationToken(fastify.pg, emailVerificationToken)
      ok(reply, result.rows[0], result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- UPDATE
  fastify.put('/api/emailverificationtoken/:id', async (request, reply) => {
    try {
      let exists = await emailverificationtokensService.getEmailVerificationTokenById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const emailVerificationToken = new EmailVerificationToken({
          ...request.body,
          id: request.params.id
        })
        let result = await emailverificationtokensService.updateEmailVerificationToken(fastify.pg, emailVerificationToken)
        ok(reply, result.rows[0], result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- DELETE
  fastify.delete('/api/emailverificationtoken/:id', async (request, reply) => {
    try {
      let exists = await emailverificationtokensService.getEmailVerificationTokenById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const emailVerificationToken = new EmailVerificationToken(exists.rows[0])
        let result = await emailverificationtokensService.deleteEmailVerificationToken(fastify.pg, emailVerificationToken)
        ok(reply, result.rows, result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })
}
