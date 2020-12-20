// vim: tabstop=2 expandtab shiftwidth=2
import React from 'react';

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

export default Course;
