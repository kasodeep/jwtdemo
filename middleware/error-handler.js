const { CustomApiError } = require('../errors/index')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = async (err, req, res, next) => {
    if (err instanceof CustomApiError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong try again later' })
}

module.exports = errorHandlerMiddleware