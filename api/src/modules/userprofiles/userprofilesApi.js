//---------------------------------------------------------------
import { UserProfile } from '@sf/models'
import userprofilesService from './userprofilesService.js'
import { ok, serverError, notFound } from '../../utils/apiResponses.js'
//---------------------------------------------------------------
/**
 * Encapsulates the userprofiles routes
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
export default async function routes (fastify) {

  //-------------------------------------------------------- GET
  fastify.get('/api/userprofile/:id', async (request, reply) => {
    try {
      let result = await userprofilesService.getUserProfileById(fastify.pg, request.params.id)
      const item = result.rows.length === 1 ? new UserProfile(result.rows[0]) : null
      ok(reply, item, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  })

  //-------------------------------------------------------- UPDATE
  fastify.put('/api/userprofile/:id', async (request, reply) => {
    try {
      let exists = await userprofilesService.getUserProfileById(fastify.pg, request.params.id)
      if(exists.rows.length===1) {
        const userProfile = new UserProfile({
          ...request.body,
          useraccount_id: request.params.id
        })
        let result = await userprofilesService.updateUserProfile(fastify.pg, userProfile)
        const item = result.rows.length === 1 ? new UserProfile(result.rows[0]) : null
        ok(reply, item, result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  })

}