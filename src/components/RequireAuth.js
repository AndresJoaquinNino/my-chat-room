import { Navigate, useLocation } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const RequireAuth = ({children, alternative, needAuth}) =>  {
    const [ isLog ] = useAuthContext();
    const location = useLocation();
    const result = typeof alternative === 'object' ? alternative : <Navigate to={alternative} state={{ from: location }} replace />;
    if(isLog !== needAuth) return result;
    return( children )
}

export default RequireAuth