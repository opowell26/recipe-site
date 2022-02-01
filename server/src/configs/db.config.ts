import { connect, connection } from 'mongoose'

const MONGODB_URL = process.env.MONGODB_URL

try {
  connect(MONGODB_URL)
} catch (error) {
  console.error(error)
} finally {
  console.log('connected to MongoDB Atlas')
}

connection.on('error', (err) => {
  console.error(err)
})

const db = connection
export default db
