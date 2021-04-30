const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controller/notes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('Connecting to MongoDb', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(result => {
    console.log('connected to MongoDb')
})
.catch((error) => {
    console.log('error connection to MongoDb: ',error.message)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app