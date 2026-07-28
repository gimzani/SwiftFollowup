//---------------------------------------------------------------
import { reqSchema } from './systemdataSchemas.js'
//---------------------------------------------------------------
/**
 * Encapsulates the systemdata routes
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function routes (fastify) {

  fastify.get('/api/systemdata/:key', async (request, reply) => {
    fastify.pg.query(
      'SELECT * FROM systemdata WHERE data_key=$1', [request.params.key],
      function onResult (err, result) {
        reply.send(err || result)
      }
    );
    return reply;
  })

}

export default routes;