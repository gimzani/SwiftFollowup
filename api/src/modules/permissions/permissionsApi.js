//---------------------------------------------------------------
import { Permission } from '@sf/models'
import permissionsService from './permissionsService.js'
import { ok, serverError, notFound } from '../../utils/apiResponses.js'
//---------------------------------------------------------------
/**
 * Encapsulates the permissions routes
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
export default async function routes (fastify) {

  //-------------------------------------------------------- LIST
  fastify.get('/api/permissions', async (request, reply) => {
    try {
      let result = await permissionsService.getAllPermissions(fastify.pg)
      ok(reply, result.rows, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- GET
  fastify.get('/api/permission/:permission_name', async (request, reply) => {
    try {
      let result = await permissionsService.getPermissionByName(fastify.pg, request.params.permission_name)
      ok(reply, result.rows[0] || null, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- CREATE
  fastify.post('/api/permissions', async (request, reply) => {
    try {
      const permission = new Permission(request.body)
      let result = await permissionsService.createPermission(fastify.pg, permission)
      ok(reply, result.rows[0], result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- UPDATE
  fastify.put('/api/permission/:permission_name', async (request, reply) => {
    try {
      let exists = await permissionsService.getPermissionByName(fastify.pg, request.params.permission_name)
      if(exists.rows.length===1) {
        const permission = new Permission({
          ...request.body,
          permission_name: request.params.permission_name
        })
        let result = await permissionsService.updatePermission(fastify.pg, permission)
        ok(reply, result.rows[0], result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- DELETE
  fastify.delete('/api/permission/:permission_name', async (request, reply) => {
    try {
      let exists = await permissionsService.getPermissionByName(fastify.pg, request.params.permission_name)
      if(exists.rows.length===1) {
        const permission = new Permission(exists.rows[0])
        let result = await permissionsService.deletePermission(fastify.pg, permission)
        ok(reply, result.rows, result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })
}
