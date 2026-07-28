//---------------------------------------------------------------
import Qrcodetemplate from '@models/models/Qrcodetemplate'
import qrcodetemplatesService from './qrcodetemplatesService.js'
import { ok, serverError, notFound } from '../../utils/apiResponses.js'
//---------------------------------------------------------------
/**
 * Encapsulates the qrcodetemplates routes
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
export default async function routes (fastify) {

  //-------------------------------------------------------- LIST
  fastify.get('/api/qrcodetemplates', async (request, reply) => {
    try {
      let result = await qrcodetemplatesService.getAllQrcodetemplates(fastify.pg)
      ok(reply, result.rows, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- GET
  fastify.get('/api/qrcodetemplate/:id', async (request, reply) => {
    try {
      let result = await qrcodetemplatesService.getQrcodetemplateById(fastify.pg, request.params.id)
      ok(reply, result.rows[0] || null, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- CREATE
  fastify.post('/api/qrcodetemplates', async (request, reply) => {
    try {
      const qrcodetemplate = new Qrcodetemplate(request.body)
      let result = await qrcodetemplatesService.createQrcodetemplate(fastify.pg, qrcodetemplate)
      ok(reply, result.rows[0], result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- UPDATE
  fastify.put('/api/qrcodetemplate/:id', async (request, reply) => {
    try {
      let exists = await qrcodetemplatesService.getQrcodetemplateById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const qrcodetemplate = new Qrcodetemplate({
          ...request.body,
          id: request.params.id
        })
        let result = await qrcodetemplatesService.updateQrcodetemplate(fastify.pg, qrcodetemplate)
        ok(reply, result.rows[0], result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- DELETE
  fastify.delete('/api/qrcodetemplate/:id', async (request, reply) => {
    try {
      let exists = await qrcodetemplatesService.getQrcodetemplateById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const qrcodetemplate = new Qrcodetemplate(exists.rows[0])
        let result = await qrcodetemplatesService.deleteQrcodetemplate(fastify.pg, qrcodetemplate)
        ok(reply, result.rows, result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })
}