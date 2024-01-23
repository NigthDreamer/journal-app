import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Al poner el children, definimos este componente como un higher order component
export const PrivateRoute = ({ children }) => {
  const { status } = useSelector(state => state.auth);

  return status === 'authenticated' ? children : <Navigate to="/login" replace={true} />;
};
