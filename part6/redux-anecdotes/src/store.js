import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import anecdoteReducer from './reducers/anecdoteReducer';

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  /* for next exercises if there is time */
})

const store = createStore(
  reducer,
  composeWithDevTools()
)

store.subscribe(() => console.log(store.getState()));

export default store;
