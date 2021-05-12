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

const nonExistingId = async () => {
    const note = new Note(
        {
            tema: 'willremovethissoon',
            date: new Date(),
            important: false,
            giorno: '2021-03-29T22:00:00.000+00:00',
            ora: '15:00',
        }
    )
    await note.save()
    await note.remove()

    return note._id.toString()
}
const notesInDb = async() => {
    const notes = await Note.find({})
    return notes.map(note =>note.toJSON())
}

module.exports = {
    initialNotes,
    nonExistingId,
    notesInDb
}
