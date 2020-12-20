// vim: tabstop=2 expandtab shiftwidth=2
import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Course = ({ course }) => (<>
  <Header course={course} />
  <Content course={course} />
</>)

const Total = ({ course }) => {
  const sum = course.parts.reduce((acc, cur) => (acc + cur.exercises), 0);
  return(
    <p>Number of exercises {sum}</p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => (<>
  {
    course.parts.map(p => 
      <Part key={p.id} part={p} />
    )
  }
  <Total course={course} />
</>)

const App = () => {
  const course = {
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
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))
