import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Route } from 'react-router-dom';


const RoutesAuthAdmin = (route) => {
    const loggedIn = useSelector((state) => state.authReducer.loggedIn);
    const isAdmin = useSelector((state) => state.authReducer.user.isAdmin);

    const Element = () => {
        if (!loggedIn) {
            return <Navigate to="/Login" />;
        }

        if (!isAdmin) {
            return <Navigate to="/auth/account" />;
        }

        return route.element;
    };

    return <Route path={route.path} key={route.key} element={<Element />} />;
}

export default RoutesAuthAdmin