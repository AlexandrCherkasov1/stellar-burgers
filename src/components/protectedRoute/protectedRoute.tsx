import React from 'react';
import { RootState, useSelector } from '../../services/stores/store';
import { Preloader } from '../ui/preloader/preloader';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  component
}: ProtectedRouteProps): React.JSX.Element => {
  const location = useLocation();

  const { isAuthChecked, isAuthenticated, user } = useSelector(
    (state: RootState) => state.userAuth
  );

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({
  component
}: {
  component: React.JSX.Element;
}): React.JSX.Element => <ProtectedRoute onlyUnAuth component={component} />;
