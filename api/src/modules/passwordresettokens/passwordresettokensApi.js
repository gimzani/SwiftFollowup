//---------------------------------------------------------------
import { PasswordResetToken } from '@sf/models'
import passwordresettokensService from './passwordresettokensService.js'
import { ok, serverError, notFound } from '../../utils/apiResponses.js'
//---------------------------------------------------------------
/**
 * Encapsulates the passwordresettokens routes
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
export default async function routes (fastify) {

  //-------------------------------------------------------- LIST
  fastify.get('/api/passwordresettokens/:useraccount_id', async (request, reply) => {
    try {
      let result = await passwordresettokensService.getAllPasswordResetTokens(fastify.pg, request.params.useraccount_id)
      ok(reply, result.rows, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- GET
  fastify.get('/api/passwordresettoken/:id', async (request, reply) => {
    try {
      let result = await passwordresettokensService.getPasswordResetTokenById(fastify.pg, request.params.id)
      ok(reply, result.rows[0] || null, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- CREATE
  fastify.post('/api/passwordresettokens', async (request, reply) => {
    try {
      const passwordResetToken = new PasswordResetToken(request.body)
      let result = await passwordresettokensService.createPasswordResetToken(fastify.pg, passwordResetToken)
      ok(reply, result.rows[0], result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- UPDATE
  fastify.put('/api/passwordresettoken/:id', async (request, reply) => {
    try {
      let exists = await passwordresettokensService.getPasswordResetTokenById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const passwordResetToken = new PasswordResetToken({
          ...request.body,
          id: request.params.id
        })
        let result = await passwordresettokensService.updatePasswordResetToken(fastify.pg, passwordResetToken)
        ok(reply, result.rows[0], result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- DELETE
  fastify.delete('/api/passwordresettoken/:id', async (request, reply) => {
    try {
      let exists = await passwordresettokensService.getPasswordResetTokenById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const passwordResetToken = new PasswordResetToken(exists.rows[0])
        let result = await passwordresettokensService.deletePasswordResetToken(fastify.pg, passwordResetToken)
        ok(reply, result.rows, result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })
}
