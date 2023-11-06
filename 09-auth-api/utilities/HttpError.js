const HttpError = (status, message, success) => {
    const error = new Error(message)
    error.status = status
    error.success = success
    return error
}

module.exports = HttpError