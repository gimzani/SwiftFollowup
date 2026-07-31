/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */

import argon2 from 'argon2'

async function routes (fastify, options) {

  //-------------------------------------------------------- HELLO
  fastify.get('/api', async (request, reply) => {
    return { hello: 'world' }
  })
  
  //-------------------------------------------------------- Table cols
  fastify.get('/api/tablecols/:tablename', async (request, reply) => {
    let {rows} = await fastify.pg.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = $1
        AND table_schema = 'public'
      ORDER BY ordinal_position;
      `,
      [request.params.tablename]
    );

    let colNames = rows.map(item => item.column_name);
    return colNames
  })

  //-------------------------------------------------------- PWD Hash
  fastify.post('/api/hash', async (request, reply) => {
    const pwd = request.body.password;
    return await hashPassword(pwd);
  })
  
  //-------------------------------------------------------- PWD Hash
  fastify.post('/api/verify', async (request, reply) => {
    const pwd = request.body.password;
    return await argon2.verify(request.body.hash, pwd);
  })
  
  
}


//--------------------------------------------------
async function hashPassword(password) {
  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1
  })
}


//ESM
export default routes;