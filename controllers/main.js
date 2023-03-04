
/**
 * Check username and password in post(login) request
 * if exist create new JWT
 * send it back from backend to frontend
 * setup authentication so only the request with JWT can access the dashboard
 * 
 * Structure of JWT : xxxx.yyyy.zzzz
 * xxx : Header -> Algorithm & Tokentype
 * yyy : Payload -> Data
 * zzz : Signature -> Verifying
 */

const { BadRequestError } = require('../errors/index')
const jwt = require('jsonwebtoken')

/**
 * It creates a user token and sends as a response along with the msg.
 */
const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    const id = new Date().getDate()
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })
    res.status(200).json({ msg: 'User Created', token })
}

/**
 * This function lets you get your lucky number only if authorization is 
 * ,which is verified by the middleware.
 */
const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100)

    res.status(200).json({
        msg: `Hello , ${req.user.username}`, secret: `Here is your authorized data , your lucky number is ${luckyNumber}`
    })
}

module.exports = {
    login, dashboard
}