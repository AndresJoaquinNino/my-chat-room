import { Navigate, useLocation } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext"

const RequireAuth = ({children}) =>  {
    const { login } = useAuthContext();
    const location = useLocation();
    if(login === false) return <Navigate to="/login" state={{ from: location }} replace />;
    return( children )
}

export default RequireAuth