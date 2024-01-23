import { Outlet } from 'react-router-dom';
import { JournalPage } from '../pages';
import { PrivateRoute } from '../../router/PrivateRoute';

export const JournalRoutes = {
  path: '',
  element: 
  <PrivateRoute>
    <Outlet />
  </PrivateRoute>,
  children: [
    {
      index: true,
      element: <JournalPage/>
    },
  ],
}
