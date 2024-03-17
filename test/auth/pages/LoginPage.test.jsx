/* eslint-disable no-undef */
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { authSlice } from '../../../src/store';
import { notAuthenticatedState } from './../../fixtures/authFixtures';

//* Si no se pone mock al principio no funciona
const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

//* Mockeo una sola funcion de los thunks, la que me hace falta
jest.mock('../../../src/store/auth/thunks', () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: ({email, password}) => {
    return () => mockStartLoginWithEmailPassword({email, password});
  },
}));

//* Guardo la referencia para no cargar este mock por cada test
const mockUseDispatch = jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  /**
   * Ahora el use dispatch devuelve una funcion que recibe por parametro otra
   * funcion y la ejecuta
   */
  useDispatch: () => (fn) => fn(),
}));

//* Cargo los reducers del store que se usaran durante la prueba
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  //* Establezco un estado del store por defecto
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

describe('Pruebas en el <Loginpage />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    //* Vuelvo a seter el mock del dispatch con la referencia anterior
    jest.mock('react-redux', () => mockUseDispatch);
  });

  test('Debe de mostrar el componente correctamente', () => {
    render(
      /**
       * Como LoginPage hace uso del useSelector de redux, necesitamos proveer
       * el store de alguna forma. Eso lo conseguimos con el provider
       */
      <Provider store={store}>
        {/* Como este componente tambien usa el router, debemos usar el MemoryRouter */}
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    // screen.debug();
    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
  });

  test('Boton de google debe de llamar el startGoogleSignIn', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const googleBtn = screen.getByLabelText('google-btn');
    fireEvent.click(googleBtn);
    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  });

  test('Submit debe de llamar startLoginWithEmailPassword', () => {
    const email = 'fernando@google.com';
    const password = '123456';

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole('textbox', { name: 'Correo' });
    fireEvent.change(emailField, { target: { name: 'email', value: email } });

    const passwordField = screen.getByTestId('password');
    fireEvent.change(passwordField, { target: { name: 'password', value: password } });

    const loginForm = screen.getByLabelText('submit-form');
    fireEvent.submit(loginForm);

    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
      email: email,
      password: password
    });
  });
});
