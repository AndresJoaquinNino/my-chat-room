import { createContext, useEffect } from "react";
import { auth } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useSessionStorage } from '../hooks/useSessionStorage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLog, setSession, deleteSession] = useSessionStorage('userSession',true);

    useEffect(() => {
        const listener = onAuthStateChanged(auth, (user) => {
            setSession(user != null);
        })
        return listener()
    },[setSession])

    const logout = () => {
        signOut(auth);
        deleteSession();
    }

    return (
        <AuthContext.Provider value={{isLog,logout}}>
            { children }
        </AuthContext.Provider>
    );
}