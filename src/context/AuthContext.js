import { createContext, useEffect, useState } from "react";
import { auth } from '../config/firebase'
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [login, setLog] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const logState = onAuthStateChanged(auth, (user) => {
            console.log('user =', user, 'condition = ', user != null)
            setLog(user != null)
            setLoading(false)
        })
        return logState()
    },[auth])

    return (
        <AuthContext.Provider value={{login,loading}}>
            { children }
        </AuthContext.Provider>
    );
}