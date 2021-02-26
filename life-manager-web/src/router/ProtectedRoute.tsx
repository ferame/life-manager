import * as React from 'react';
import { Route, RouteProps } from 'react-router';
import Login from 'views/Login';

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  restrictedPath: string;
  authenticationPath: string;
}

// location?: H.Location;
// component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
// render?: (props: RouteComponentProps<any>) => React.ReactNode;
// children?: ((props: RouteChildrenProps<any>) => React.ReactNode) | React.ReactNode;
// path?: string | string[];
// exact?: boolean;
// sensitive?: boolean;
// strict?: boolean;

export const ProtectedRoute: React.FC<ProtectedRouteProps> = props => {
    if (props.isAuthenticated) {
        return <Route path={props.restrictedPath} component={props.component}/>
    } else {
        return <Route path='/login' component={Login}/>
    };
};

export default ProtectedRoute;