import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [];

export function setAlert(msg, alertType, timeout = 5000) {
  return function (dispatch) {
    const id = nanoid();
    dispatch({
      type: 'alert/set',
      payload: { msg, alertType, id }
    });

    setTimeout(() => {
      dispatch({ type: 'alert/remove', payload: id });
    }, timeout);
  };
}

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    remove(state, action) {
      return state.filter((alert) => alert.id !== action.payload);
    },
    set(state, action) {
      state.push(action.payload);
    }
  }
});

export default alertSlice.reducer;
