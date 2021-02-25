import  React from  "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from  "react-router-dom";
import { selectUser } from "redux/reducers/userSlice";

const ProtectedRoute: React.FC<{
        component: React.FC;
        path: string;
        exact: boolean;
    }> = (props) => {

    const user = useSelector(selectUser);
    let isAuthenticated = user.token.length > 0;

    return  isAuthenticated ? 
    (<Route  path={props.path}  exact={props.exact} component={props.component} />) : 
    (<Redirect  to="/login"  />);
};
export default ProtectedRoute;