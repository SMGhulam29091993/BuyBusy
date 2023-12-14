import React from 'react';
import style from "./login.module.css";

const Login = ()=>{
    return (
        <>
            <div className={style.formContainer}>
                <form onSubmit={handleSubmit}>
                    
                    <input placeholder='Email' type="email" value={userFormData.email} 
                                                        onChange={(e)=>setUserFormData({...userFormData, email:e.target.value})}/>
                    <input placeholder='Password' type="password" value={userFormData.password} 
                                                        onChange={(e)=>setUserFormData({...userFormData, password:e.target.value})}/> 
                    
                    <button className={style.addBtn}>Sign-Up</button>
                </form>
                <div>
            </div>
            </div>
        </>
    )
}

export default Login;