//Obtenemos el servidor:
const express = require('express')

//Importamos Morgan:
const morgan = require('morgan')

//Obtenemos CORS:
const cors = require('cors')

//Lo ponemos en funcionamiento:
const app = express()

//Activamos el parseador a JSON de Express:
app.use(express.json())

//Definimos la configuración de formato de Morgan:
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

//Agregar el cuerpo al registro:
morgan.token('body', (req) => JSON.stringify(req.body))

//Usamos CORS:
app.use(cors())

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

//Obtener una persona por id:
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person)
    {
        response.json(person)
    }
    else
    {
        response.status(404).send(`There isn't a person with id ${id}`)
    }
})

//Eliminar una persona por su id:
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

//Generar id aleatorio:
const generateRandomId = () => Math.round(Math.random() * 1000000)

//Agregar una persona:
app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name)
    {
        return response.status(400).json({ 
            error: 'name missing' 
        }) 
    }

    if(!body.number)
    {
        return response.status(400).json({ 
            error: 'number missing' 
        }) 
    }

    if(persons.find(person => person.name === body.name))
    {
        return response.status(400).json({ 
            error: 'name must be unique' 
        }) 
    }

    const newPerson = 
    {
        id: generateRandomId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(newPerson)

    response.json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})