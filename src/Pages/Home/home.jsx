
import React from 'react';
import SidePanel from '../../Component/SidePannel/SidePannel';
import Card from '../../Component/Card/Card';
import { useCustomHook } from '../../context';
import style from './home.module.css';

const Home = () => {
    const { products, category } = useCustomHook();
    const filteredProducts = products.filter(prod => prod.name === category);
    const noProductsMessage = !products.length && !category ? 'No products found.' : 'No products found in this category.';

    return (
        <>
            <h1>Home</h1>
            <div className={style.displayContainer}>
                <div className={style.sideContainer}>
                    <SidePanel />
                </div>
                <div className={style.productContainer}>
                    {category && filteredProducts.length > 0 ? (
                        filteredProducts.map((prod, i) => (
                            <Card prod={prod} key={i} id={prod.id} />
                        ))
                    ) : (
                        products.length > 0 ? (
                            products.map((prod, i) => (
                                <Card prod={prod} key={i} id={prod.id} />
                            ))
                        ) : (
                            <p>{noProductsMessage}</p>
                        )
                    )}
                </div>
            </div>
        </>
    );
};

export default Home;
