//---------------------------------------------------------------
import Bizcard from '@models/models/Bizcard'
import bizcardsService from './bizcardsService.js'
import { ok, serverError, notFound } from '../../utils/apiResponses.js'
//---------------------------------------------------------------
/**
 * Encapsulates the bizcards routes
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
export default async function routes (fastify) {

  //-------------------------------------------------------- LIST
  fastify.get('/api/bizcards/:useraccount_id', async (request, reply) => {
    try {
      let result = await bizcardsService.getAllBizcards(fastify.pg, request.params.useraccount_id)
      ok(reply, result.rows, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- GET
  fastify.get('/api/bizcard/:id', async (request, reply) => {
    try {
      let result = await bizcardsService.getBizcardById(fastify.pg, request.params.id)
      ok(reply, result.rows[0] || null, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- CREATE
  fastify.post('/api/bizcards', async (request, reply) => {
    try {
      const bizcard = new Bizcard(request.body)
      let result = await bizcardsService.createBizcard(fastify.pg, bizcard)
      ok(reply, result.rows[0], result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- UPDATE
  fastify.put('/api/bizcard/:id', async (request, reply) => {
    try {
      let exists = await bizcardsService.getBizcardById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const bizcard = new Bizcard({
          ...request.body,
          id: request.params.id
        })
        let result = await bizcardsService.updateBizcard(fastify.pg, bizcard)
        ok(reply, result.rows[0], result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- DELETE
  fastify.delete('/api/bizcard/:id', async (request, reply) => {
    try {
      let exists = await bizcardsService.getBizcardById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const bizcard = new Bizcard(exists.rows[0])
        let result = await bizcardsService.deleteBizcard(fastify.pg, bizcard)
        ok(reply, result.rows, result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })
}
