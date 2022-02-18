import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

const useAuthContext = () => {
    const context = useContext(AuthContext);
    const { isLog,logout } = context;
    if(!context) throw new Error('There is no AuthContext')
    return [isLog,logout];
}

export default useAuthContext;