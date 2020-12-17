import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [anecdotes, setAnecdotes] = useState(props.anecdotes.map( a => ({
    str : a,
    votes : 0
  })));

  const voteUp = () => {
    const newAnecs = [...anecdotes];
    newAnecs[selected].votes++;
    setAnecdotes(newAnecs);
  }

  return <>
    <h1>Anecdote of the day</h1>
    <Anecdote anec = {anecdotes[selected]} />
    <button onClick={voteUp}>vote</button>
    <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>
      next anecdote
    </button>
    <h1>Anecdote with most votes</h1>
    <Anecdote anec = {anecdotes.reduce((acc, cur) => (cur.votes > acc.votes? cur:acc))} />
  </>
}

const Anecdote = ({anec}) => (<>
  <div>{anec.str}</div>
  <div>has {anec.votes} votes</div>
</>)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
