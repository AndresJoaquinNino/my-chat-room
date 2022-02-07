import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLog, setLog] = useState(false);
    return (
        <AuthContext.Provider value={{isLog, setLog}}>
            { children }
        </AuthContext.Provider>
    );
}