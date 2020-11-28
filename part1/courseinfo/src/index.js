// vim: tabstop=2 expandtab shiftwidth=2
import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  console.log(props);
  return (<h1>{props.course}</h1>);
}

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Content = (props) => (<>
    {
      props.parts.map((p) => (<Part part={p}}))
    }
</>)

const Total = (props) => (
  <p>Number of exercises {props.val)}</p>
)

const App = () => {
  const course = {
    name : 'Half Stack application development',
    parts : [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course = {course.name}/>
      <Content parts={course.parts} />
      <Total val = {course.parts.reduce((tot, val) => (tot+val.exercises))} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
