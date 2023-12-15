import React from 'react';
import style from './cartcard.module.css';
import { useCustomHook } from '../../context';

const CartCard = ({item})=>{
   
    return (
        <>
            
            <div className={style.cartContainer}>
                <div className={style.imageContainer}>
                    <img src="https://images.unsplash.com/photo-1622560480654-d96214fdc887?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJhZ3xlbnwwfHwwfHx8MA%3D%3D" alt="product" />
                </div>
                <p>{item.details}</p>
                <div className={style.addItem}>
                    <img src="https://cdn-icons-png.flaticon.com/128/1828/1828906.png" alt="decrease-icon"/>
                    <span>Qty : {item.qty}</span>
                    <img src="https://cdn-icons-png.flaticon.com/128/992/992651.png" alt="increse-icon"/>
                </div>
                <p>Total Price: {item.price}</p>
            </div>
        </>
    )
};

export default CartCard;