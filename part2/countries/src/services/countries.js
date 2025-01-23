import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getByName = name => {
    const request = axios.get(`${baseUrl}/name/${name}`)
    return request.then(response => response.data)
}

const getCityWeatherStatus = (cityName, countrySuffix) => {
    const baseOWMUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
    const api_key = import.meta.env.VITE_OWM_KEY //Key para la API de OpenWeatherMap.
    const adaptedCityName = cityName.replace(/ /g, '+') //Reemplazamos los espacios con un +.
    const request = axios.get(`${baseOWMUrl}${adaptedCityName},${countrySuffix}&APPID=${api_key}`)
    return request.then(response => response.data)
}

export default { getAll, getByName, getCityWeatherStatus }