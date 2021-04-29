const app = require('./app')
const http = require('http')
const config = ('./utils/config')
const logger = require('./utils/logger')
const server = http.createServer(app)
server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})
/*require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(express.static('build'))
app.use(cors())

const Note = require('./models/note')
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:', request.path)
    console.log('Body:', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)

// let notes = [
//     {
//         "tema": "prova",
//         "giorno": "2021-03-28T22:00:00.000Z",
//         "ora": "9.30",
//         "data": "2021-03-29T06:30:50.444Z",
//         "important": true,
//         "id": 5
//     },
//     {
//         "tema": "Revisione auto",
//         "giorno": "2021-03-30T22:00:00.000Z",
//         "ora": "9.30",
//         "data": "2021-03-29T06:38:19.116Z",
//         "important": true,
//         "id": 6
//     },
//     {
//         "tema": "Chiamare Andrea",
//         "giorno": "2021-03-29T22:00:00.000Z",
//         "ora": "09:49",
//         "data": "2021-03-29T06:47:47.520Z",
//         "important": true,
//         "id": 7
//     },
//     {
//         "tema": "partita juve",
//         "giorno": "2021-03-29T22:00:00.000Z",
//         "ora": "08:58",
//         "data": "2021-03-29T06:58:13.978Z",
//         "important": false,
//         "id": 8
//     },
//     {
//         "tema": "riunione a scuola",
//         "giorno": "2021-03-29T22:00:00.000Z",
//         "ora": "08:59",
//         "data": "2021-03-29T06:59:20.722Z",
//         "important": false,
//         "id": 9
//     },
//     {
//         "tema": "yyyyyy",
//         "giorno": "2021-03-29T22:00:00.000Z",
//         "ora": "09:01",
//         "data": "2021-03-29T07:01:40.009Z",
//         "important": true,
//         "id": 10
//     }
// ]

//Home page metodo GET
app.get('/', (request, response) => {
    response.send('<h1>Hello world!</h1>')
})

//Recupero tutte le risorse
app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

//Aggiunta nuove note

app.post('/api/notes',(request, response) => {
    const body = request.body
    if(!body.tema) {
        return response.status(404).json({
            error: 'Contenuto vuoto'
        })
    }
    const nota = new Note ({
        tema: body.tema,
        important: body.important || false,
        date: new Date(),
        giorno: body.giorno,
        ora:body.ora
    })
    nota.save().then(savedNote => {
        response.json(savedNote)
    })
})
//Recupero singola risorsa

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id).then(n => {
        if(n){
         response.json(n)   
        }else {
            response.status(404).end()
        }       
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response,next) => {
    Note.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body

    const note = {
        tema: body.tema,
        important: body.important,
        date: new Date(),
        giorno: body.giorno,
        ora: body.ora
    }

    Note.findByIdAndUpdate(request.params.id, note, {new:true})
    .then(updateNote => {
        response.json(updateNote)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({error:'unknown endpoint'})
}
app.use(unknownEndpoint)

const errorHandler = (error,request,response, next) => {
    console.error(error.message)
    if(error.name === 'CastError') {
        return response.status(400).send({error: 'Malformatted id'})
    }
    next(error)
}
app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)*/