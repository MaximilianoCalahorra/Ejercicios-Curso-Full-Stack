const Header = ({course}) => <h1>{course}</h1>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => <>{parts.map(part => <Part key={part.id} part={part}/>)}</>

const Course = ({course}) => 
<>
    <Header course={course.name}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
</>

const Total = ({parts}) => <strong>total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</strong>

const App = () => {
const courses = [
    {
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            },
            {
                name: 'Redux',
                exercises: 11,
                id: 4
            }
        ]
    },
    {
        name: 'Node.js',
        id: 2,
        parts: [
            {
            name: 'Routing',
            exercises: 3,
            id: 1
            },
            {
            name: 'Middlewares',
            exercises: 7,
            id: 2
            }
        ]
    }
]

    return <>{courses.map(course => <Course key={course.id} course={course}/>)}</>
}

export default App