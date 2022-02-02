import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { getRecipeFromUrl } from './src/utils/jsonldScraper'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.get('/', (_, res) => res.send('Hello world!'))
app.get('/recipe/', async (req, res) => {
  let recipe
  // shitty tests
  try {
    await getRecipeFromUrl('https://www.justonecookbook.com/japanese-mayonnaise/')
    await getRecipeFromUrl('https://tasty.co/recipe/pizza-dough/')
    await getRecipeFromUrl('https://www.allrecipes.com/recipe/281782/delicious-meatless-baked-ziti/')
    await getRecipeFromUrl('https://pinchofyum.com/the-best-soft-chocolate-chip-cookies')
    // recipe with HowToSection
    recipe = await getRecipeFromUrl('https://leitesculinaria.com/7759/recipes-pasteis-de-nata.html')
  } catch (err) {
    console.error(err)
    res.send('error!')
  }
  res.json(recipe)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
