import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { get, getAll, create } from '../controllers/recipe'

const recipeRoute = async (fastify: FastifyInstance, opts: FastifyPluginOptions) => {
  fastify.get('/recipes', get)
  fastify.get('/recipes/:id', getAll)
  fastify.post('/recipes', create)
}

export { recipeRoute }
