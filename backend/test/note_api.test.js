const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Note = require('../models/note')
const initialNotes = [
    {
        tema: 'HTML is easy',
        date: new Date(),
        important: false,
        giorno: '2021-03-29T22:00:00.000+00:00',
        ora: '15:00',
    },
    {
        tema: 'Appuntamento da ore 10:00 da Riccardo Compagnoni',
        date: new Date(),
        important: true,
        giorno: '2021-05-29T22:00:00.000+00:00',
        ora: '10:00',
    },
]
beforeEach(async () => {
    await Note.deleteMany({})
    let noteObject = new Note(initialNotes[0])
    await noteObject.save()
    noteObject = new Note(initialNotes[1])
    await noteObject.save()
})
test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})
test('there are two notes', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(initialNotes.length)
})

test('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(r =>r.tema)
    expect(contents).toContain(
        'Appuntamento da ore 10:00 da Riccardo Compagnoni'
    )
})

afterAll(() => {
    mongoose.connection.close()
})