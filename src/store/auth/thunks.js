import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signIngWithGoogle,
} from '../../firebase';
import { clearNotesLogout } from '../journal';
import { chekingCredentials, login, logout } from './';

/**
 * Un thunk es un grupo de acciones asincronas (que pueden contener acciones 
 * sincronas) que se ejecutan secuencialmente
 */
export const checkingAuthentication = () => {
  return async (dispatch) => {
    // Ejecuto la accion de checkingCredentials
    dispatch(chekingCredentials());
  };
};

/**
 * Por convencion se le pone start para indicar que es el inicio de una tarea
 * asincrona
 */
export const startGoogleSignIn = () => {
  return async (dispatch) => {
    // Ejecuto la accion de checkingCredentials
    dispatch(chekingCredentials());
    const result = await signIngWithGoogle();

    if (result.ok) {
      // Llamo al login y seteo su payload
      return dispatch(login(result));
    } else {
      // Llamo al logout y seteo su payload
      return dispatch(logout(result.errorMessage));
    }
  };
};

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(chekingCredentials());

    const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({
      email,
      password,
      displayName,
    });

    // Llamo al logout y seteo su payload
    if (!ok) return dispatch(logout({ errorMessage }));

    return dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(chekingCredentials());

    const { ok, displayName, photoURL, uid, errorMessage } = await loginWithEmailPassword(
      { email, password }
    );

    if (!ok) return dispatch(logout({ errorMessage }));

    return dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(clearNotesLogout())
    return dispatch(logout({}));
  };
};
