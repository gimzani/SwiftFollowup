/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes (fastify, options) {
  fastify.get('/api', async (request, reply) => {
    return { hello: 'world' }
  })
  

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
  
  
}

//ESM
export default routes;