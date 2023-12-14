import React from 'react';
import style from './navbar.module.css';
import {Outlet, NavLink} from "react-router-dom";

const NavBar = ()=>{
    return (
        <>
            <nav>
                <div className={style.logo}>
                    <h3>BusyBuy</h3>
                </div>
                <div className={style.navList}>
                    <ul>
                        <NavLink to="/"><li>Home</li></NavLink>
                        <NavLink to="/my-order"><li>My Order</li></NavLink>
                        <NavLink to="/cart"><li>Cart</li></NavLink>
                        <NavLink to="/login"><li>Log-in</li></NavLink>
                        <li>Log-out</li>
                        <NavLink to="/sign-up"><li>Sign-up</li></NavLink>
                    </ul>
                </div> 
            </nav>
            <Outlet/>
        </>
    )
}

export default NavBar;