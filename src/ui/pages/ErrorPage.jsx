import { useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1>Oops!</h1>
      <p>Se ha producido un error inesperado.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};
