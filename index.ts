import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { getJsonLDfromURL } from './src/utils/jsonldScraper'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.get('/', (_, res) => res.send('Hello world!'))
app.get('/recipe/', async (req, res) => {
  // shitty tests
  try {
    await getJsonLDfromURL('https://www.justonecookbook.com/japanese-mayonnaise/')
    await getJsonLDfromURL('https://tasty.co/recipe/pizza-dough')
    await getJsonLDfromURL('https://www.allrecipes.com/recipe/281782/delicious-meatless-baked-ziti/')
    await getJsonLDfromURL('https://pinchofyum.com/the-best-soft-chocolate-chip-cookies')
    await getJsonLDfromURL('https://www.typescriptlang.org/docs/handbook/2/objects.html')
  } catch (err) {
    console.error(err)
    res.send('error!')
  }
  res.send('good')
})

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  console.error(err.message, err.stack)
  res.status(statusCode).json({ message: err.message })
  return
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
