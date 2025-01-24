//Obtenemos el servidor:
const express = require('express')

//Lo ponemos en funcionamiento:
const app = express()

//Datos de las personas:
let persons =
[
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

//Obtener personas:
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

//Mostrar información:
app.get('/info', (request, response) => {
    const currentDate = new Date()
    const html = `<p>Phonebook has info for ${persons.length} people</p>
                  <p>${currentDate.toString()}</p>`
    response.send(html)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})