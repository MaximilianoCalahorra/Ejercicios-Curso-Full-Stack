//Componente que solo imprime el nombre del país:
const CountryName = ({country}) => <>{country.name.common}</>

//Componente que imprime nombre, capital, área, idiomas y bandera del país:
const FullCountry = ({country}) => {
    return(
        <>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital}</div>
            <div>area {country.area}</div>
            <h3>languages:</h3>
            <ul>
                {Object.entries(country.languages).map(([key, value]) => (
                    <li key={key}>{value}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt}></img>
        </>
    )
}

//Componente donde se determina qué hacer según la cantidad de países que llegan:
const Countries = ({countries, handleShow}) => {
    //Obtenemos la cantidad que son:
    const amountOfCountries = countries.length

    //Si es uno solo:
    if(amountOfCountries === 1)
    {
        return <FullCountry country={countries[0]}/> //Imprimimos el país completo.
    }
    //Si son entre [1;10]:
    else if(amountOfCountries >= 1 && amountOfCountries <= 10)
    {
        //Imprimimos el nombre de cada uno junto a un botón para mostrar más detalles del país:
        return countries.map(country => {
            return(
                <div key={country.name.common}>
                    <CountryName country={country}/>
                    <button onClick={() => handleShow(country.name.common)}>show</button>
                </div>
            )
        })
    }
    //Otros casos:
    else
    {
        return <div>too many matches, specify another filter</div>
    }
}

export default Countries