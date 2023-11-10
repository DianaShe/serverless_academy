const Url = require("../model")
const HttpError = require("../utils/httpError")

const getShortUrl = async (req, res) => {
    const {url} = req.query
    const result = await Url.findOne({shortUrl: url})
    if (!result) {
        throw HttpError(404, "URL not found")
    }
    res.redirect(result.fullUrl)
}

module.exports = getShortUrl