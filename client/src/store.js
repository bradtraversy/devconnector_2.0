import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// set up a store subscription listener

let currentState;

store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState();
  console.log('previous state', previousState);
  console.log('current state', currentState);
  if (previousState.auth.token !== currentState.auth.token) {
    localStorage.setItem('token', currentState.auth.token);
  }
});

export default store;
