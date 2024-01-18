import { Navigate, Outlet } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../pages';

export const AuthRoutes = {
  path: 'auth',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <Navigate to="login" replace />,
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
  ],
};
