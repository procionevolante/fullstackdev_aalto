import React from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import { useSelector, useDispatch } from 'react-redux';
import { voteFor } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();


  const vote = (id) => {
    dispatch(voteFor(id));
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a1, a2) => a2.votes-a1.votes)
        .map(anecdote => <div key={anecdote.id}>
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
      <AnecdoteForm />
    </div>
  )
}

export default App;
