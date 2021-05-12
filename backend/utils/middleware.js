const logger = require('./logger')

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:', request.path)
    console.log('Body:', request.body)
    console.log('---')
    next()
}

const unknowEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknow endpoint' })
}

const errorHandler = (error, request, response, next) => {
    //console.error(error.message)
    if(error.name === 'CastError') {
        return response.status(404).send({error: 'malformatted id'})
    }
    next (error)
}

module.exports = {
    requestLogger,
    unknowEndpoint,
    errorHandler
}
