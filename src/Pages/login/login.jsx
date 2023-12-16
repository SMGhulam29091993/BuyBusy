import React, { useState } from 'react';
import style from "./login.module.css";
import { useCustomHook } from '../../context';
import {useNavigate} from "react-router-dom";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { logIn } = useCustomHook();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await logIn(email,password);
            navigate('/');
        }catch(error){
            console.error("Error adding document: ", error);
            toast.error("Invalid Username/Password")
        }
    };

    return (
        <div className={style.formContainer}>
            <h1>Log-In </h1>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder='Email'
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    placeholder='Password'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className={style.addBtn}>Log-In</button>
            </form>
        </div>
    );
};

export default Login;

