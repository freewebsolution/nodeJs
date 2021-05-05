const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    tema: {
        type: String,
        required: true,
        minlength: 5
    },
    date: Date,
    important: Boolean,
    giorno: Date,
    ora: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.__v
        delete returnedObject._id
    }
})

module.exports = mongoose.model('Note', noteSchema)