//Obtenemos Mongoose:
const mongoose = require('mongoose')

//Si no se indicó la contraseña del usuario:
if(process.argv.length<3)
{
    console.log('give password as argument')
    process.exit(1) //Terminamos la conexión.
}

//Obtenemos la contraseña:
const password = process.argv[2]

//Definimos la URL de la base de datos:
const url =
`mongodb+srv://maximilianocalahorra:${password}@cluster0.vuyfw.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

//Nos conectamos a la base de datos:
mongoose.connect(url)

//Definimos el esquema de una persona:
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

//Definimos el modelo Person a partir del esquema:
const Person = mongoose.model('Person', personSchema)

//Si se indicó algún dato además de la contraseña:
if(process.argv.length > 3)
{
    //Hay que agregar una nueva persona a la base de datos:
    const person = new Person({
        name: process.argv[3], //Obtenemos el nombre ingresado.
        number: process.argv[4] //Obtenemos el apellido ingresado.
    }) 

    //Intentamos persistir la persona:
    person.save().then(result => {
        //Informamos los datos de la persona guardada:
        console.log(`added ${result.name} number ${result.number} to phonebook`)

        //Cerramos la conexión con la base de datos:
        mongoose.connection.close()
    })
}
else
{
    //Hay que obtener todas las personas:
    Person.find({}).then(result => {
        //Mostramos todas las personas obtenidas:
        console.log('phonebook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })

        //Cerramos la conexión con la base de datos:
        mongoose.connection.close()
    })
}