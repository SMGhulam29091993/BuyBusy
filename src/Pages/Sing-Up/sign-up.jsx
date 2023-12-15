import React, { useState } from 'react';
import style from './signup.module.css';
import {db} from "../../firebaseInit";
import {  addDoc, collection } from 'firebase/firestore';
import { useCustomHook } from '../../context';
import {useNavigate} from "react-router-dom";

const SignUp = ()=>{
    const navigate = useNavigate();
    const {SignUp} = useCustomHook();

    const initialFormData = {
        name: "",
        email: "",
        password: "",
        address: ""
    };

    
    const [userFormData, setUserFormData] = useState(initialFormData)
    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
            const userDoc = await addDoc(collection(db, "User"),userFormData);
            await SignUp(userFormData.email,userFormData.password);
            setUserFormData(initialFormData);
            navigate('/login')
            console.log("Document written with ID: ", userDoc.id);
        }catch(error){
            console.error("Error adding document: ", error);
        }
        // setUserData([...userData,userFormData]);  

    };

    return (
        <>
            <div className={style.formContainer}>
                <h1>Sign-Up</h1>
                <form onSubmit={handleSubmit}>
                    <input placeholder='Name' type="text" value={userFormData.name} 
                                                        onChange={(e)=>setUserFormData({...userFormData, name:e.target.value})}/>
                    <input placeholder='Email' type="email" value={userFormData.email} 
                                                        onChange={(e)=>setUserFormData({...userFormData, email:e.target.value})}/>
                    <input placeholder='Password' type="password" value={userFormData.password} 
                                                        onChange={(e)=>setUserFormData({...userFormData, password:e.target.value})}/> 
                    <input placeholder='Address' type="text" value={userFormData.address} 
                                                        onChange={(e)=>setUserFormData({...userFormData, address:e.target.value})}/>
                    <button className={style.addBtn}>Sign-Up</button>
                </form>
                <div>
            </div>
            </div>
        </>
    )
}

export default SignUp;