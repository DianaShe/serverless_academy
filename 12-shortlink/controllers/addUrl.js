const { nanoid } = require("nanoid")
const Url = require("../model")

const BASE = 'shor.di/'

const addUrl = async(req, res) => {
    const {fullUrl} = req.body
    const shortUrl = BASE + nanoid(6)
    
    const result = await Url.create({fullUrl, shortUrl})
    
    res.status(201).json(result)
}

module.exports = addUrl