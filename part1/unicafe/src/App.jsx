import { useState } from 'react'

//Componente 'Button':
const Button = ({handleClick, calification}) => <button onClick={handleClick}>{calification}</button>

//Componente 'Statistic':
const Statistic = ({name, value, extra}) => <p>{name} {value}{extra}</p>

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

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} calification={calificationGood}/>
      <Button handleClick={() => setNeutral(neutral + 1)} calification={calificationNeutral}/>
      <Button handleClick={() => setBad(bad + 1)} calification={calificationBad}/>
      <h2>statistics</h2>
      <Statistic name={calificationGood} value={good}/>
      <Statistic name={calificationNeutral} value={neutral}/>
      <Statistic name={calificationBad} value={bad}/>
      <Statistic name={calificationAll} value={totalComments}/>
      <Statistic name={average} value={averageNumber}/>
      <Statistic name={positivesPercentage} value={positivesPercentageNumber} extra='%'/>
    </>
  )
}

export default App