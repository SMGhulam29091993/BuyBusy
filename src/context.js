import {createContext, useContext, useEffect, useState} from 'react';
import {createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged} from "firebase/auth";
import { auth } from "./firebaseInit"

export const userContext = createContext();

export function useCustomHook(){
    const value = useContext(userContext);
    return value;
}

const UserProvider = ({children})=>{
    const [user,setUser] = useState()
    const [isLoggedIn,setLoggedIn] = useState(false)
    const SignUp = (email,password)=>{
        return createUserWithEmailAndPassword(auth, email,password);
    };
    const logIn = (email,password)=>{
        return signInWithEmailAndPassword(auth, email,password);
    };
    const logOut = ()=>{
        return signOut(auth);
    }
    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
        });
        return ()=>{
            unsub()
        }
    },[])

    return (
        <>
            <userContext.Provider value={{user,SignUp,logIn, logOut, isLoggedIn,setLoggedIn}}>
                {children}
            </userContext.Provider>
        </>
    );
};

export default UserProvider;