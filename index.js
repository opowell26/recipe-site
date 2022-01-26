import express from 'express'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.get('/', (req, res) => res.send('Hello world!'))

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
