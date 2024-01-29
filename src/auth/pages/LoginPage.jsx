import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Grid, Typography, TextField, Button, Link, Alert } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store';

const formData = {
  email: '',
  password: '',
}

export const LoginPage = () => {

  /**
   * Este hook devuelve el estado completo de la aplicacion. Si 
   * seleccionamos un slice en concreto (auth por ejemplo) devolvera
   * el objeto con el estado de dicho slice del cual podemos 
   * desestructurar sus propiedades
   */
  const { status, errorMessage } = useSelector( state => state.auth );

  /**
   * Este hook sirve para ejecutar una de las acciones exportadas
   * de alguno de nuestros slices
   */
  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm(formData);

  /**
   * Memoriza lo que devuelva el callback (un booleano en este caso) si la
   * dependencia cambia de valor (si el valor de status cambia)
   */
  const isAuthenticating = useMemo( () => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  const onGoogleSigning = () => {
    dispatch(startGoogleSignIn());
  };

  const navigate = useNavigate();

  useEffect(() => {
    // Si el usuario esta autenticado, le dejo entrar en el dashboard
    if (status === 'authenticated') {
      navigate("/", {
        replace: true
      });
    }
  }, [status]);

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          {/* Con sx accedemos al tema definido en el theme provider */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              id="email"
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              autoComplete="username"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              id="password"
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              autoComplete="current-password"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button type="submit" variant="contained" fullWidth disabled={isAuthenticating}>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth disabled={isAuthenticating} onClick={onGoogleSigning}>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
