import { createSlice } from '@reduxjs/toolkit';

/**
 * Un slice es un objeto donde se almacena un grupo de reducers que tienen
 * una operatoria sincrona y un estado en comun
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', //'checking', 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = 'authenticated';
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = payload?.errorMessage;
    },
    chekingCredentials: (state) => {
      state.status = 'checking';
    },
  },
});

// Aquí se exportan los Action Creator Functions de los reducers
export const { login, logout, chekingCredentials } = authSlice.actions;
