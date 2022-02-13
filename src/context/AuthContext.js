import { createContext, useEffect, useState } from "react";
import { auth } from '../config/firebase'
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const login = sessionStorage.getItem("chat-session")
    useEffect(() => {
        const logState = onAuthStateChanged(auth, (user) => {
            if(user){
                sessionStorage.setItem("chat-session",true)
            }else{
                sessionStorage.setItem("chat-session",false)
            }
        })
        return logState()
    },[])

    return (
        <AuthContext.Provider value={{login}}>
            { children }
        </AuthContext.Provider>
    );
}