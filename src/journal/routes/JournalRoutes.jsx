import { Outlet } from 'react-router-dom';
import { JournalPage } from '../pages';

export const JournalRoutes = {
  path: '',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <JournalPage/>
    },
  ],
}
