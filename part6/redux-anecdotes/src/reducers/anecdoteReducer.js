const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0); // used to generate new random IDs

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'CAST_VOTE':
      const aid = action.data.aid;
      const tobechanged = state.find((a) => a.id === aid);
      const changed = {...tobechanged, votes: tobechanged.votes + 1};
      return state.map((a) => a.id !== aid? a:changed);
    case 'NEW_ANECDOTE':
      console.log('NEW anecdote!', action.data)
      return state.concat(action.data);
    default:
      return state;
  }
}
export const newAnecdote = (msg) => ({
  type: 'NEW_ANECDOTE',
  data: {
    id: getId(),
    content: msg,
    votes: 0,
  },
})
export const voteFor = (aid) => ({
  type: 'CAST_VOTE',
  data: {aid}
})

export default reducer;
