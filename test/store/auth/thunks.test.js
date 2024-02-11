import { loginWithEmailPassword, logoutFirebase, signIngWithGoogle } from '../../../src/firebase';
import { chekingCredentials, login, logout } from '../../../src/store/auth';
import {
  checkingAuthentication,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout,
} from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal/journalSlice';
import { demoUser } from '../../fixtures/authFixtures';

//* Cualquier cosa que devuelva este path, es un mock
// eslint-disable-next-line no-undef
jest.mock('../../../src/firebase/providers.js');

/* eslint-disable no-undef */
describe('Pruebas en AuthThunks', () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('Debe de llamar el checkingCredentials', async () => {
    //* Ejecuto lo que devuelve la funcion (que es otra funcion)
    await checkingAuthentication()(dispatch);

    //* El argumento con el que se llama el dispatch es otra funcion
    expect(dispatch).toHaveBeenCalledWith(chekingCredentials());
  });

  test('startGoogleSignIn debe de llamar checkingCredentials y login - Exito', async () => {
    const loginData = { ok: true, ...demoUser };
    //* Ya lo tenemos mockeado previamente de providers.js
    await signIngWithGoogle.mockResolvedValue(loginData);

    //* thunk
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(chekingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startGoogleSignIn debe de llamar checkingCredentials y logout - Error', async () => {
    const loginData = { ok: false, errorMessage: 'Un error en Google' };
    //* Ya lo tenemos mockeado previamente de providers.js
    await signIngWithGoogle.mockResolvedValue(loginData);

    //* thunk
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(chekingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exito', async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: '123456' };

    await loginWithEmailPassword.mockResolvedValue(loginData);

    //* thunk
    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(chekingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(demoUser));
  });

  test('startLoginWithEmailPassword debe de llamar checkingCredentials y logout - Error', async () => {
    const loginData = { ok: false, errorMessage: 'Se produjo un error al hacer el login' };
    const formData = { email: demoUser.email, password: '123456' };

    await loginWithEmailPassword.mockResolvedValue(loginData);

    //* thunk
    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(chekingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout({errorMessage: 'Se produjo un error al hacer el login'}));
  });

  test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async () => {
    await startLogout()(dispatch);

    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout({}));
  });
  
});
