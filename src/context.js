import {createContext, useContext, useEffect, useState} from 'react';
import {createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged} from "firebase/auth";
import { auth } from "./firebaseInit";

import { db } from './firebaseInit';
import { addDoc, collection, getDocs, onSnapshot } from 'firebase/firestore';


export const userContext = createContext();

export function useCustomHook(){
    const value = useContext(userContext);
    return value;
}

const UserProvider = ({children})=>{
    // the below code is for login and sign up 
    const [user,setUser] = useState()
    const [isLoggedIn,setLoggedIn] = useState(false)
    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
          setLoggedIn(true);
        }
      }, []);
    
      const SignUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
      };
    
      const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password).then(() => {
          setLoggedIn(true);
          localStorage.setItem('user', 'true');
        });
      };
    
      const logOut = () => {
        return signOut(auth).then(() => {
          setLoggedIn(false);
          localStorage.removeItem('user');
        });
      };
    
    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
            if(currentUser){
                localStorage.setItem("user", `${isLoggedIn}`)
            }
        });
        return ()=>{
            unsub()
        }
    },[isLoggedIn]);

    // below we will get product from the data 
    const [products, setProducts] = useState([]);
    const [category,setShowCategory] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const prodSnapshot = await getDocs(collection(db, 'Product'));
                const prodData = prodSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setProducts(prodData)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    },[]);
    
    // adding to the cart functionality
    const addToCart = async (prod)=>{
        try{
            const docRef = await addDoc(collection(db,"Cart"), prod);
            console.log("Document written with ID: ", docRef.id);
        }catch(error){
            console.log("Error adding document: ", error)
        }
    }
    // getting cart data and showing it in Cart page
    const [cart,setCart] = useState([])

    useEffect(()=>{
        const getData = onSnapshot(collection(db,"Cart"), (snapShot)=>{
            const cartData = snapShot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data()
            }))
            setCart(cartData)
        })
        
        return ()=>getData();
    },[])
    

    const handleAdd = (prod)=>{
        // pass
    }
    
    return (
        <>
            <userContext.Provider value={{user,SignUp,logIn, logOut, 
                                        isLoggedIn,setLoggedIn, products,setProducts,
                                        category,setShowCategory, addToCart,cart}}>
                                            
                {children}
            </userContext.Provider>
        </>
    );
};

export default UserProvider;