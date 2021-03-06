import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { voteFor } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteFor(id));
  }

  return <>
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
      )
    }
  </>
}

export default AnecdoteList;
