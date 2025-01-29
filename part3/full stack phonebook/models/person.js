//Obtenemos Mongoose:
const mongoose = require('mongoose')

//Obtenemos la URL de la base de datos:
const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

//Nos intentamos conectar a la base de datos:
console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

//Definimos el esquema de una persona:
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function (value) {
                return /^\d{2,3}-\d+$/.test(value)
            },
            message: props => `${props.value} is not a valid phone number! Format should be XX-XXXXXXX or XXX-XXXXXXXX`
        },
        required: true
    }
})

//Indicamos el formato esperado cuando se convierte a JSON una persona:
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//Exportamos el modelo de una persona:
module.exports = mongoose.model('Person', personSchema)