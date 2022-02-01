import { FastifyReply, FastifyRequest } from 'fastify'
import { getRecipeFromUrl } from '../utils/jsonldScraper'

const get = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    await getRecipeFromUrl('https://www.justonecookbook.com/japanese-mayonnaise/')
    await getRecipeFromUrl('https://tasty.co/recipe/pizza-dough/')
    await getRecipeFromUrl('https://www.allrecipes.com/recipe/281782/delicious-meatless-baked-ziti/')
    await getRecipeFromUrl('https://pinchofyum.com/the-best-soft-chocolate-chip-cookies')
    // recipe with HowToSection
    const recipe = await getRecipeFromUrl('https://leitesculinaria.com/7759/recipes-pasteis-de-nata.html')
    reply.code(200).send(recipe)
  } catch (err) {
    reply.code(500).send(err)
  }
}

const getAll = async (req: FastifyRequest, reply: FastifyReply) => {
  reply.code(500).send('not implimented yet')
}

const create = async (req: FastifyRequest, reply: FastifyReply) => {
  reply.code(500).send('not implimented yet')
}

export { get, getAll, create }
