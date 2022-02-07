import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

const useAuthContext = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error('There is no AuthContext')
    return context;
}

export default useAuthContext;