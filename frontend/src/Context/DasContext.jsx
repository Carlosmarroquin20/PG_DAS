import React, { createContext, useEffect, useState } from "react";

export const DasContext = createContext(null);

const getDefaulCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
};

const DasContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaulCart());

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}products/allproducts`);
                const data = await response.json();
                setAll_Product(data);
                fetchCartItems();
            } catch (error) {
                console.error('Error fetching all products:', error);
            }
        };

        const fetchCartItems = async () => {
            if (localStorage.getItem('auth-token')) {
                try {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}users/getcart`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'auth-token': localStorage.getItem('auth-token'),
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({})
                    });
                    const data = await response.json();
                    setCartItems(data);
                } catch (error) {
                    console.error('Error fetching cart items:', error);
                }
            }
        };

        fetchProducts();
    }, []);

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
        if (localStorage.getItem('auth-token')) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}users/addtocart`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'auth-token': localStorage.getItem('auth-token'),
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ itemId: itemId }),
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        const newCount = Math.max(0, cartItems[itemId] - 1);
        setCartItems((prev) => ({ ...prev, [itemId]: newCount }));
        if (localStorage.getItem('auth-token')) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}users/removefromcart`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'auth-token': localStorage.getItem('auth-token'),
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ itemId: itemId }),
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error removing from cart:', error);
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((Producto) => Producto.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        return Object.values(cartItems).reduce((sum, item) => item > 0 ? sum + item : sum, 0);
    };

    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart
    };
    return (
        <DasContext.Provider value={contextValue}>
            {props.children}
        </DasContext.Provider>
    );
};

export default DasContextProvider;
