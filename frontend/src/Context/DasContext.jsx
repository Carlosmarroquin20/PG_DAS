import React, { createContext, useEffect, useState } from "react";

export const DasContext = createContext(null);


const getDefaulCart = ()=>{
    let cart = {};
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0; 
    }
    return cart;
} 
const DasContextProvider = (props) => {

    const [all_product,setAll_Product] = useState([]);
    const [cartItems,setCartItems] = useState(getDefaulCart());

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/allproducts`)
            .then((response) => response.json())
            .then((data) => setAll_Product(data))
            .catch((error) => console.error('Error fetching all products:', error));
    
        if (localStorage.getItem('auth-token')) {
            fetch(`${process.env.REACT_APP_API_URL}/getcart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
            })
            .then((response) => response.json())
            .then((data) => setCartItems(data))
            .catch((error) => console.error('Error fetching cart items:', error));
        }
    }, []);
    
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch(`${process.env.REACT_APP_API_URL}/addtocart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId: itemId }),
            })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error('Error:', error));
        }
    };
    
    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch(`${process.env.REACT_APP_API_URL}/removefromcart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId: itemId }),
            })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error('Error:', error));  
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((Productos) => Productos.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem+= cartItems[item];
            }
        }
        return totalItem;
    }
    



    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};
    return (
        <DasContext.Provider value={contextValue}>
            {props.children}
        </DasContext.Provider>
        
    )
}

export default DasContextProvider; 

