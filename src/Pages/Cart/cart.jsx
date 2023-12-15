import React from 'react';
import CartCard from '../../Component/CartCard/CartCard';
import { useCustomHook } from '../../context';
import style from "./cart.module.css"

const Cart = ()=>{
    const {cart, total, handlePurchase} = useCustomHook();
    return (
        <>
            <h1>Cart</h1>
            <div className={style.cartContainer}>
                {cart.map((item,i)=>(
                    <CartCard item={item} id={item.id} key={i}/>
                ))}
            </div>
            
            <div className={style.totalContainer}>
                <h2>Total</h2>
                <h2>₹ : {total}</h2>
            </div>
            <button className={style.btn} onClick={handlePurchase}>Purchase</button>
            
        </>
    )
}

export default Cart;