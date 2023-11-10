const ctrlWrapper = require('../utils/ctrlWrapper')
const addUrl = require('./addUrl')
const getShortUrl = require('./getShortUrl')

module.exports = {
    addUrl: ctrlWrapper(addUrl),
    getShortUrl: ctrlWrapper(getShortUrl)
}