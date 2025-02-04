const Header = ({course}) => <h1>{course}</h1>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => <>{parts.map(part => <Part key={part.id} part={part}/>)}</>

const Total = ({parts}) => <strong>total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</strong>

const Course = ({course}) => 
<>
    <Header course={course.name}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
</>

export default Course