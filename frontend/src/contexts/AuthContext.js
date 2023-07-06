import { React, createContext, useEffect, useReducer } from "react";
import { auth } from "../config/firebase-config";
import { authReducer } from "../reducers/authReducer";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
      user: null,
      authIsReady: false,
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          dispatch({ type: "AUTH_IS_READY", payload: user });
        });
        return unsubscribe;
      }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
  };
  
  export default AuthContextProvider;