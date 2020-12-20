// vim: tabstop=2 expandtab shiftwidth=2
import React from 'react';
import ReactDOM from 'react-dom';

const Header = () => 
  <h1>Web development curriculum</h1>

const CourseHeader = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Course = ({ course }) => (<>
  <CourseHeader course={course} />
  <Content course={course} />
</>)

const Total = ({ course }) => {
  const sum = course.parts.reduce((acc, cur) => (acc + cur.exercises), 0);
  return(
    <p>Number of exercises: {sum}</p>
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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

  return <>
    <Header />
    {
      courses.map(c =>
        <Course key={c.id} course={c} />
      )
    }
  </>
}

ReactDOM.render(<App />, document.getElementById('root'))
