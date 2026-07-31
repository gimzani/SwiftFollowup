//---------------------------------------------------------------
import Fastify from 'fastify'
import fastifyEnv  from '@fastify/env'
import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors';
//---------------------------------------------------------------
import { envOptions } from './server.config.js'
import { initializeRoutes } from './router.js'
//---------------------------------------------------------------
import postgresDb from './services/postgresService.js'
import authPlugin from './services/authenticationService.js'
//---------------------------------------------------------------
const fastify = Fastify({ logger: true })
//---------------------------------------------------------------
await fastify.register(fastifyEnv, envOptions)
//---------------------------------------------------------------
await fastify.register(fastifyCookie)
await fastify.register(postgresDb)
await fastify.register(authPlugin)
await fastify.register(cors, {
  origin: 'http://localhost:2565',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
});
//---------------------------------------------------------------
initializeRoutes(fastify);
//---------------------------------------------------------------
// Run the server!
//---------------------------------------------------------------
async function start()  {
  try {
    await fastify.listen({ port: fastify.config.PORT })
    fastify.log.info(`Server running on port ${fastify.config.PORT}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
//---------------------------------------------------------------
// Graceful shutdown
//---------------------------------------------------------------
async function shutdown(signal) {
  fastify.log.info(`Received ${signal}. Closing app...`)

  try {
    await fastify.close() // 🔥 THIS is what frees the port
    fastify.log.info('Server closed cleanly')
    process.exit(0)
  } catch (err) {
    fastify.log.error('Error during shutdown', err)
    process.exit(1)
  }
}
//---------------------------------------------------------------
// Signals (THIS is what you're missing)
//---------------------------------------------------------------
process.on('SIGINT', shutdown)   // Ctrl+C
process.on('SIGTERM', shutdown)  // system kill

// 👇 CRITICAL: nodemon restart handling
process.on('SIGUSR2', async () => {
  await shutdown('SIGUSR2')
  process.kill(process.pid, 'SIGUSR2') // hand back to nodemon
})

//---------------------------------------------------------------
start()