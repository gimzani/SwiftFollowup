//---------------------------------------------------------------
import ConfirmationCode from '@models/models/ConfirmationCode'
import confirmationcodesService from './confirmationcodesService.js'
import { ok, serverError, notFound } from '../../utils/apiResponses.js'
//---------------------------------------------------------------
/**
 * Encapsulates the confirmationcodes routes
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
export default async function routes (fastify) {

  //-------------------------------------------------------- LIST
  fastify.get('/api/confirmationcodes/:useraccount_id', async (request, reply) => {
    try {
      let result = await confirmationcodesService.getAllConfirmationcodes(fastify.pg, request.params.useraccount_id)
      ok(reply, result.rows, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- GET
  fastify.get('/api/confirmationcode/:code', async (request, reply) => {
    try {
      let result = await confirmationcodesService.getConfirmationcodeByCode(fastify.pg, request.params.code)
      ok(reply, result.rows[0] || null, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- CREATE
  fastify.post('/api/confirmationcodes', async (request, reply) => {
    try {
      const confirmationcode = new ConfirmationCode(request.body)
      let result = await confirmationcodesService.createConfirmationcode(fastify.pg, confirmationcode)
      ok(reply, result.rows[0], result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- UPDATE
  fastify.put('/api/confirmationcode/:code', async (request, reply) => {
    try {
      let exists = await confirmationcodesService.getConfirmationcodeByCode(fastify.pg, request.params.code)
      if(exists.rows.length===1) {
        const confirmationcode = new ConfirmationCode({
          ...request.body,
          code: request.params.code
        })
        let result = await confirmationcodesService.updateConfirmationcode(fastify.pg, confirmationcode)
        ok(reply, result.rows[0], result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- DELETE
  fastify.delete('/api/confirmationcode/:code', async (request, reply) => {
    try {
      let exists = await confirmationcodesService.getConfirmationcodeByCode(fastify.pg, request.params.code)
      if(exists.rows.length===1) {
        const confirmationcode = new ConfirmationCode(exists.rows[0])
        let result = await confirmationcodesService.deleteConfirmationcode(fastify.pg, confirmationcode)
        ok(reply, result.rows, result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })
}