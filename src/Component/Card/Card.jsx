import React from 'react';
import style from './card.module.css';
import { useCustomHook } from '../../context';

const Card =({prod})=>{
    const {addToCart, isLoggedIn}=  useCustomHook();
    return (
        <>

            <div className={style.cardContainer}>
                <div className={style.imageContainer}>
                    <img src={prod.img}alt="prod-img"/>
                </div>
                <div className={style.detailContainer}>
                    <h4>{prod.details}</h4>
                    <h4>₹ : {prod.price} </h4>
                </div>
                <button
                    className={style.addBtn}
                    onClick={() => {
                        if (isLoggedIn) {
                            addToCart(prod);
                        }
                    }}>
                    Add To Cart
                </button>
            </div>
        </>
    )
}

export default Card;