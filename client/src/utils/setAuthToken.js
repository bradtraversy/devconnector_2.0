import axios from 'axios';

import store from '../store';
import { AUTH_ERROR } from '../actions/types';

axios.interceptors.response.use(
  res => res,
  err => {
    console.log(err.message);
    if (err.message.includes('401')) store.dispatch({ type: AUTH_ERROR });
  }
);

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
