import React, { createContext } from "react";
import all_product from "../Components/Assets/all_product"

export const DasContext = createContext(null);

const DasContextProvider = (props) => {

    const contextValue = {all_product};

    return (
        <DasContext.Provider value={contextValue}>
            {props.children}
        </DasContext.Provider>
        
    )
}

export default DasContextProvider; 

