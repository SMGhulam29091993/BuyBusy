import React from 'react';
import style from './navbar.module.css';
import {Outlet, NavLink, useNavigate} from "react-router-dom";
import { useCustomHook } from '../../context';

const NavBar = ()=>{
    const navigate = useNavigate()
    const {logOut, isLoggedIn} = useCustomHook();
    const handleLogOut= async ()=>{
        try{
            await logOut()
            navigate('/login')
        }catch(err){
            console.error("Error adding document: ", err);
        }
    }
    return (
        <>
            <nav>
                <div className={style.logo}>
                    <h3>BusyBuy</h3>
                </div>
                <div className={style.navList}>
                    <ul>
                            {isLoggedIn ? (
                                <>
                                    <NavLink to="/"><li>Home</li></NavLink>
                                    <NavLink to="/my-order"><li>My Order</li></NavLink>
                                    <NavLink to="/cart"><li>Cart</li></NavLink>
                                    <li onClick={handleLogOut}>Log-out</li>
                                </>
                            ) : (
                                <>
                                    <NavLink to="/login"><li>Log-in</li></NavLink>
                                    <NavLink to="/sign-up"><li>Sign-up</li></NavLink>
                                </>
                            )}
                        </ul>
                </div> 
            </nav>
            <Outlet/>
        </>
    )
}

export default NavBar;