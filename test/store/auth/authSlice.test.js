import { authSlice, chekingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

/* eslint-disable no-undef */
describe('Pruebas en el authslice', () => {
  test('Debe de devolver el estado inicial y llamarase "auth"', () => {
    //* El authSlice es simplemente un objeto
    expect(authSlice.name).toBe('auth');
    const state = authSlice.reducer(initialState, {});
    
    expect(state).toEqual(initialState);
  });

  test('Debe de realizar la autenticacion', () => {
    /**
     * Para probar una accion de redux, usaremos el slice correspondiente 
     * (en este caso el del auth), le pasaremos el estado inicial, la accion
     * a realizar y el payload de dicha accion. Por ultimo, comprobaremos que
     * el estado final es igual a uno de nuestros fixtures predefinidos
     */
    const state = authSlice.reducer(initialState, login(demoUser));

    expect(state).toEqual({
      status: 'authenticated',
      uid: '123ABC',
      email: 'demo@google.com',
      displayName: 'Demo User',
      photoURL: 'https://demo.jpg',
      errorMessage: null,
    });
  });

  test('Debe de realizar el logout sin argumentos', () => {
    const state = authSlice.reducer(authenticatedState, logout());
    expect(state).toEqual({
      status: 'not-authenticated',
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: undefined,
    });
  });
  
  test('Debe de realizar el logout con argumentos', () => {
    const errorMessage = 'Las credenciales no son correctas';
    const state = authSlice.reducer(authenticatedState, logout({errorMessage}));
    expect(state).toEqual({
      status: 'not-authenticated',
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage,
    });
  });

  test('Debe de cambiar el estado a checking', () => {
    const state = authSlice.reducer(authenticatedState, chekingCredentials());
    expect(state.status).toBe('checking');
  });
});
