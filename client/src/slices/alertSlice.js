import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [];

export function setAlert(msg, alertType, timeout = 5000) {
  return function (dispatch) {
    const id = nanoid();
    dispatch({
      type: 'alert/setAlert',
      payload: { msg, alertType, id }
    });

    setTimeout(
      () => dispatch({ type: 'alert/removeAlert', payload: id }),
      timeout
    );
  };
}

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert(state, action) {
      state.push(action.payload);
    }
  },
  removeAlert(state, action) {
    state = state.filter((alert) => alert.id !== action.payload.id);
  }
});

export default alertSlice.reducer;
