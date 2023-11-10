const {Schema, model} = require('mongoose')

const urlSchema = new Schema({
    fullUrl: {
        type: String,
        required: [true, 'Set the url'],
      },
    shortUrl: {
        type: String,
      },
}, {versionKey: false})

const Url = model("url", urlSchema)

module.exports = Url