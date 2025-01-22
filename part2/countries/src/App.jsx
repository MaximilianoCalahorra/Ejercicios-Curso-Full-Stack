import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Filter from './components/Filter'
import Countries from './components/Country'

const App = () => {
    //Estado para el filtro por nombre y para el listado de países:
    const [searchedName, setSearchedName] = useState('')
    const [countries, setCountries] = useState([])

    //Obtenemos todos los países la primera vez:
    useEffect(() => {
        countryService
            .getAll()
            .then(initialCountries => setCountries(initialCountries))
    }, [])

    const handleSearchedNameChange = event => setSearchedName(event.target.value)

    const countriesToShow = searchedName === '' ?
                            countries :
                            countries.filter(country => {
                                if(country.name.common.includes(searchedName)) return country
                            })

    return(
        <>
            <Filter value={searchedName} handleOnChange={handleSearchedNameChange}/>
            <Countries countries={countriesToShow}/>
        </>
    )
}

export default App
