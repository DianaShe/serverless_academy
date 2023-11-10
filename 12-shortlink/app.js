const express = require('express')
const cors = require('cors')
const { addUrl, getShortUrl } = require('./controllers')
const validateUrl = require('./middlewares/validateUrl')
const urlSchema = require('./schema')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', getShortUrl)
app.post('/', validateUrl(urlSchema), addUrl)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const {status = 500, message = "Internal server error"} = err
  res.status(status).json({ message })
})

module.exports = app