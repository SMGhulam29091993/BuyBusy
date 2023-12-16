import React from 'react';
import style from './cartcard.module.css';
import { useCustomHook } from '../../context';

const CartCard = ({item})=>{
    const {handleAdd, handleRemove} = useCustomHook()
   
    return (
        <>
            
            <div className={style.cartContainer}>
                <div className={style.imageContainer}>
                    <img src={item.img} alt="product" />
                </div>
                <h3>{item.details}</h3>
                <div className={style.addItem}>
                    <img src="https://cdn-icons-png.flaticon.com/128/1828/1828906.png" alt="decrease-icon" 
                                onClick={()=>handleRemove(item)}/>
                    <span>Qty : {item.qty}</span>
                    <img src="https://cdn-icons-png.flaticon.com/128/992/992651.png" alt="increse-icon"
                                onClick={()=>handleAdd(item)}/>
                </div>
                <h3>Total Price: {item.qty * item.price}</h3>
            </div>
        </>
    )
};

export default CartCard;