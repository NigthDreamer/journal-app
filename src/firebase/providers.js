import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signIngWithGoogle = async () => {
  try {
    /**
     * Muestra el popup de Google y pide la información de la cuenta del
     * usuario. Almacena el resultado del proceso en la variable result.
     */
    const result = await signInWithPopup(FirebaseAuth, googleProvider);

    /**
     * Con el resultado del popup, podemos crear las credenciales.
     */
    // const credentials = GoogleAuthProvider.credentialFromResult(result);

    /**
     * Lo que en verdad nos interesa son los datos del usuario que nos devuelve
     * Google
     */
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    console.warn(error);

    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorCode,
      errorMessage,
    };
  }
};

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
  try {
    const res = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL } = res.user;

    /**
     * El current user es el usuario actualmente logeado en la instancia del navegador
     * (si es que hay alguno logeado)
     */
    await updateProfile(FirebaseAuth.currentUser, { displayName });

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error) {
    console.warn(error);
    return { ok: false, errorMessage: error.message };
  }
};

export const loginWithEmailPassword = async ({ email, password }) => {
  try {
    const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const { displayName, photoURL, uid } = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    console.warn(error);
    return { ok: false, errorMessage: error.message };
  }
};

export const logoutFirebase = async () => {
  /**
   ** Cierra todas las sesiones de todos los proveedores (Correo y contraseña, Google,
   ** Facebook, Twitter...)
   */
  return await FirebaseAuth.signOut();
};
