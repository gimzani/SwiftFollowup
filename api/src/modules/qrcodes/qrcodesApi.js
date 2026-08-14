//---------------------------------------------------------------
import { QrCode } from '@sf/models'
import qrcodesService from './qrcodesService.js'
import { ok, serverError, notFound } from '../../utils/apiResponses.js'
//---------------------------------------------------------------
/**
 * Encapsulates the qrcodes routes
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
export default async function routes (fastify) {

  //-------------------------------------------------------- LIST
  fastify.get('/api/qrcodes/:useraccount_id', async (request, reply) => {
    try {
      let result = await qrcodesService.getQrcodes(fastify.pg, request.params.useraccount_id)
      const array = result.rows.map((row) => new QrCode(row))
      ok(reply, array, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })
  //-------------------------------------------------------- GET
  fastify.get('/api/qrcode/:id', async (request, reply) => {
    try {
      let result = await qrcodesService.getQrcodeById(fastify.pg, request.params.id)
      const item = result.rows.length === 1 ? new QrCode(result.rows[0]) : null
      ok(reply, item, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })
  //-------------------------------------------------------- GET BY CODE
  fastify.get('/api/qrcode/code/:code', async (request, reply) => {
    try {
      let result = await qrcodesService.getQrcodeByCode(fastify.pg, request.params.code)
      const item = result.rows.length === 1 ? new QrCode(result.rows[0]) : null
      ok(reply, item, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })
  //-------------------------------------------------------- CREATE
  fastify.post('/api/qrcodes', async (request, reply) => {
    try {
      const qrcode = new QrCode(request.body)
      let result = await qrcodesService.createQrcode(fastify.pg, qrcode)
      const item = result.rows.length === 1 ? new QrCode(result.rows[0]) : null
      ok(reply, item, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- UPDATE
  fastify.put('/api/qrcode/:id', async (request, reply) => {
    try {
      let exists = await qrcodesService.getQrcodeById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const qrcode = new QrCode({
          ...request.body,
          id: request.params.id
        })
        let result = await qrcodesService.updateQrcode(fastify.pg, qrcode)
        const item = result.rows.length === 1 ? new QrCode(result.rows[0]) : null
        ok(reply, item, result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- DELETE
  fastify.delete('/api/qrcode/:id', async (request, reply) => {
    try {
      let exists = await qrcodesService.getQrcodeById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const qrcode = new QrCode(exists.rows[0])
        let result = await qrcodesService.deleteQrcode(fastify.pg, qrcode)
        ok(reply, result.rows, result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })
}
