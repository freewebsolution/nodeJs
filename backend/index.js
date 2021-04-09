require('dotenv').config()
const express = require('express')
const app = express();
app.use(express.json())
const cors = require('cors')
app.use(express.static('build'))
app.use(cors())
const Note = require('./models/note')
//Middleware
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:', request.path)
    console.log('Body:', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)

//Home page
app.get('/', (request, response) => {
    response.send('<h1>Hello world!</h1>')
})
//Recupera tutte le note
app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })

})

//Recupera singola nota

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
    .then(n => {
        if(n){
               response.json(n)   
        }else {
            response.status(404).end()
        }
  
    })
    .catch(error => next(error))
})

//elmina nota

app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

// Aggiungi Nota
app.post('/api/notes', (request, response) => {
    const body = request.body
    if (!body.tema) {
        return response.status(404).json({
            error: 'Contenuto vuoto'
        })
    }
    const nota = new Note({
        tema: body.tema,
        important: body.important || false,
        date: new Date,
        giorno: body.giorno,
        ora: body.ora,
    })
    nota.save().then(savedNote => {
        response.json(savedNote)
    })
})

const unknowEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknow endpoint' })
}
app.use(unknowEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if(error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    }
    next (error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
