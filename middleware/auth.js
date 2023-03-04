const { UnauthenticatedError } = require('../errors/index')
const jwt = require('jsonwebtoken')

const authenticationMiddleware = async (req, res, next) => {

    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('No Token provided')
    }
    const token = authHeader.split(' ')[1]

    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { id, username } = decoded
        req.user = { id, username }
        next()

    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route')
    }
}

module.exports = authenticationMiddleware