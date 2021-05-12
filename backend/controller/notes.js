const notesRouter = require('express').Router()
const {json} = require('express')
const Note = require('../models/note')

//Recupera tutte le note

notesRouter.get('/', async (request, response) => {
    const notes = await Note.find({})
    response.json(notes)
})


//Recupera singola nota

notesRouter.get('/:id', async (request, response, next) => {
    try {
        const note = await Note.findById(request.params.id)
        if (note) {
            response.json(note)
        } else {
            response.status(404).end()
        }
    } catch (exception) {
        next(exception)
    }
})

//elmina nota

notesRouter.delete('/:id', async (request, response, next) => {
    try{
        await Note.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }catch(exception){
        next(exception)
    }
})

// Aggiungi Nota
notesRouter.post('/', async (request, response, next) => {
    const body = request.body

    const nota = new Note({
        tema: body.tema,
        important: body.important || false,
        date: new Date,
        giorno: body.giorno,
        ora: body.ora,
    })
    try {
        const savedNote = await nota.save()
        response.json(savedNote)
    } catch (exception) {
        next(exception)
    }
})

notesRouter.put('/:id', (request, response, next) => {
    const body = request.body
    const note = {
        tema: body.tema,
        important: body.important,
        date: new Date,
        giorno: body.giorno,
        ora: body.ora,
    }
    Note.findByIdAndUpdate(request.params.id, note, {new: true})
        .then(updateNote => {
            response.json(updateNote)
        })
        .catch(error => next(error))
})

module.exports = notesRouter
