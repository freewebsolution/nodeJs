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

app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id)
    .then(n => {
        response.json(n)
    })
})

//elmina nota

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.filter(note => note.id !== id)
    response.status(204).end()
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

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
