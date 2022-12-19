import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import alertReducer from './slices/alertSlice';
import profileReducer from './reducers/profile';
import postReducer from './reducers/post';
import setAuthToken from './utils/setAuthToken';

const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
    profile: profileReducer,
    post: postReducer
  }
});

/*
  NOTE: set up a store subscription listener
  to store the users token in localStorage
 */

/*
  initialize current state from redux store for subscription comparison
  preventing undefined error
 */
let currentState = store.getState();

store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState();
  // if the token changes set the value in localStorage and axios headers
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    setAuthToken(token);
  }
});

export default store;
