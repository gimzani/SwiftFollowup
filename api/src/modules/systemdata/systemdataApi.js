//---------------------------------------------------------------
import { ok, serverError, notFound } from '../../utils/apiResponses.js'
import { reqSchema } from './systemdataSchemas.js'
import { SystemData } from '@sf/models'
import systemdataService from './systemdataService.js'
//---------------------------------------------------------------
/**
 * Encapsulates the systemdata routes
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
export default async function routes (fastify) {

  //-------------------------------------------------------- LIST BY DATAKEY
  fastify.get('/api/systemdata/:key', async (request, reply) => {
    try {
      let result = await systemdataService.listByDatakey(fastify.pg, request.params.key)
      const array = result.rows.map((row) => new SystemData(row))
      ok(reply, array, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })
  //-------------------------------------------------------- CREATE
  fastify.post('/api/systemdata', async (request, reply) => {
    try {
      const systemdata = new SystemData(request.body)
      let result = await systemdataService.createSystemData(fastify.pg, systemdata)
      const item = result.rows.length === 1 ? new SystemData(result.rows[0]) : null
      ok(reply, item, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })
  //-------------------------------------------------------- UPDATE
  fastify.put('/api/systemdata/:id', async (request, reply) => {
    try {
      let exists = await systemdataService.getSystemDataById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const systemdata = new SystemData({
          ...request.body,
          id: request.params.id
        })
        let result = await systemdataService.updateSystemData(fastify.pg, systemdata)
        const item = result.rows.length === 1 ? new SystemData(result.rows[0]) : null
        ok(reply, item, result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })
  //-------------------------------------------------------- DELETE
  fastify.delete('/api/systemdata/:id', async (request, reply) => {
    try {
      let exists = await systemdataService.getSystemDataById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const systemdata = new SystemData(exists.rows[0])
        let result = await systemdataService.deleteSystemData(fastify.pg, systemdata)
        ok(reply, result.rows, result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })
}