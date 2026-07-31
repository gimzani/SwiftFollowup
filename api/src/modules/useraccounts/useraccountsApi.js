//---------------------------------------------------------------
import { UserAccount } from '@sf/models'
import useraccountsService from './useraccountsService.js'
import { ok, serverError, notFound } from '../../utils/apiResponses.js'
//---------------------------------------------------------------
/**
 * Encapsulates the useraccounts routes
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
export default async function routes (fastify) {

  //-------------------------------------------------------- LIST
  fastify.get('/api/useraccounts', async (request, reply) => {
    try {
      let result = await useraccountsService.getAllUserAccounts(fastify.pg)
      ok(reply, result.rows, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- GET
  fastify.get('/api/useraccount/:id', async (request, reply) => {
    try {
      let result = await useraccountsService.getUserAccountById(fastify.pg, request.params.id)
      ok(reply, result.rows[0] || null, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- CREATE
  fastify.post('/api/useraccounts', async (request, reply) => {
    try {
      const userAccount = new UserAccount(request.body)
      let result = await useraccountsService.createUserAccount(fastify.pg, userAccount)
      ok(reply, result.rows[0], result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- UPDATE
  fastify.put('/api/useraccount/:id', async (request, reply) => {
    try {
      let exists = await useraccountsService.getUserAccountById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const userAccount = new UserAccount({
          ...request.body,
          id: request.params.id
        })
        let result = await useraccountsService.updateUserAccount(fastify.pg, userAccount)
        ok(reply, result.rows[0], result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- DELETE
  fastify.delete('/api/useraccount/:id', async (request, reply) => {
    try {
      let exists = await useraccountsService.getUserAccountById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const userAccount = new UserAccount(exists.rows[0])
        let result = await useraccountsService.deleteUserAccount(fastify.pg, userAccount)
        ok(reply, result.rows, result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })
}
