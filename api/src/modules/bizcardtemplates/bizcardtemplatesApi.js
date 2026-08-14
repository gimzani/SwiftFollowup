//---------------------------------------------------------------
import { BizCardTemplate } from '@sf/models'
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
      const array = result.rows.map((row) => new BizCardTemplate(row))
      ok(reply, array, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- GET
  fastify.get('/api/bizcardtemplate/:id', async (request, reply) => {
    try {
      let result = await bizcardtemplatesService.getBizcardtemplateById(fastify.pg, request.params.id)
      const item = result.rows.length === 1 ? new BizCardTemplate(result.rows[0]) : null
      ok(reply, item, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- CREATE
  fastify.post('/api/bizcardtemplates', async (request, reply) => {
    try {
      const bizcardtemplate = new BizCardTemplate(request.body)
      let result = await bizcardtemplatesService.createBizcardtemplate(fastify.pg, bizcardtemplate)
      const item = result.rows.length === 1 ? new BizCardTemplate(result.rows[0]) : null
      ok(reply, item, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- UPDATE
  fastify.put('/api/bizcardtemplate/:id', async (request, reply) => {
    try {
      let exists = await bizcardtemplatesService.getBizcardtemplateById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const bizcardtemplate = new BizCardTemplate({
          ...request.body,
          id: request.params.id
        })
        let result = await bizcardtemplatesService.updateBizcardtemplate(fastify.pg, bizcardtemplate)
        const item = result.rows.length === 1 ? new BizCardTemplate(result.rows[0]) : null
        ok(reply, item, result.rowCount)
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
        const bizcardtemplate = new BizCardTemplate(exists.rows[0])
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