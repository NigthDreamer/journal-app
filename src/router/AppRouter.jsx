import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes';
import { JournalRoutes } from '../journal/routes';

const router = createBrowserRouter([
  {
    path: '*',
    element: <Navigate to='auth' replace/>
  },
  AuthRoutes,
  JournalRoutes
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}