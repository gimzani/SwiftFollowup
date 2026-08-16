//---------------------------------------------------------------
import { ok, serverError, notFound } from '../../utils/apiResponses.js'
import { ContentRequest } from '@sf/models'
import contentrequestsService from './contentrequestsService.js'
//---------------------------------------------------------------
/**
 * Encapsulates the contentrequests routes
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
export default async function routes (fastify) {

  //-------------------------------------------------------- LIST
  fastify.get('/api/contentrequests/:useraccount_id', async (request, reply) => {
    try {
      let result = await contentrequestsService.listMyContentrequests(fastify.pg, request.params.useraccount_id)
      const array = result.rows.map((row) => new ContentRequest(row))
      ok(reply, array, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- GET
  fastify.get('/api/contentrequest/:id', async (request, reply) => {
    try {
      let result = await contentrequestsService.getContentrequestById(fastify.pg, request.params.id)
      const item = result.rows.length === 1 ? new ContentRequest(result.rows[0]) : null
      ok(reply, item, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- CREATE
  fastify.post('/api/contentrequests', async (request, reply) => {
    try {
      const contentrequest = new ContentRequest(request.body)
      let result = await contentrequestsService.createContentrequest(fastify.pg, contentrequest)
      const item = result.rows.length === 1 ? new ContentRequest(result.rows[0]) : null
      ok(reply, item, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- UPDATE
  fastify.put('/api/contentrequest/:id', async (request, reply) => {
    try {
      let exists = await contentrequestsService.getContentrequestById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const contentrequest = new ContentRequest({
          ...request.body,
          id: request.params.id
        })
        let result = await contentrequestsService.updateContentrequest(fastify.pg, contentrequest)
        const item = result.rows.length === 1 ? new ContentRequest(result.rows[0]) : null
        ok(reply, item, result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- DELETE
  fastify.delete('/api/contentrequest/:id', async (request, reply) => {
    try {
      let exists = await contentrequestsService.getContentrequestById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const contentrequest = new ContentRequest(exists.rows[0])
        let result = await contentrequestsService.deleteContentrequest(fastify.pg, contentrequest)
        ok(reply, result.rows, result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })
}