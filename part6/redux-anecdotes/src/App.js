import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteFor, newAnecdote } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  const handleCreateNewAnecdode = (event) => {
    event.preventDefault(); // no reload!
    const msg = event.target.msg.value;
    dispatch(newAnecdote(msg));
  }

  const vote = (id) => {
    dispatch(voteFor(id));
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={()=>vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={handleCreateNewAnecdode}>
        <div><input name='msg'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App;
