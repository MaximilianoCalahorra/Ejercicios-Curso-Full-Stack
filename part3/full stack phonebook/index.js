//Obtenemos el servidor:
const express = require('express')

//Importamos Morgan:
const morgan = require('morgan')

//Obtenemos CORS:
const cors = require('cors')

//Importamos las variables de entorno:
require('dotenv').config()

//Importamos la entidad:
const Person = require('./models/person')

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

//Para servir archivos estáticos:
app.use(express.static('dist'))

//Obtener personas:
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

//Mostrar información:
app.get('/info', (request, response) => {
    Person.find({})
        .then(persons => {
            const currentDate = new Date()
            const html = `<p>Phonebook has info for ${persons.length} people</p>
                          <p>${currentDate.toString()}</p>`
            response.send(html)
        })
})

//Obtener una persona por id:
app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findById(id)
        .then(person => {
            if(person)
            {
                response.json(person)
            }
            else
            {
                response.status(404).send(`There isn't a person with id ${id}`)
            }
        })
        .catch(error => next(error))
})

//Eliminar una persona por su id:
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

//Agregar una persona:
app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if(!body.number)
    {
        return response.status(400).json({ 
            error: 'number missing' 
        }) 
    }

    const person = new Person({
        name: body.name,
        number: body.number
    }) 

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})

//Modificar una persona por su id:
app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    Person.findByIdAndUpdate(
        request.params.id, 
        { name, number },
        { new: true, runValidators: true, context: 'query' }
    )
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

//Manejador de errores:
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    //Si es un error de casteo:
    if(error.name === 'CastError') 
    {
        return response.status(400).json({ error: 'malformatted id' })
    } 
    
    //Si es un error de validación:
    if(error.name === 'ValidationError')
    {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

//Ponemos en funcionamiento el manejador de errores:
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})