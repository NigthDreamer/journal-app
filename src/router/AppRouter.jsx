import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes';
import { JournalRoutes } from '../journal/routes';
import { CheckingAuth } from '../ui';
import { useCheckAuth } from '../hooks';

const router = createBrowserRouter([
  {
    path: '*',
    element: <Navigate to='auth' replace/>
  },
  AuthRoutes,
  JournalRoutes
])

export const AppRouter = () => {

  const { status } = useCheckAuth();
  
  if(status === 'checking') {
    return <CheckingAuth/>
  }

  return <RouterProvider router={router} />
}