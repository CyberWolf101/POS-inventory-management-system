import React, { useState } from 'react';
import { createContext } from 'react';

export const InventoryDataContext = createContext()


function InventoryDataContextProvider({ children }) {
    const [inventoryData, setInventoryData] = useState({})


    return (
        <InventoryDataContext.Provider value={[inventoryData, setInventoryData]} >
            {children}
        </InventoryDataContext.Provider>
    );
}

export default InventoryDataContextProvider;