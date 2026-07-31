//---------------------------------------------------------------
import { ContactRequest } from '@sf/models'
import contactrequestsService from './contactrequestsService.js'
import { ok, serverError, notFound } from '../../utils/apiResponses.js'
//---------------------------------------------------------------
/**
 * Encapsulates the contactrequests routes
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
export default async function routes (fastify) {

  //-------------------------------------------------------- LIST
  fastify.get('/api/contactrequests/:useraccount_id', async (request, reply) => {
    try {
      let result = await contactrequestsService.getAllContactrequests(fastify.pg, request.params.useraccount_id)
      ok(reply, result.rows, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- GET
  fastify.get('/api/contactrequest/:id', async (request, reply) => {
    try {
      let result = await contactrequestsService.getContactrequestById(fastify.pg, request.params.id)
      ok(reply, result.rows[0] || null, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- CREATE
  fastify.post('/api/contactrequests', async (request, reply) => {
    try {
      const contactrequest = new ContactRequest(request.body)
      let result = await contactrequestsService.createContactrequest(fastify.pg, contactrequest)
      ok(reply, result.rows[0], result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- UPDATE
  fastify.put('/api/contactrequest/:id', async (request, reply) => {
    try {
      let exists = await contactrequestsService.getContactrequestById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const contactrequest = new ContactRequest({
          ...request.body,
          id: request.params.id
        })
        let result = await contactrequestsService.updateContactrequest(fastify.pg, contactrequest)
        ok(reply, result.rows[0], result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- DELETE
  fastify.delete('/api/contactrequest/:id', async (request, reply) => {
    try {
      let exists = await contactrequestsService.getContactrequestById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const contactrequest = new ContactRequest(exists.rows[0])
        let result = await contactrequestsService.deleteContactrequest(fastify.pg, contactrequest)
        ok(reply, result.rows, result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })
}