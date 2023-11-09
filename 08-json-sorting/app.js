const express = require('express')
const path = require('path')
const cors = require('cors')
const fs = require('fs/promises')
const pathTo = path.resolve(__dirname, "data.json")

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    const result = await fs.readFile(pathTo, 'utf8');
    res.json(result);
})

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const {status = 500, message = "Internal server error"} = err
  res.status(status).json({ message })
})

module.exports = app
// app.listen(3000, () => {
//     console.log("Server running. Use our API on port: 3000")
//   })