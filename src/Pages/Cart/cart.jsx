import React from 'react';
import CartCard from '../../Component/CartCard/CartCard';
import { useCustomHook } from '../../context';

const Cart = ()=>{
    const {cart} = useCustomHook();
    return (
        <>
            <h1>Cart</h1>
            {cart.map((item,i)=>(
                <CartCard item={item} id={item.id} key={i}/>
            ))}
            
        </>
    )
}

export default Cart;