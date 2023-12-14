import {createContext, useContext} from 'react';
import {createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged} from "firebase/auth";


export const userContext = createContext();

export const useCustomHook = ()=>{
    const value = useContext(userContext);
    return value;
}

const UserProvider = ({children})=>{

    return (
        <>
            <userContext.Provider >
                {children}
            </userContext.Provider>
        </>
    );
};

export default UserProvider;