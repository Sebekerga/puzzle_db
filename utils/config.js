require('dotenv').config()
const logger = require('./logger')

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test' ?
    process.env.TEST_MONGODB_URI : process.env.MONGODB_URI
const SECRET = process.env.SECRET
const CODE = process.env.CODE

logger.info('env vars: ', PORT, MONGODB_URI)

module.exports = {
    MONGODB_URI,
    PORT,
    CODE,
    SECRET
}