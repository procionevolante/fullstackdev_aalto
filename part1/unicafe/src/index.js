import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Counter = ({name, value}) => (
  <div>
    {name} {value}
  </div>
)

const Percentage = ({name, value}) => (
  <div>
    {name} {value || '---'/* '---' displayed when value is NaN */}%
  </div>
)

const Statistics = ({scores}) => {
  // don't render if no statistics
  if (scores.every(s => (s === 0)))
    return <p>No feedback given</p>;

  const names = ['good', 'neutral', 'bad'];
  const all = scores.reduce((tot, val) => tot+val);
  const avg = (scores[0] - scores[2]) / all;
  const percpos = (scores[0] / all) * 100;

  return <>
    {
      scores.map((s, i) =>
        <Counter key={names[i]} name={names[i]} value={scores[i]} />
      )
    }
    <Counter name={'all'} value={all} />
    <Counter name={'average'} value={all===0? '---':avg} />
    <Percentage name={'positive'} value={percpos} />
  </>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good+1)}> good </button>
      <button onClick={() => setNeutral(neutral+1)}> neutral </button>
      <button onClick={() => setBad(bad+1)}> bad </button>

      <h1>Statistics</h1>
      <Statistics scores={[good, neutral, bad]} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
