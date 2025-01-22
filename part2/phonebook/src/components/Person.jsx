const Person = ({person, remove}) => {
    return(
        <>
        <p>{person.name} {person.number} <button onClick={remove}>delete</button></p>
        </>
    )
}

const Persons = ({persons, remove}) => 
<>{persons.map(person => <Person key={person.id} person={person} remove={() => remove(person.id)}/>)}</>

export default Persons