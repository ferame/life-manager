import * as React from 'react';
import {
    Route,
    Redirect,
    RouteProps,
} from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any;
    isAuthenticated: boolean;
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
    const { component: Component, isAuthenticated, ...rest } = props;

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                isAuthenticated ? (
                    <Component {...routeProps} />
                ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: routeProps.location }
                            }}
                        />
                    )
            }
        />
    );
};

export default ProtectedRoute;