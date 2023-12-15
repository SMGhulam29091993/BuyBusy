import {createContext, useContext, useEffect, useState} from 'react';
import {createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged} from "firebase/auth";
import { auth } from "./firebaseInit";

import { db } from './firebaseInit';
import {  collection, getDocs, onSnapshot, setDoc, addDoc,doc, deleteDoc } from 'firebase/firestore';


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
    const [cart,setCart] = useState([]);
    const [total, setTotal] = useState([])
 
    const addToCart = async (prod)=>{
        try{
            const cartRef = collection(db,"Cart");
            const totalRef = collection(db, "Total");
            const existingItem = await getDocs(cartRef);
            const total = await getDocs(totalRef);
            let totalId
            total.forEach((doc)=>{ totalId = doc.id})

            let exists = null;

            existingItem.forEach((doc)=>{
                const existData = doc.data();
                if(existData.id===prod.id){
                    exists = {...existData, docId: doc.id}
                }
            });

            if (exists) {
                await setDoc(doc(cartRef, exists.docId), { ...exists, qty: exists.qty + 1 });
                const totalData = total.docs[0].data();
                const currentTotal = totalData.count || 0;
                await setDoc(doc(totalRef, totalId), {
                    count: currentTotal + exists.price,
                });
            } else {
                const docRef = await addDoc(cartRef, { ...prod, qty: 1 });
                const totalPrice = prod.price;
                const totalData = total.docs[0].data();
                const currentTotal = totalData.count || 0;
                await setDoc(doc(totalRef, totalId), {
                    count: currentTotal + totalPrice,
                });
                console.log("Document written with ID: ", docRef.id);
            }
            
        }catch(error){
            console.log("Error adding document: ", error)
        }
    }


    
    // getting cart data and showing it in Cart page
    

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
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "Total"), (snapshot) => {
            const totalData = snapshot.docs.map((doc)=>({
                id : doc.id,
                ...doc.data()
            }))
            const totalValue = totalData.map((data) => data.count);
            setTotal(totalValue)
        });
    
        return () => unsubscribe();
    }, []);
    

    const handleAdd = async (item) => {
        try{
            const cartRef = collection(db,"Cart");
            const existingItem = await getDocs(cartRef);
            const totalRef = collection(db, "Total");
            const total = await getDocs(totalRef);
            let totalId;
            total.forEach((doc)=>{
                totalId = doc.id
            })

            let exists = null;

            existingItem.forEach((doc)=>{
                const existData = doc.data();
                if(existData.id===item.id){
                    exists = {...existData, docId: doc.id}
                }
            });

            if(exists){
                await setDoc(doc(cartRef, exists.docId), {...exists, qty:exists.qty+1});
                const totalData = total.docs[0].data();
                const currentTotal = totalData.count || 0;
                await setDoc(doc(totalRef, totalId), {
                    count: currentTotal + exists.price,
                });
            }
        }catch(error){
            console.log("Error adding document: ", error)
        }
    };
    
    
    const handleRemove = async (item) => {
        try{
            const cartRef = collection(db,"Cart");
            const existingItem = await getDocs(cartRef);
            const totalRef = collection(db, "Total");
            const total = await getDocs(totalRef);
            let totalId;
            total.forEach((doc)=>{
                totalId = doc.id
            })

            let exists = null;

            existingItem.forEach((doc)=>{
                const existData = doc.data();
                if(existData.id===item.id){
                    exists = {...existData, docId: doc.id}
                }
            });

            if(exists){
                await setDoc(doc(cartRef, exists.docId), {...exists, qty:exists.qty-1});
                const totalData = total.docs[0].data();
                const currentTotal = totalData.count || 0;
                await setDoc(doc(totalRef, totalId), {
                    count: currentTotal - exists.price,
                });
                if(exists.qty===1){
                    await deleteDoc(doc(cartRef, exists.docId));
                }
            }
            if(cart.length<1){
                await setDoc(doc(totalRef, totalId), { count: 0 });
            }
        }catch(error){
            console.log("Error adding document: ", error)
        }
    };
    // the below code will transfer the item from Cart to My-Order
    const handlePurchase = async () => {
        try {
            const cartRef = collection(db, "Cart");
            const orderRef = collection(db, "MyOrder");
            const totalRef = collection(db, "Total");
            const purchaseAmountRef = collection(db, "PurchaseAmount");
    
            const cartData = await getDocs(cartRef);
            const totalData = await getDocs(totalRef);
    
            const transferPromises = [];
    
            cartData.forEach((doc) => {
                const transferData = doc.data();
                const transferPromise = addDoc(orderRef, transferData);
                transferPromises.push(transferPromise);
            });
    
            await Promise.all(transferPromises);
    
            const deleteCartPromises = cartData.docs.map((doc) => deleteDoc(doc.ref));
            await Promise.all(deleteCartPromises);
    
            if (totalData.docs.length > 0) {
                const totalAmount = totalData.docs[0].data().count;
                const totalDocRef = totalData.docs[0].ref;
                await setDoc(totalDocRef, { count: 0 });
                
                await addDoc(purchaseAmountRef, { amount: totalAmount });
            }
    
        } catch (error) {
            console.error("Error handling purchase:", error);
        }
    };
    
    
    
    
    
    
    return (
        <>
            <userContext.Provider value={{user,SignUp,logIn, logOut, 
                                        isLoggedIn,setLoggedIn, products,setProducts,
                                        category,setShowCategory, addToCart,
                                        cart, handleAdd, handleRemove, total, handlePurchase}}>
                                            
                {children}
            </userContext.Provider>
        </>
    );
};

export default UserProvider;