import React from 'react';
import style from "./sidepannel.module.css";
import { useCustomHook } from '../../context';

const SidePanel = ()=>{
    const {filterPrice,setPrice} = useCustomHook();
    const handlePriceChange = (e) => {
        setPrice(parseInt(e.target.value, 10));
    }
    const categoryName = ["Men", "Women", "Kid"];
    
    const {category,setShowCategory, clearCategory} = useCustomHook()

    const showCategory= async (category)=>{
        setShowCategory(category);
    }
  
    return (
        <>
            <div className={style.panelContainer}>
                <div className={style.priceFilter}>
                    <h3>Selected Price: ₹{filterPrice}</h3>
                    <input
                        type="range"
                        min={0}
                        max={100000}
                        value={filterPrice}
                        onChange={handlePriceChange}
                    />
                </div>
                <div className={style.categoryContainer}>
                    <h3>Category</h3>
                    <ul>
                        {categoryName.map((cat, i)=>(
                            <li key={i} onClick={()=>showCategory(cat)}>{cat}</li>
                        ))}
                    </ul>
                    <buttton className={style.clearBtn} onClick={clearCategory}>Clear...</buttton>
                </div>
            </div>
            {category}
        </>
    )
}

export default SidePanel;