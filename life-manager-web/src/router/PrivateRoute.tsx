import * as React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { selectUser } from 'redux/reducers/userSlice';

export const PrivateRoute = (path: string) => {
  let redirectPath = '';
  const user = useSelector(selectUser);
  const isAuthenticated : boolean = user.token.length > 0;

  if (isAuthenticated) {
    redirectPath = path;
  } else {
    redirectPath = '/login';
  }

  const routeProps = {
      exact: true,
      path: redirectPath
  }

  if (redirectPath) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...routeProps} component={renderComponent} render={undefined} />;
  } else {
    return <Route {...routeProps} />;
  }
};

export default PrivateRoute;