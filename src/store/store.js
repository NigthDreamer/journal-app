import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';

/**
 * Aquí se importan los reducers de los slices que conformaran 
 * nuestra aplicacion
 */
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
