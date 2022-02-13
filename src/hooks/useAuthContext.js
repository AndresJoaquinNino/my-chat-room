import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

const useAuthContext = () => {
    const context = useContext(AuthContext);
    const { login, loading } = context;
    if(!context) throw new Error('There is no AuthContext')
    return [login, loading];
}

export default useAuthContext;