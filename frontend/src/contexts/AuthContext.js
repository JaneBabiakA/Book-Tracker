import { createContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";
const cookie = new Cookies();

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState('');
    const [expiry, setExpiry] = useState('');

    useEffect(()=> {
        const value = cookie.get("TOKEN");
        if(new Date(cookie.get("EXPIRY")) > new Date()){
            //TODO
        }
        if(value){
          setToken(value);
        }
    }, [])


    return (
        <AuthContext.Provider value={{token}}>
            { children }
        </AuthContext.Provider>
    )
}