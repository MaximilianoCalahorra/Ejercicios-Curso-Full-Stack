import { useState } from 'react'

//Componente 'Button':
const Button = ({handleClick, calification}) => <button onClick={handleClick}>{calification}</button>

//Componente 'StatisticLine':
const StatisticLine = ({text, value, extra}) => <p>{text} {value}{extra}</p>

//Componente 'App':
const App = () => {
  //Guarda los clics de cada botón en su propio estado:
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //Nombres de las distintas secciones:
  const calificationGood = 'good'
  const calificationNeutral = 'neutral'
  const calificationBad = 'bad'
  const calificationAll = 'all'
  const average = 'average'
  const positivesPercentage = 'positive'

  //Cálculos:
  const totalComments = good + neutral + bad
  const badScore = bad !== 0 ? (bad * -1) : bad
  const averageNumber = totalComments !== 0 ? (good + badScore) / totalComments : 0
  const positivesPercentageNumber = totalComments !== 0 ? good / totalComments * 100 : 0
  
  //Generación de posibles resultados:
  const resultWithStatistics = 
  <>
    <h1>give feedback</h1>
    <Button handleClick={() => setGood(good + 1)} calification={calificationGood}/>
    <Button handleClick={() => setNeutral(neutral + 1)} calification={calificationNeutral}/>
    <Button handleClick={() => setBad(bad + 1)} calification={calificationBad}/>
    <h2>statistics</h2>
    <StatisticLine text={calificationGood} value={good}/>
    <StatisticLine text={calificationNeutral} value={neutral}/>
    <StatisticLine text={calificationBad} value={bad}/>
    <StatisticLine text={calificationAll} value={totalComments}/>
    <StatisticLine text={average} value={averageNumber}/>
    <StatisticLine text={positivesPercentage} value={positivesPercentageNumber} extra='%'/>
  </>

  const resultWithoutStatistics = 
  <>
    <h1>give feedback</h1>
    <Button handleClick={() => setGood(good + 1)} calification={calificationGood}/>
    <Button handleClick={() => setNeutral(neutral + 1)} calification={calificationNeutral}/>
    <Button handleClick={() => setBad(bad + 1)} calification={calificationBad}/>
    <h2>statistics</h2>
    <p>No feedback given</p>
  </>    

  //El componente inyectado será el que tiene las estadísticas o el que no según si hay comentarios o no, respectivamente:
  const result = totalComments > 0 ? resultWithStatistics : resultWithoutStatistics;

  return result
}

export default App