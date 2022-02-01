import 'dotenv/config'
import Fastify from 'fastify'
import { recipeRoute } from './src/routes/recipe'

const port = process.env.PORT || 3000

const fastify = Fastify({
  logger: true,
})

fastify.get('/', async () => {
  return { hello: 'world' }
})

fastify.register(recipeRoute, { prefix: '/api' })

const start = async () => {
  try {
    await fastify.listen(port)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
