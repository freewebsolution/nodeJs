const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Note = require('../models/note')

beforeEach(async () => {
    await Note.deleteMany({})
    const noteObject = helper.initialNotes
        .map(note => new Note(note))

    const promiseArray = noteObject.map(note => note.save())
    await Promise.all(promiseArray)

    // noteObject = new Note(helper.initialNotes[1])
    // await noteObject.save()
})
test('notes are returned as json', async () => {
    console.log('entered test')
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})
test('there are two notes', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(helper.initialNotes.length)
})

test('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(r => r.tema)
    expect(contents).toContain(
        'Appuntamento da ore 10:00 da Riccardo Compagnoni'
    )
})

test('a valid note can be added', async () => {
    const newNote = {
        tema: 'Riunione consiglio di classe a scuola di Giorgia',
        date: new Date(),
        important: false,
        giorno: '2021-05-13T22:00:00.000+00:00',
        ora: '17:45',
    }
    await api
        .post('/api/notes')
        .send(newNote)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.notesInDb()
    const contents = notesAtEnd.map(r => r.tema)
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)
    expect(contents).toContain(
        'Riunione consiglio di classe a scuola di Giorgia'
    )
})

test('note without content is not added', async () => {
    const newNote = {
        important: true
    }
    await api
        .post('/api/notes')
        .send(newNote)
        .expect(500)
    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
})

test('a specific note can be viewed', async () => {
    const notesAsStart = await helper.notesInDb()

    const noteToView = notesAsStart[0]
    const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    const processedNoteToView = JSON.parse(JSON.stringify(noteToView))
    expect(resultNote.body).toEqual(processedNoteToView)
})
test('a note can ben deleted', async () => {
    const notesAsStart = await helper.notesInDb()

    const noteToDelete = notesAsStart[0]
    await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)
    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(
        helper.initialNotes.length - 1
    )
    const contents = notesAtEnd.map(r => r.tema)
    expect(contents).not.toContain(noteToDelete.tema)
})

afterAll(() => {
    mongoose.connection.close()
})
