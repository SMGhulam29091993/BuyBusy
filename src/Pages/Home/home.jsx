import React, { useState,useEffect } from 'react';
import SidePanel from '../../Component/SidePannel/SidePannel';
import Card from '../../Component/Card/Card';
import { useCustomHook } from '../../context';
import style from './home.module.css';
import HashLoader from 'react-spinners/HashLoader';

const Home = () => {
    const { products, category, search, setSearch, filterPrice} = useCustomHook();
    const [loading,setLoading] = useState(false)
    // Filter products by category
    const filteredByCategory = products.filter(prod => prod.name === category);

    // Filter products by search input
    const filteredBySearch = products.filter(prod =>
        prod.name.toLowerCase()===(search.toLowerCase())
    );

    // Apply both category and search filters if both are provided
    const filteredProducts =
        category && search
            ? filteredByCategory.filter(prod =>
                  prod.details.toLowerCase().includes(search.toLowerCase())
              )
            : category
            ? filteredByCategory
            : search
            ? filteredBySearch
            : products; // Display all products if no category or search input

        
    // show products when price is filter
    const filteredByPrice = filterPrice? filteredProducts.filter(prod => prod.price < filterPrice)
    : filteredProducts;

    // Determine the products to display based on the filters applied
    const productsToDisplay = filterPrice ? filteredByPrice : filteredProducts;
                
    // the below code is to display when the product is loading or no product found
    const noProductsMessage =
        filteredProducts.length === 0 && !products.length
            ? 'Loading...'
            : filteredProducts.length === 0
            ? 'No products found....'
            : '';

    useEffect(() => {
        // Simulating data loading delay for 5 seconds (5000 milliseconds)
        setLoading(true); // Set loading to true before starting data fetch
        const timeout = setTimeout(() => {
            setLoading(false); // Set loading to false after 5 seconds (simulating data loaded)
        }, 5000);
    
        return () => clearTimeout(timeout); // Clear the timeout on unmount
        }, [setLoading]);

    return (
        <>
            
            <div className={style.main}>
                <div className={style.inputContainer}>
                    <input
                        type="text"
                        placeholder="SEARCH"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className={style.displayContainer}>
                    <div className={style.sideContainer}>
                        <SidePanel />
                    </div>
                    {loading?(
                        <div className={style.loaderContainer}>
                            <HashLoader color="#4bc2e3" loading={loading} size={60} margin={2}/>
                        </div>) :(
                    <div className={style.productContainer}>
                        {productsToDisplay.length > 0  ? (
                            productsToDisplay.map((prod, i) => (
                                <Card prod={prod} key={i} id={prod.id} />
                            ))
                        ) : (
                            <h2>{noProductsMessage}</h2>
                        )}
                    </div>)}
                </div>
            </div>       
        </>
    );
};

export default Home;
