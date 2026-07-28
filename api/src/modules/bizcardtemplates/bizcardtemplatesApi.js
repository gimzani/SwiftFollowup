//---------------------------------------------------------------
import Bizcardtemplate from '@models/models/Bizcardtemplate'
import bizcardtemplatesService from './bizcardtemplatesService.js'
import { ok, serverError, notFound } from '../../utils/apiResponses.js'
//---------------------------------------------------------------
/**
 * Encapsulates the bizcardtemplates routes
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
export default async function routes (fastify) {

  //-------------------------------------------------------- LIST
  fastify.get('/api/bizcardtemplates', async (request, reply) => {
    try {
      let result = await bizcardtemplatesService.getAllBizcardtemplates(fastify.pg)
      ok(reply, result.rows, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- GET
  fastify.get('/api/bizcardtemplate/:id', async (request, reply) => {
    try {
      let result = await bizcardtemplatesService.getBizcardtemplateById(fastify.pg, request.params.id)
      ok(reply, result.rows[0] || null, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- CREATE
  fastify.post('/api/bizcardtemplates', async (request, reply) => {
    try {
      const bizcardtemplate = new Bizcardtemplate(request.body)
      let result = await bizcardtemplatesService.createBizcardtemplate(fastify.pg, bizcardtemplate)
      ok(reply, result.rows[0], result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- UPDATE
  fastify.put('/api/bizcardtemplate/:id', async (request, reply) => {
    try {
      let exists = await bizcardtemplatesService.getBizcardtemplateById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const bizcardtemplate = new Bizcardtemplate({
          ...request.body,
          id: request.params.id
        })
        let result = await bizcardtemplatesService.updateBizcardtemplate(fastify.pg, bizcardtemplate)
        ok(reply, result.rows[0], result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- DELETE
  fastify.delete('/api/bizcardtemplate/:id', async (request, reply) => {
    try {
      let exists = await bizcardtemplatesService.getBizcardtemplateById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const bizcardtemplate = new Bizcardtemplate(exists.rows[0])
        let result = await bizcardtemplatesService.deleteBizcardtemplate(fastify.pg, bizcardtemplate)
        ok(reply, result.rows, result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })
}