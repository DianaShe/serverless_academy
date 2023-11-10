const mongoose = require('mongoose')

const app = require('./app')

const {DB_URL} = process.env

mongoose.set('strictQuery', true)

mongoose.connect(DB_URL).then(() => {
  app.listen(3000, () => {
    console.log("Database connection successful")
  })
}).catch((error) => {
  console.log(error.message)
  process.exit(1)
})