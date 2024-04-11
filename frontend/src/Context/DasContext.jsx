import React, { createContext, useState } from "react";
import all_product from "../Components/Assets/all_product"

export const DasContext = createContext(null);


const getDefaulCart = ()=>{
    let cart = {};
    for (let index = 0; index < all_product.length+1; index++) {
        cart[index] = 0; 
    }
    return cart;
} 
const DasContextProvider = (props) => {

    const [cartItems,setCartItems] = useState(getDefaulCart());

    const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        console.log(cartItems);

    }

    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
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
    
    const contextValue = {getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};
    return (
        <DasContext.Provider value={contextValue}>
            {props.children}
        </DasContext.Provider>
        
    )
}

export default DasContextProvider; 

