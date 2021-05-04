const mongoose = require('mongoose')
if(process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}
const password = process.argv[2]

const url = `mongodb+srv://lucioTicali:${password}@cluster0.wkcgh.mongodb.net/note-db?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

const noteSchema = new mongoose.Schema({
    tema: String,
    date: Date,
    important: Boolean,
    giorno:Date,
    ora:String
})

const Note = mongoose.model('Note', noteSchema)
const note = new Note ({
    tema: "Revisione auto",
    giorno: "2021-03-30T22:00:00.000Z",
    ora: "9.30",
    data: "2021-03-29T06:38:19.116Z",
    important: true,
})

// note.save().then(res => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})