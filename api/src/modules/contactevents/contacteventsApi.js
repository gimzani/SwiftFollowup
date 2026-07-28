//---------------------------------------------------------------
import ContactEvent from '@models/models/ContactEvent'
import contacteventsService from './contacteventsService.js'
import { ok, serverError, notFound } from '../../utils/apiResponses.js'
//---------------------------------------------------------------
/**
 * Encapsulates the contactevents routes
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
export default async function routes (fastify) {

  //-------------------------------------------------------- LIST
  fastify.get('/api/contactevents/:contact_id', async (request, reply) => {
    try {
      let result = await contacteventsService.getAllContactevents(fastify.pg, request.params.contact_id)
      ok(reply, result.rows, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- GET
  fastify.get('/api/contactevent/:id', async (request, reply) => {
    try {
      let result = await contacteventsService.getContacteventById(fastify.pg, request.params.id)
      ok(reply, result.rows[0] || null, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- CREATE
  fastify.post('/api/contactevents', async (request, reply) => {
    try {
      const contactevent = new ContactEvent(request.body)
      let result = await contacteventsService.createContactevent(fastify.pg, contactevent)
      ok(reply, result.rows[0], result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- UPDATE
  fastify.put('/api/contactevent/:id', async (request, reply) => {
    try {
      let exists = await contacteventsService.getContacteventById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const contactevent = new ContactEvent({
          ...request.body,
          id: request.params.id
        })
        let result = await contacteventsService.updateContactevent(fastify.pg, contactevent)
        ok(reply, result.rows[0], result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- DELETE
  fastify.delete('/api/contactevent/:id', async (request, reply) => {
    try {
      let exists = await contacteventsService.getContacteventById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const contactevent = new ContactEvent(exists.rows[0])
        let result = await contacteventsService.deleteContactevent(fastify.pg, contactevent)
        ok(reply, result.rows, result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })
}