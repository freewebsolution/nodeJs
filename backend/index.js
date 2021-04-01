const express = require ('express')
const app = express();
const userData = [
    {
        "id": 1,
        "name": "Lucio",
        "username": "ticalilucio@gmail.it"
    },
    {
        "id": 2,
        "name": "Mattia",
        "username": "Mattia@libero.com"
    },
    {
        "id": 3,
        "name": "Giorgia",
        "username": "Giorgia@virgilio.com"
    }
]
app.get('/',(request,response) => {
    response.send('<h1>Hello world!</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(userData)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)