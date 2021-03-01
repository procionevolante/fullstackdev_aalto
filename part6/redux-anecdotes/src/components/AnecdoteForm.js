import React from 'react';
import { useDispatch } from 'react-redux';
import { newAnecdote} from '../reducers/anecdoteReducer';

const AnecdoteForm = ({onSubmit}) => {
  const dispatch = useDispatch();

  const handleCreateNewAnecdode = (event) => {
    event.preventDefault(); // no reload!
    const msg = event.target.msg.value;
    dispatch(newAnecdote(msg));
  }
  return (
    <form onSubmit={handleCreateNewAnecdode}>
      <div><input name='msg'/></div>
      <button type='submit'>create</button>
    </form>
  )
}

export default AnecdoteForm;
