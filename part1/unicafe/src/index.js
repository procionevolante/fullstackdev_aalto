import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({text, value}) => (
  <tr>
    <td>{text}</td><td>{value}</td>
  </tr>
)

const Statistics = ({names, scores}) => {
  // don't render if no statistics
  if (scores.every(s => (s === 0)))
    return <p>No feedback given</p>;

  const all = scores.reduce((tot, val) => tot+val);
  const avg = (scores[0] - scores[2]) / all;
  const percpos = (scores[0] / all) * 100;

  return <table><tbody>
    {
      scores.map((s, i) =>
        <Statistic key={names[i]} text={names[i]} value={scores[i]} />
      )
    }
    <Statistic text={'all'} value={all} />
    <Statistic text={'average'} value={avg} />
    <Statistic text={'positive'} value={`${percpos}%`} />
  </tbody></table>
}

// advantage of this is that whatever we use as text is not
// interpreted ex. as HTML tags
const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

const App = () => {
  const [x, setX] = useState(0)
  console.log(x)
  return (
    <div>
      {x}
      <button onClick={()=>setX(10)}>press</button>
    </div>
  );

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const names = ['good', 'neutral', 'bad'];

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={() => setGood(good+1)} text={'good'} />
      <Button onClick={() => setNeutral(neutral+1)} text={'neutral'} />
      <Button onClick={() => setBad(bad+1)} text={'bad'} />

      <h1>Statistics</h1>
      <Statistics names={names} scores={[good, neutral, bad]} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
