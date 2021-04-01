const express = require ('express')
const app = express();
const notes = [
    {
        "tema": "partita juve",
        "giorno": "2021-04-06T22:00:00.000Z",
        "ora": "18:45",
        "data": "2021-03-23T17:41:56.622Z",
        "important": true,
        "id": 1
    },
    {
        "tema": "chiamare andrea",
        "giorno": "2021-03-25T23:00:00.000Z",
        "ora": "19:45",
        "data": "2021-03-23T17:42:19.802Z",
        "important": false,
        "id": 2
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
app.get('/',(request,response) => {
    response.send('<h1>Hello world!</h1>')
})
//Recupera tutte le note
app.get('/api/notes', (request, response) => {
    response.json(notes)
})

//Recupera singola nota

app.get('/api/note/:id',(request,response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)
    console.log(note)
    response.json(note)
})
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)