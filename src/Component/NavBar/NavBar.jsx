import React from 'react';
import style from './navbar.module.css';
import {Outlet, Link, useNavigate} from "react-router-dom";
import { useCustomHook } from '../../context';

const NavBar = ()=>{
    const navigate = useNavigate()
    const {logOut, isLoggedIn, clearCategory} = useCustomHook();
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
                                    <Link  to="/"><li onClick={clearCategory}>Home</li></Link>
                                    <Link to="/my-order"><li>My Order</li></Link>
                                    <Link to="/cart"><li>Cart</li></Link>
                                    <li onClick={handleLogOut}>Log-out</li>
                                </>
                            ) : (
                                <>
                                    <Link to="/login"><li>Log-in</li></Link>
                                    <Link to="/sign-up"><li>Sign-up</li></Link>
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