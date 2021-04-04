const express = require('express')
const app = express();
app.use(express.json())
const cors = require('cors')
app.use(express.static('build'))
app.use(cors())
//Middleware
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:', request.path)
    console.log('Body:', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)


let notes = [
    {
        "tema": "partita juve",
        "giorno": "2021-04-06T22:00:00.000Z",
        "ora": "18:45",
        "data": "2021-03-23T17:41:56.622Z",
        "important": true,
        "id": 1
    },
    {
        "id": 2,
        "tema": "chiamare andrea",
        "giorno": "2021-03-25T23:00:00.000Z",
        "ora": "19:45",
        "data": "2021-03-23T17:42:19.802Z",
        "important": false
    },
    {
        "tema": "partita juve",
        "giorno": "2021-03-26T23:00:00.000Z",
        "ora": "18:45",
        "data": "2021-03-23T17:56:32.768Z",
        "important": false,
        "id": 3
    },
    {
        "tema": "revisione auto",
        "giorno": "2021-03-27T23:00:00.000Z",
        "ora": "09:30",
        "data": "2021-03-23T17:57:46.886Z",
        "important": true,
        "id": 4
    },
    {
        "tema": "Riunione a scuola",
        "giorno": "2021-03-29T22:00:00.000Z",
        "ora": "15:30",
        "data": "2021-03-23T18:00:05.238Z",
        "important": true,
        "id": 5
    }
]

//Home page
app.get('/', (request, response) => {
    response.send('<h1>Hello world!</h1>')
})
//Recupera tutte le note
app.get('/api/notes', (request, response) => {
    response.json(notes)
})

//Recupera singola nota

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }

})

//elmina nota

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.filter(note => note.id !== id)
    response.status(204).end()
})

// Aggiungi Nota
const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id)) : 0
    return maxId + 1
}
app.post('/api/notes', (request, response) => {
    const body = request.body
    if (!body.tema) {
        return response.status(404).json({
            error: 'Contenuto vuoto'
        })
    }
    const nota = {
        tema: body.tema,
        important: body.important,
        date: new Date,
        giorno: body.giorno,
        ora: body.ora,
        id: generateId()
    }
    notes = notes.concat(nota)
    console.log(nota)
    response.json(nota)
})
const unknowEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknow endpoint' })
}
app.use(unknowEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)