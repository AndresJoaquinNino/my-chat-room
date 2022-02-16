import { useState } from "react";

export const useSessionStorage = (key, initialValue) =>{

    const getInitialState = () => {
        try{
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }catch (error){
            return initialValue;
        }
    }

    const [storedValue, setStoredValue] = useState(getInitialState);

    const setValue = (value) =>{
        try{
            setStoredValue(value);
            const jsonValue = JSON.stringify(value);
            sessionStorage.setItem(key,jsonValue);
        }catch(error){
            throw new Error("Error setting sessionStorage");
        }
    }

    const deleteStoredData = () =>{
        sessionStorage.removeItem(key)
    }
    return [storedValue, setValue, deleteStoredData];
}