import { useState } from 'react'

//Componente 'Button':
const Button = ({handleClick, calification}) => <button onClick={handleClick}>{calification}</button>

//Componente 'Total':
const Total = ({calification, total}) => <p>{calification} {total}</p>

//Componente 'App':
const App = () => {
  //Guarda los clics de cada botón en su propio estado:
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //Nombres de las distintas calificaciones:
  const calificationGood = 'good'
  const calificationNeutral = 'neutral'
  const calificationBad = 'bad'

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} calification={calificationGood}/>
      <Button handleClick={() => setNeutral(neutral + 1)} calification={calificationNeutral}/>
      <Button handleClick={() => setBad(bad + 1)} calification={calificationBad}/>
      <h2>statistics</h2>
      <Total calification={calificationGood} total={good}/>
      <Total calification={calificationNeutral} total={neutral}/>
      <Total calification={calificationBad} total={bad}/>
    </>
  )
}

export default App