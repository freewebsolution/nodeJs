const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
console.log('connection to ',url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(result => {
    console.log('connected to MongoDb')
})
.catch((error) => {
    console.log('error connection to MongoDb: ',error.message)
})

const noteSchema = new mongoose.Schema({
    tema: String,
    date: Date,
    important: Boolean,
    giorno: Date,
    ora: String
})
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.__v
        delete returnedObject._id
    }
})
module.exports = mongoose.model('Note',noteSchema)