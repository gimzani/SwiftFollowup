//---------------------------------------------------------------
import { Contact } from '@sf/models'
import contactsService from './contactsService.js'
import { ok, serverError, notFound } from '../../utils/apiResponses.js'
//---------------------------------------------------------------
/**
 * Encapsulates the contacts routes
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
export default async function routes (fastify) {

  //-------------------------------------------------------- LIST
  fastify.get('/api/contacts/:useraccount_id', async (request, reply) => {
    try {
      let result = await contactsService.getAllContacts(fastify.pg, request.params.useraccount_id)
      ok(reply, result.rows, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- GET
  fastify.get('/api/contact/:id', async (request, reply) => {
    try {
      let result = await contactsService.getContactById(fastify.pg, request.params.id)
      ok(reply, result.rows[0] || null, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- CREATE
  fastify.post('/api/contacts', async (request, reply) => {
    try {
      const contact = new Contact(request.body)
      let result = await contactsService.createContact(fastify.pg, contact)
      ok(reply, result.rows[0], result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- UPDATE
  fastify.put('/api/contact/:id', async (request, reply) => {
    try {
      let exists = await contactsService.getContactById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const contact = new Contact({
          ...request.body,
          id: request.params.id
        })
        let result = await contactsService.updateContact(fastify.pg, contact)
        ok(reply, result.rows[0], result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- DELETE
  fastify.delete('/api/contact/:id', async (request, reply) => {
    try {
      let exists = await contactsService.getContactById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const contact = new Contact(exists.rows[0])
        let result = await contactsService.deleteContact(fastify.pg, contact)
        ok(reply, result.rows, result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })
}