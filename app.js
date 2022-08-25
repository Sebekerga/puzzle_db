const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')

// routers
const nonogramsRouter = require('./routers/nonograms')

// middlewares
const middlewares = require('./utils/middlewares')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(middlewares.tokenExtractor)
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middlewares.requestLogger)

app.use('/api/non',   nonogramsRouter)

app.use(middlewares.unknownEndpoint)
app.use(middlewares.errorHandler)

module.exports = app