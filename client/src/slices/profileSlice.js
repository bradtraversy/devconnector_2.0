import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../utils/api';
import { setAlert } from './alertSlice';
import { logout } from './authSlice';

// TODO: remove loading state and make better use of ASyncThunk

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: false,
  error: null
};

export const getCurrentProfile = createAsyncThunk(
  'profile/getCurrent',
  async (_, thunkApi) => {
    try {
      const res = await api.get('/profile/me');
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue({
        msg: err.response.satusText,
        status: err.response.status
      });
    }
  }
);

export const getProfiles = createAsyncThunk(
  'profile/getAll',
  async (_, thunkApi) => {
    try {
      const res = await api.get('/profile');
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue({
        msg: err.response.statusText,
        status: err.response.status
      });
    }
  }
);

export const getProfileById = createAsyncThunk(
  'profile/getById',
  async (userId, thunkApi) => {
    try {
      const res = await api.get(`/profile/user/${userId}`);
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue({
        msg: err.response.statusText,
        status: err.response.status
      });
    }
  }
);

export const getGithubRepos = createAsyncThunk(
  'profile/getGithubRepos',
  async (username, thunkApi) => {
    try {
      const res = await api.get(`/profile/github/${username}`);
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue('No Repos');
    }
  }
);

export const createProfile = createAsyncThunk(
  'profile/create',
  async ({ formData, edit = false }, thunkApi) => {
    try {
      const res = await api.post('/profile', formData);
      thunkApi.dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      );
      return res.data;
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) =>
          thunkApi.dispatch(setAlert(error.msg, 'danger'))
        );
      }
      return thunkApi.rejectWithValue({
        msg: err.response.statusText,
        status: err.response.status
      });
    }
  }
);

export const addExperience = createAsyncThunk(
  'profile/addExperience',
  async (formData, thunkApi) => {
    try {
      const res = await api.put('/profile/experience', formData);
      thunkApi.dispatch(setAlert('Experience Added', 'success'));
      return res.data;
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) =>
          thunkApi.dispatch(setAlert(error.msg, 'danger'))
        );
        return thunkApi.rejectWithValue({
          msg: err.response.statusText,
          status: err.response.status
        });
      }
    }
  }
);

export const addEducation = createAsyncThunk(
  'profile/addEducation',
  async (formData, thunkApi) => {
    try {
      const res = await api.put('/profile/education', formData);
      thunkApi.dispatch(setAlert('Education Added', 'success'));
      return res.data;
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) =>
          thunkApi.dispatch(setAlert(error.msg, 'danger'))
        );
      }
      return thunkApi.rejectWithValue({
        msg: err.response.statusText,
        status: err.response.status
      });
    }
  }
);

export const deleteExperience = createAsyncThunk(
  'profile/deleteExperience',
  async (id, thunkApi) => {
    try {
      const res = await api.delete(`/profile/experience/${id}`);
      thunkApi.dispatch(setAlert('Experience Removed', 'success'));
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue({
        msg: err.response.statusText,
        status: err.response.status
      });
    }
  }
);

export const deleteEducation = createAsyncThunk(
  'profile/deleteEducation',
  async (id, thunkApi) => {
    try {
      const res = await api.delete(`/profile/education/${id}`);
      thunkApi.dispatch(setAlert('Education Removed', 'success'));
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue({
        msg: err.response.statusText,
        status: err.response.status
      });
    }
  }
);

export const deleteAccount = createAsyncThunk(
  'profile/deleteAccount',
  async (_, thunkApi) => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      try {
        await api.delete('/profile');
        thunkApi.dispatch(
          setAlert('Your account has been permanently deleted')
        );
        thunkApi.dispatch(logout());
        return {};
      } catch (err) {
        thunkApi.rejectWithValue({
          msg: err.response.statusText,
          status: err.response.status
        });
      }
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCurrentProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getCurrentProfile.rejected, (state, action) => {
        state.loading = false;
        state.profile = null;
        state.error = action.payload;
      })
      .addCase(getProfiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload;
      })
      .addCase(getProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProfileById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getProfileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getGithubRepos.fulfilled, (state, action) => {
        state.loading = false;
        state.repos = action.payload;
      })
      .addCase(createProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addExperience.pending, (state) => {
        state.loading = true;
      })
      .addCase(addExperience.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(addExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addEducation.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(addEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteExperience.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(deleteExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEducation.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(deleteEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.loading = false;
        state.profile = null;
        state.repos = [];
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default profileSlice.reducer;
