const http = require('http')
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

const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-type': 'text/plain' })
    response.end(JSON.stringify(userData))
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)