//--------------------------------------------------------
import AppResult from '@models/models/AppResult'
//--------------------------------------------------------
export function handleDbError(err, reply) {
  const result = new AppResult()
  if (err.code === '23505') {
    result.setFailure('Duplicate entry');
    return reply.code(409).send(result)
  }
  fastify.log.error(err)
  result.setFailure('Unexpected database error');
  return reply.code(500).send(result)
}