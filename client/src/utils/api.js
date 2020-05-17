import axios from 'axios';
import store from '../store';
import { LOGOUT, CLEAR_PROFILE } from '../actions/types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response.data.msg === 'Token is not valid') {
      store.dispatch({ type: LOGOUT });
      store.dispatch({ type: CLEAR_PROFILE });
    }
    return Promise.reject(err);
  }
);

export default api;
