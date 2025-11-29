import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";


const PrivetRoute = ({ children }) => {
    
    const { user, loadding } = useAuth()
    const location = useLocation()

    console.log(location)
    
    if (loadding) {
        return <span className="loading loading-infinity loading-xl"></span>
    }

    if (user) {
        return children 
    }

    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

export default PrivetRoute;