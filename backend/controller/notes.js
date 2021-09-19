const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
//Recupera tutte le note

notesRouter.get('/', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

//Recupera singola nota

notesRouter.get('/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(n => {
            if (n) {
                response.json(n)
            } else {
                response.status(404).end()
            }

        })
        .catch(error => next(error))
})

//elmina nota

notesRouter.delete('/:id', (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

// Aggiungi Nota
notesRouter.post('/',async (request, response,next) => {
    const body = request.body
    const user = await User.findById(body.userId)
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
        user: user._id
    })
    const savedNote = await nota.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    response.json(savedNote)

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
    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updateNote => {
            response.json(updateNote)
        })
        .catch(error => next(error))
})

module.exports = notesRouter