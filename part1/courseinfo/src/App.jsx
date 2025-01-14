const Header = (props) => {
  return(
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  return(
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercices {props.total}</p>
    </>
  )
}

const App = () => {
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14

  return (
    <>
      <Header course='Half Stack application development'/>
      <Content part='Fundamentals of React' exercises={exercises1}/>
      <Content part='Using props to pass data' exercises={exercises2}/>
      <Content part='State of a component' exercises={exercises3}/>
      <Total total={exercises1 + exercises2 + exercises3}/>
    </>
  )
}

export default App