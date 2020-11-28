// vim: tabstop=2 expandtab shiftwidth=2
import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => (
  <p>
    {props.part} {props.ex}
  </p>
)

const Content = (props) => (<>
    {
      props.parts.map((p, i) => (<Part part={p} ex={props.exercises[i]})
    }
</>)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course = {course}/>
      <Content parts={[part1, part2, part3] exercises={[exercise1, exercise2, exercise3]}} />
      <Total />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
