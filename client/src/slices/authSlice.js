import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../utils/api';
import { setAlert } from './alertSlice';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  user: null
};

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, thunkApi) => {
    try {
      const res = await api.get('/auth');
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue('Failed to load user');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (formData, thunkApi) => {
    try {
      const res = await api.post('/users', formData);
      thunkApi.dispatch(loadUser());
      return res.data;
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          thunkApi.dispatch(setAlert(error.msg, 'danger'));
        });
      }
      return thunkApi.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (formData, thunkApi) => {
    try {
      const res = await api.post('/auth', formData);
      thunkApi.dispatch(loadUser());
      return res.data;
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          thunkApi.dispatch(setAlert(error.msg, 'danger'));
        });
      }
      return thunkApi.rejectWithValue();
    }
  }
);

export const logout = createAction('auth/logout');

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, () => {
        return initialState;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, () => {
        return initialState;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state) => {
        state.user = null;
        state.loading = false;
      });
  }
});

export default authSlice.reducer;
