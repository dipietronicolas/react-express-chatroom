import React from 'react';
export const CartContext = React.createContext();

export const CartDataProvider = ({ children }) => {

    return (
        <CartContext.Provider>
            { children}
        </CartContext.Provider>
    )
}