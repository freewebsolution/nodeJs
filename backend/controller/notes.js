const notesRouter = require('express').Router()
const {json} = require('express')
const Note = require('../models/note')

//Recupera tutte le note

notesRouter.get('/', async (request, response) => {
    const notes = await Note.find({})
    response.json(notes)
})


//Recupera singola nota

notesRouter.get('/:id', async (request, response) => {

    const note = await Note.findById(request.params.id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

//elmina nota

notesRouter.delete('/:id', async (request, response) => {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()

})

// Aggiungi Nota
notesRouter.post('/', async (request, response) => {
    const body = request.body

    const nota = new Note({
        tema: body.tema,
        important: body.important || false,
        date: new Date,
        giorno: body.giorno,
        ora: body.ora,
    })

    const savedNote = await nota.save()
    response.json(savedNote)

})

notesRouter.put('/:id', async (request, response) => {
    const body = request.body
    const note = {
        tema: body.tema,
        important: body.important,
        date: new Date,
        giorno: body.giorno,
        ora: body.ora,
    }
    const updateNote = await note.findByIdAndUpdate(request.params.id, note, {new: true})
    response.json(updateNote)


})

module.exports = notesRouter
