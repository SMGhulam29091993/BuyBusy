import React from 'react';
import style from './navbar.module.css';

const NavBar = ()=>{
    return (
        <>
            <nav>
                <div className={style.logo}>
                    <h3>BusyBuy</h3>
                </div>
                <div className={style.navList}>
                    <ul>
                        <li>Home</li>
                        <li>My Order</li>
                        <li>Cart</li>
                        <li>Log-in</li>
                        <li>Log-out</li>
                        <li>Sign-up</li>
                    </ul>
                </div> 
            </nav>
        </>
    )
}

export default NavBar;