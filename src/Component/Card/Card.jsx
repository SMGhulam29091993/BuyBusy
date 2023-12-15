import React from 'react';
import style from './card.module.css';
import { useCustomHook } from '../../context';

const Card =({prod})=>{
    const {addToCart}=  useCustomHook();
    return (
        <>

            <div className={style.cardContainer}>
                <div className={style.imageContainer}>
                    <img src="https://images.unsplash.com/photo-1622560480654-d96214fdc887?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJhZ3xlbnwwfHwwfHx8MA%3D%3D" alt="prod-img"/>
                </div>
                <div className={style.detailContainer}>
                    <h4>{prod.details}</h4>
                    <h4>₹ : {prod.price} </h4>
                </div>
                <button className={style.addBtn} onClick={()=>addToCart(prod)}>Add To Cart</button>
            </div>
        </>
    )
}

export default Card;