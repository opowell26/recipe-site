import { connect, connection } from 'mongoose'

const env = process.env
const MONGODB_URL = process.env.MONGODB_URL

try {
  connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
} catch (error) {
  console.error(error)
}

connection.on('error', (err) => {
  console.error(err)
})

const db = connection
export default db
