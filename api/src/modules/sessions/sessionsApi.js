//---------------------------------------------------------------
import { Session } from '@sf/models'
import sessionsService from './sessionsService.js'
import { ok, serverError, notFound } from '../../utils/apiResponses.js'
//---------------------------------------------------------------
/**
 * Encapsulates the sessions routes
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
export default async function routes (fastify) {

  //-------------------------------------------------------- LIST
  fastify.get('/api/sessions/:useraccount_id', async (request, reply) => {
    try {
      let result = await sessionsService.getAllSessions(fastify.pg, request.params.useraccount_id)
      const array = result.rows.map((row) => new Session(row))
      ok(reply, array, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- GET
  fastify.get('/api/session/:id', async (request, reply) => {
    try {
      let result = await sessionsService.getSessionById(fastify.pg, request.params.id)
      const item = result.rows.length === 1 ? new Session(result.rows[0]) : null
      ok(reply, item, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- CREATE
  fastify.post('/api/sessions', async (request, reply) => {
    try {
      const session = new Session(request.body)
      let result = await sessionsService.createSession(fastify.pg, session)
      const item = result.rows.length === 1 ? new Session(result.rows[0]) : null
      ok(reply, item, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- UPDATE
  fastify.put('/api/session/:id', async (request, reply) => {
    try {
      let exists = await sessionsService.getSessionById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const session = new Session({
          ...request.body,
          id: request.params.id
        })
        let result = await sessionsService.updateSession(fastify.pg, session)
        const item = result.rows.length === 1 ? new Session(result.rows[0]) : null
        ok(reply, item, result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- DELETE
  fastify.delete('/api/session/:id', async (request, reply) => {
    try {
      let exists = await sessionsService.getSessionById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const session = new Session(exists.rows[0])
        let result = await sessionsService.deleteSession(fastify.pg, session)
        const item = result.rows.length === 1 ? new Session(result.rows[0]) : null
        ok(reply, item, result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })
}
