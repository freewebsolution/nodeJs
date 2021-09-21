const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
//Recupera tutte le note

notesRouter.get('/',async (request, response) => {
    const note = await Note
        .find({}).populate('user', { username: 2, name: 2 })
    response.json(note)
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

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')){
        return authorization.substring(7)
    }
    return null
}

// Aggiungi Nota
notesRouter.post('/', async (request, response, next) => {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken.id){
        return response.status(401).json({error: 'token missiing or invalid'})
    }
    const user = await User.findById(decodedToken.id)
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